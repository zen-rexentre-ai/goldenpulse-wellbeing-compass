import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Logo from '@/components/Logo';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-6">
        <div className="w-full max-w-md animate-fade-in">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          
          <Card className="w-full shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold mb-2">Loading...</h2>
                <p className="text-muted-foreground text-sm">Please wait while we verify your session</p>
              </div>
              
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    // Save the attempted URL for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export function PublicRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Logo size="lg" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    // Redirect authenticated users to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}