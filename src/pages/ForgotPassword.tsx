import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    const result = await resetPassword(email);
    
    if (result.success) {
      setIsSubmitted(true);
    }
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-6">
        <div className="w-full max-w-md animate-fade-in">
          <div className="flex justify-center mb-6">
            <Logo size="md" />
          </div>
          
          <Card className="w-full shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Check Your Email</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4 text-center">
              <p className="text-muted-foreground">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Check your email and follow the instructions to reset your password.
              </p>
              
              <div className="pt-4">
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-6">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex justify-center mb-6">
          <Logo size="md" />
        </div>
        
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
            <p className="text-center text-muted-foreground">
              Enter your email address and we'll send you a reset link
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-3 pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting || !email}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
                
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;