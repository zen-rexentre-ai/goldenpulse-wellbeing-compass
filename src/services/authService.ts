
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export async function signUp(email: string, password: string, fullName: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      return { success: false, error };
    }

    // Create profile entry
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          full_name: fullName,
          email,
        });

      if (profileError) {
        toast.error('Could not create user profile');
        return { success: false, error: profileError };
      }
    }

    toast.success('Registration successful! Please check your email for verification.');
    return { success: true, data };
  } catch (err) {
    toast.error('An unexpected error occurred');
    return { success: false, error: err };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return { success: false, error };
    }

    toast.success('Login successful!');
    return { success: true, data };
  } catch (err) {
    toast.error('An unexpected error occurred');
    return { success: false, error: err };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error(error.message);
      return { success: false, error };
    }
    
    toast.success('Logged out successfully');
    return { success: true };
  } catch (err) {
    toast.error('An unexpected error occurred');
    return { success: false, error: err };
  }
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return { session: null, error };
  }
  return { session: data.session, error: null };
}
