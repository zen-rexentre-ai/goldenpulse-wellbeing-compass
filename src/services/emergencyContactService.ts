
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface EmergencyContact {
  id?: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
}

export async function addEmergencyContact(profileId: string, contact: EmergencyContact) {
  try {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .insert({
        profile_id: profileId,
        name: contact.name,
        relationship: contact.relationship,
        phone: contact.phone,
        email: contact.email || null,
        is_primary: contact.isPrimary,
      })
      .select();

    if (error) {
      toast.error('Could not add emergency contact');
      return { success: false, error };
    }

    toast.success('Emergency contact added successfully');
    return { success: true, data: data[0] };
  } catch (err) {
    toast.error('An unexpected error occurred');
    return { success: false, error: err };
  }
}

export async function getEmergencyContacts(profileId: string) {
  try {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .select('*')
      .eq('profile_id', profileId)
      .order('is_primary', { ascending: false });

    if (error) {
      toast.error('Could not fetch emergency contacts');
      return { success: false, error, data: [] };
    }

    return { success: true, data };
  } catch (err) {
    toast.error('An unexpected error occurred');
    return { success: false, error: err, data: [] };
  }
}

export async function updateEmergencyContact(contactId: string, updates: Partial<EmergencyContact>) {
  try {
    const { error } = await supabase
      .from('emergency_contacts')
      .update({
        name: updates.name,
        relationship: updates.relationship,
        phone: updates.phone,
        email: updates.email,
        is_primary: updates.isPrimary,
      })
      .eq('id', contactId);

    if (error) {
      toast.error('Could not update emergency contact');
      return { success: false, error };
    }

    toast.success('Emergency contact updated successfully');
    return { success: true };
  } catch (err) {
    toast.error('An unexpected error occurred');
    return { success: false, error: err };
  }
}

export async function deleteEmergencyContact(contactId: string) {
  try {
    const { error } = await supabase
      .from('emergency_contacts')
      .delete()
      .eq('id', contactId);

    if (error) {
      toast.error('Could not delete emergency contact');
      return { success: false, error };
    }

    toast.success('Emergency contact deleted successfully');
    return { success: true };
  } catch (err) {
    toast.error('An unexpected error occurred');
    return { success: false, error: err };
  }
}
