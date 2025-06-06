
import { supabase } from '@/integrations/supabase/client';

export interface TestProfile {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
}

export const connectionTestService = {
  // Test reading from profiles table
  async testRead(): Promise<{ success: boolean; data?: TestProfile[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, created_at')
        .limit(5);

      if (error) {
        console.error('Read test failed:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (err) {
      console.error('Read test error:', err);
      return { success: false, error: 'Failed to read from database' };
    }
  },

  // Test authentication status
  async testAuth(): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Auth test failed:', error);
        return { success: false, error: error.message };
      }

      return { success: true, user };
    } catch (err) {
      console.error('Auth test error:', err);
      return { success: false, error: 'Failed to check authentication' };
    }
  },

  // Test database connection with a simple query
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('profiles')
        .select('count', { count: 'exact', head: true });

      if (error) {
        console.error('Connection test failed:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      console.error('Connection test error:', err);
      return { success: false, error: 'Failed to connect to database' };
    }
  }
};
