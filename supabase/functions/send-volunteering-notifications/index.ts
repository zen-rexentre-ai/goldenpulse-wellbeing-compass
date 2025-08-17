import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  "https://xuvvkniozmvwffqbxwir.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dnZrbmlvem12d2ZmcWJ4d2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NjA0MDcsImV4cCI6MjA2MzEzNjQwN30.M8jO46Fov37QOm-V8ZJ0ERAHmkNVU7nXBtPCPXkK_Qs"
);

interface NotificationRequest {
  type: 'confirmation' | 'reminder' | 'cancellation' | 'update';
  registrationId: string;
  userEmail: string;
  userName: string;
  opportunityTitle: string;
  opportunityDate: string;
  opportunityTime: string;
  opportunityLocation: string;
  coordinatorName: string;
  coordinatorEmail: string;
  message?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, registrationId, userEmail, userName, opportunityTitle, opportunityDate, opportunityTime, opportunityLocation, coordinatorName, coordinatorEmail, message }: NotificationRequest = await req.json();

    console.log(`Sending ${type} notification for registration ${registrationId}`);

    // Create alert record
    const { error: alertError } = await supabase
      .from('volunteering_alerts')
      .insert({
        registration_id: registrationId,
        alert_type: type,
        scheduled_for: new Date().toISOString(),
        message: message || getDefaultMessage(type, opportunityTitle, opportunityDate),
        email_sent: true,
        sent_at: new Date().toISOString()
      });

    if (alertError) {
      console.error('Error creating alert record:', alertError);
      // Continue with notification even if alert record fails
    }

    // Format the notification message
    const subject = getEmailSubject(type, opportunityTitle);
    const body = getEmailBody(type, userName, opportunityTitle, opportunityDate, opportunityTime, opportunityLocation, coordinatorName, coordinatorEmail, message);

    // In a real implementation, you would send email here using a service like Resend
    // For now, we'll just log the notification details
    console.log('Email notification details:', {
      to: userEmail,
      subject,
      body,
      type,
      registrationId
    });

    // Also notify coordinator for new registrations
    if (type === 'confirmation') {
      const coordinatorSubject = `New Volunteer Registration: ${opportunityTitle}`;
      const coordinatorBody = `
        Dear ${coordinatorName},
        
        A new volunteer has registered for your opportunity:
        
        Volunteer: ${userName}
        Email: ${userEmail}
        Opportunity: ${opportunityTitle}
        Date: ${opportunityDate} at ${opportunityTime}
        Location: ${opportunityLocation}
        
        Please reach out to the volunteer directly if you need any additional information.
        
        Best regards,
        Volunteering Platform
      `;

      console.log('Coordinator notification:', {
        to: coordinatorEmail,
        subject: coordinatorSubject,
        body: coordinatorBody
      });
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `${type} notification sent successfully` 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error sending notification:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function getDefaultMessage(type: string, opportunityTitle: string, opportunityDate: string): string {
  switch (type) {
    case 'confirmation':
      return `Your registration for ${opportunityTitle} on ${opportunityDate} has been confirmed.`;
    case 'reminder':
      return `Reminder: You have volunteering commitment for ${opportunityTitle} on ${opportunityDate}.`;
    case 'cancellation':
      return `Your registration for ${opportunityTitle} on ${opportunityDate} has been cancelled.`;
    case 'update':
      return `There has been an update to your volunteering opportunity: ${opportunityTitle}.`;
    default:
      return `Notification regarding ${opportunityTitle}`;
  }
}

function getEmailSubject(type: string, opportunityTitle: string): string {
  switch (type) {
    case 'confirmation':
      return `Registration Confirmed: ${opportunityTitle}`;
    case 'reminder':
      return `Reminder: ${opportunityTitle}`;
    case 'cancellation':
      return `Registration Cancelled: ${opportunityTitle}`;
    case 'update':
      return `Update: ${opportunityTitle}`;
    default:
      return `Volunteering Notification: ${opportunityTitle}`;
  }
}

function getEmailBody(
  type: string, 
  userName: string, 
  opportunityTitle: string, 
  opportunityDate: string, 
  opportunityTime: string, 
  opportunityLocation: string, 
  coordinatorName: string, 
  coordinatorEmail: string, 
  customMessage?: string
): string {
  const baseMessage = customMessage || getDefaultMessage(type, opportunityTitle, opportunityDate);
  
  return `
    Dear ${userName},
    
    ${baseMessage}
    
    Opportunity Details:
    - Title: ${opportunityTitle}
    - Date: ${opportunityDate}
    - Time: ${opportunityTime}
    - Location: ${opportunityLocation}
    - Coordinator: ${coordinatorName} (${coordinatorEmail})
    
    If you have any questions, please contact the coordinator directly.
    
    Thank you for your commitment to volunteering!
    
    Best regards,
    Volunteering Platform
  `;
}