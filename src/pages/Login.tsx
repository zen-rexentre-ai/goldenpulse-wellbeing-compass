
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Fingerprint, Lock } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Login = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would authenticate with a backend
    toast.success("Login successful!");
    navigate('/dashboard');
  };

  const handlePinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would verify the PIN
    if (pin.length >= 4) {
      toast.success("PIN login successful!");
      navigate('/dashboard');
    } else {
      toast.error("Please enter a valid PIN");
    }
  };

  const handleBiometricLogin = () => {
    // In a real app, this would trigger native biometric authentication
    toast.success("Biometric authentication successful!");
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-6">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <Logo size="md" />
          </Link>
        </div>
        
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="password" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Password</span>
                </TabsTrigger>
                <TabsTrigger value="biometric" className="flex items-center gap-2">
                  <Fingerprint className="w-4 h-4" />
                  <span>Quick Login</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="password">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-sm text-primary underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="password" type="password" />
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full">Log In</Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="biometric">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-center">Choose a Quick Login Method</h3>
                    
                    <RadioGroup defaultValue="pin" className="gap-4">
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="pin" id="pin" />
                        <Label htmlFor="pin" className="flex-1">PIN Code</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="fingerprint" id="fingerprint" />
                        <Label htmlFor="fingerprint" className="flex-1">Fingerprint</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="face" id="face" />
                        <Label htmlFor="face" className="flex-1">Face ID</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <form onSubmit={handlePinLogin} className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="pin-code">Enter PIN</Label>
                      <Input 
                        id="pin-code" 
                        type="password" 
                        inputMode="numeric" 
                        maxLength={6} 
                        placeholder="• • • • • •"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="text-center text-xl tracking-widest"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">Login with PIN</Button>
                  </form>
                  
                  <div className="flex flex-col items-center gap-4 pt-2">
                    <p className="text-center text-sm text-muted-foreground">Or use biometric authentication</p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleBiometricLogin}
                      className="flex items-center gap-2"
                    >
                      <Fingerprint className="h-5 w-5" />
                      Use Biometric Login
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary underline underline-offset-4">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
