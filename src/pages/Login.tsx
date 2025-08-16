
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Fingerprint, Lock, Eye, EyeOff } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';
import LanguageSelector from '@/components/LanguageSelector';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, loading } = useAuth();
  const { t } = useLanguage();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pin, setPin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsSubmitting(true);
    const result = await signIn(email, password);
    
    if (result.success) {
      navigate(from, { replace: true });
    }
    setIsSubmitting(false);
  };

  const handlePinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // PIN login would be implemented with a separate auth method
    if (pin.length >= 4) {
      toast.info("PIN login feature coming soon!");
    } else {
      toast.error("Please enter a valid PIN");
    }
  };

  const handleBiometricLogin = () => {
    // Biometric authentication would be implemented with device APIs
    toast.info("Biometric authentication feature coming soon!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-6">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Logo size="md" />
          </Link>
          <LanguageSelector />
        </div>
        
        <Card className="w-full shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-center">{t("login_welcome")}</CardTitle>
              <ScreenReader text={t("login_welcome")} />
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="password" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>{t("password")}</span>
                </TabsTrigger>
                <TabsTrigger value="biometric" className="flex items-center gap-2">
                  <Fingerprint className="w-4 h-4" />
                  <span>{t("quick_login")}</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="password">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">{t("email")}</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">{t("password")}</Label>
                      <Link to="/forgot-password" className="text-sm text-primary underline">
                        {t("forgot_password")}
                      </Link>
                    </div>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting || loading}
                    >
                      {isSubmitting ? "Signing in..." : t("login")}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="biometric">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-center">{t("choose_login_method")}</h3>
                    
                    <RadioGroup defaultValue="pin" className="gap-4">
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="pin" id="pin" />
                        <Label htmlFor="pin" className="flex-1">{t("pin_code")}</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="fingerprint" id="fingerprint" />
                        <Label htmlFor="fingerprint" className="flex-1">{t("fingerprint")}</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="face" id="face" />
                        <Label htmlFor="face" className="flex-1">{t("face_id")}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <form onSubmit={handlePinLogin} className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="pin-code">{t("enter_pin")}</Label>
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
                    
                    <Button type="submit" className="w-full">{t("login_with_pin")}</Button>
                  </form>
                  
                  <div className="flex flex-col items-center gap-4 pt-2">
                    <p className="text-center text-sm text-muted-foreground">{t("biometric_prompt")}</p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleBiometricLogin}
                      className="flex items-center gap-2"
                    >
                      <Fingerprint className="h-5 w-5" />
                      {t("use_biometric")}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              {t("no_account")}{' '}
              <Link to="/register" className="text-primary underline underline-offset-4">
                {t("sign_up")}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
