import { supabase } from '@/integrations/supabase/client';

export interface VolunteeringOpportunity {
  id: string;
  title: string;
  description?: string;
  organization: string;
  category: {
    id: string;
    name: string;
    description?: string;
  };
  coordinator: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    organization?: string;
  };
  date: string;
  time: string;
  location: string;
  total_spots: number;
  filled_spots: number;
  requirements?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VolunteeringRegistration {
  id: string;
  opportunity: VolunteeringOpportunity;
  registrant_name: string;
  registrant_phone: string;
  registrant_address: string;
  registration_date: string;
  status: 'registered' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
}

export interface VolunteeringCategory {
  id: string;
  name: string;
  description?: string;
}

export const volunteeringService = {
  // Get all active opportunities
  async getOpportunities() {
    const { data, error } = await supabase
      .from('volunteering_opportunities')
      .select(`
        *,
        category:volunteering_categories(*),
        coordinator:volunteering_coordinators(*)
      `)
      .eq('is_active', true)
      .order('date', { ascending: true });

    if (error) throw error;
    return data as VolunteeringOpportunity[];
  },

  // Get opportunities by category
  async getOpportunitiesByCategory(categoryId: string) {
    const { data, error } = await supabase
      .from('volunteering_opportunities')
      .select(`
        *,
        category:volunteering_categories(*),
        coordinator:volunteering_coordinators(*)
      `)
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .order('date', { ascending: true });

    if (error) throw error;
    return data as VolunteeringOpportunity[];
  },

  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('volunteering_categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data as VolunteeringCategory[];
  },

  // Register for an opportunity
  async registerForOpportunity(
    opportunityId: string,
    registrantName: string,
    registrantPhone: string,
    registrantAddress: string,
    notes?: string
  ) {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // First check if spots are available
    const { data: opportunity, error: opportunityError } = await supabase
      .from('volunteering_opportunities')
      .select('total_spots, filled_spots, title, date, time, location, coordinator:volunteering_coordinators(*)')
      .eq('id', opportunityId)
      .single();

    if (opportunityError) throw opportunityError;
    if (opportunity.filled_spots >= opportunity.total_spots) {
      throw new Error('No spots available for this opportunity');
    }

    // Create registration
    const { data: registration, error: registrationError } = await supabase
      .from('volunteering_registrations')
      .insert({
        opportunity_id: opportunityId,
        profile_id: user.id,
        registrant_name: registrantName,
        registrant_phone: registrantPhone,
        registrant_address: registrantAddress,
        notes,
        status: 'registered'
      })
      .select()
      .single();

    if (registrationError) throw registrationError;

    // Update filled spots
    const { error: updateError } = await supabase
      .from('volunteering_opportunities')
      .update({ filled_spots: opportunity.filled_spots + 1 })
      .eq('id', opportunityId);

    if (updateError) throw updateError;

    // Send confirmation notification
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', user.id)
        .single();

      if (profile?.email) {
        await supabase.functions.invoke('send-volunteering-notifications', {
          body: {
            type: 'confirmation',
            registrationId: registration.id,
            userEmail: profile.email,
            userName: registrantName,
            opportunityTitle: opportunity.title,
            opportunityDate: opportunity.date,
            opportunityTime: opportunity.time,
            opportunityLocation: opportunity.location,
            coordinatorName: opportunity.coordinator.name,
            coordinatorEmail: opportunity.coordinator.email
          }
        });
      }
    } catch (notificationError) {
      console.error('Failed to send notification:', notificationError);
      // Don't fail the registration if notification fails
    }

    return registration;
  },

  // Get user's registrations
  async getUserRegistrations() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('volunteering_registrations')
      .select(`
        *,
        opportunity:volunteering_opportunities(
          *,
          category:volunteering_categories(*),
          coordinator:volunteering_coordinators(*)
        )
      `)
      .eq('profile_id', user.id)
      .order('registration_date', { ascending: false });

    if (error) throw error;
    return data as VolunteeringRegistration[];
  },

  // Cancel registration
  async cancelRegistration(registrationId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get registration details first
    const { data: registration, error: fetchError } = await supabase
      .from('volunteering_registrations')
      .select(`
        *,
        opportunity:volunteering_opportunities(
          *,
          coordinator:volunteering_coordinators(*)
        )
      `)
      .eq('id', registrationId)
      .eq('profile_id', user.id)
      .single();

    if (fetchError) throw fetchError;

    // Update registration status
    const { error: updateError } = await supabase
      .from('volunteering_registrations')
      .update({ status: 'cancelled' })
      .eq('id', registrationId)
      .eq('profile_id', user.id);

    if (updateError) throw updateError;

    // Decrease filled spots
    const { error: spotsError } = await supabase
      .from('volunteering_opportunities')
      .update({ filled_spots: Math.max(0, registration.opportunity.filled_spots - 1) })
      .eq('id', registration.opportunity_id);

    if (spotsError) throw spotsError;

    // Send cancellation notification
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', user.id)
        .single();

      if (profile?.email) {
        await supabase.functions.invoke('send-volunteering-notifications', {
          body: {
            type: 'cancellation',
            registrationId: registrationId,
            userEmail: profile.email,
            userName: registration.registrant_name,
            opportunityTitle: registration.opportunity.title,
            opportunityDate: registration.opportunity.date,
            opportunityTime: registration.opportunity.time,
            opportunityLocation: registration.opportunity.location,
            coordinatorName: registration.opportunity.coordinator.name,
            coordinatorEmail: registration.opportunity.coordinator.email
          }
        });
      }
    } catch (notificationError) {
      console.error('Failed to send cancellation notification:', notificationError);
    }

    return registration;
  },

  // Process Excel file upload
  async processExcelUpload(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const { data, error } = await supabase.functions.invoke('process-volunteering-excel', {
      body: formData
    });

    if (error) throw error;
    return data;
  }
};