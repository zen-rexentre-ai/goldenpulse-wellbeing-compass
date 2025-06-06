
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const HealthCheck = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const checkConnection = async () => {
    setConnectionStatus('checking');
    setErrorMessage('');
    
    try {
      // Test database connection
      const { data, error } = await supabase
        .from('profiles')
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        console.error('Supabase connection error:', error);
        setConnectionStatus('error');
        setErrorMessage(error.message);
      } else {
        console.log('Supabase connection successful');
        setConnectionStatus('connected');
      }
    } catch (err) {
      console.error('Connection test failed:', err);
      setConnectionStatus('error');
      setErrorMessage('Failed to connect to database');
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'checking':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'checking':
        return 'Checking connection...';
      case 'connected':
        return 'Database connected successfully';
      case 'error':
        return `Connection failed: ${errorMessage}`;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          Database Health Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {getStatusText()}
        </p>
        <Button 
          onClick={checkConnection} 
          disabled={connectionStatus === 'checking'}
          className="w-full"
        >
          {connectionStatus === 'checking' ? 'Checking...' : 'Test Connection'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HealthCheck;
