
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

const SESSION_TOKEN_KEY = 'anonymous_session_token';

export function useAnonymousSession() {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeSession = async () => {
      let token = localStorage.getItem(SESSION_TOKEN_KEY);
      let isNewSession = false;

      if (!token) {
        token = uuidv4();
        isNewSession = true;
        localStorage.setItem(SESSION_TOKEN_KEY, token);
      }
      
      // @ts-ignore
      supabase.global.headers = {
        ...supabase.global.headers,
        'x-session-token': token,
      };

      if (isNewSession) {
        const { error } = await supabase
          .from('anonymous_sessions')
          .insert({ session_token: token });

        if (error) {
          console.error('Error creating anonymous session:', error);
          localStorage.removeItem(SESSION_TOKEN_KEY);
          // @ts-ignore
          delete supabase.global.headers['x-session-token'];
          token = null;
        }
      }
      
      setSessionToken(token);
      setIsInitialized(true);
    };

    initializeSession();
  }, []);

  return { sessionToken, isInitialized };
}
