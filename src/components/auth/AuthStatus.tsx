import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, User, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AuthStatus() {
  const { user, session, loading } = useAuth();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Loading Authentication Status...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {user ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          Authentication Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>User Status:</span>
          <Badge variant={user ? "default" : "destructive"}>
            {user ? "Authenticated" : "Not Authenticated"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Session Status:</span>
          <Badge variant={session ? "default" : "destructive"}>
            {session ? "Active" : "No Session"}
          </Badge>
        </div>

        {user && (
          <div className="space-y-2 pt-2 border-t">
            <h4 className="font-medium">User Information:</h4>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span>ID: {user.id}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4" />
              <span>Email: {user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>Email Confirmed: {user.email_confirmed_at ? "Yes" : "No"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Created: {new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        )}

        {!user && (
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground mb-3">
              You need to be logged in to access protected features.
            </p>
            <div className="flex gap-2">
              <Button asChild size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}