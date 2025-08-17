import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import * as XLSX from "https://esm.sh/xlsx@0.18.5";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ExcelRow {
  title: string;
  description: string;
  organization: string;
  category: string;
  coordinator_name: string;
  coordinator_email: string;
  coordinator_phone: string;
  date: string;
  time: string;
  location: string;
  total_spots: number;
  requirements: string;
}

const supabase = createClient(
  "https://xuvvkniozmvwffqbxwir.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dnZrbmlvem12d2ZmcWJ4d2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NjA0MDcsImV4cCI6MjA2MzEzNjQwN30.M8jO46Fov37QOm-V8ZJ0ERAHmkNVU7nXBtPCPXkK_Qs"
);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing Excel file for volunteering opportunities');
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('File received:', file.name, file.size);

    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Get first worksheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];
    
    console.log('Parsed Excel data:', jsonData.length, 'rows');

    const results = {
      processed: 0,
      errors: [] as string[],
      successful: [] as string[]
    };

    // Process each row
    for (let i = 0; i < jsonData.length; i++) {
      try {
        const row = jsonData[i] as any;
        
        // Validate required fields
        if (!row.title || !row.organization || !row.category || !row.coordinator_email || !row.date || !row.location) {
          results.errors.push(`Row ${i + 1}: Missing required fields`);
          continue;
        }

        // Find or create category
        let { data: category } = await supabase
          .from('volunteering_categories')
          .select('id')
          .eq('name', row.category)
          .single();

        if (!category) {
          const { data: newCategory, error: categoryError } = await supabase
            .from('volunteering_categories')
            .insert({ name: row.category, description: `${row.category} opportunities` })
            .select()
            .single();
          
          if (categoryError) {
            results.errors.push(`Row ${i + 1}: Error creating category - ${categoryError.message}`);
            continue;
          }
          category = newCategory;
        }

        // Find or create coordinator
        let { data: coordinator } = await supabase
          .from('volunteering_coordinators')
          .select('id')
          .eq('email', row.coordinator_email)
          .single();

        if (!coordinator) {
          const { data: newCoordinator, error: coordinatorError } = await supabase
            .from('volunteering_coordinators')
            .insert({
              name: row.coordinator_name || 'Unknown Coordinator',
              email: row.coordinator_email,
              phone: row.coordinator_phone,
              organization: row.organization
            })
            .select()
            .single();
          
          if (coordinatorError) {
            results.errors.push(`Row ${i + 1}: Error creating coordinator - ${coordinatorError.message}`);
            continue;
          }
          coordinator = newCoordinator;
        }

        // Create opportunity
        const { error: opportunityError } = await supabase
          .from('volunteering_opportunities')
          .insert({
            title: row.title,
            description: row.description || '',
            organization: row.organization,
            category_id: category.id,
            coordinator_id: coordinator.id,
            date: row.date,
            time: row.time || '09:00',
            location: row.location,
            total_spots: parseInt(row.total_spots) || 1,
            requirements: row.requirements || '',
            is_active: true
          });

        if (opportunityError) {
          results.errors.push(`Row ${i + 1}: Error creating opportunity - ${opportunityError.message}`);
          continue;
        }

        results.successful.push(`Row ${i + 1}: ${row.title}`);
        results.processed++;

      } catch (error) {
        results.errors.push(`Row ${i + 1}: ${error.message}`);
      }
    }

    console.log('Processing complete:', results);

    return new Response(
      JSON.stringify(results),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error processing Excel file:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});