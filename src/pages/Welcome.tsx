
import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';
import { EmbossedCard } from '@/components/ui/card';
import { Mail, Phone, User, GraduationCap, QrCode } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const Welcome = () => {
  const isMobile = useIsMobile();
  
  const handleImageError = () => {
    toast({
      title: "Image Loading Issue",
      description: "There was a problem loading the QR code image.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-secondary p-4">
      <div className="w-full max-w-md flex flex-col items-center gap-2 animate-fade-in py-2">
        <Logo size="lg" />
        
        <div className="text-center space-y-2 mt-1">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <p className="text-lg">
            We're delighted to have you here.
          </p>
          <p className="text-lg font-medium">
            We Empower Seniors Live Vibrant, Purposeful and Fulfilling lives.
          </p>
        </div>
        
        <div className="w-full rounded-lg overflow-hidden shadow-lg mt-2">
          <img 
            src="/lovable-uploads/1afecd79-96fc-404a-9fd6-6d7cee1b4bf1.png" 
            alt="Senior couple enjoying their golden years"
            className="w-full h-auto object-cover brightness-105 contrast-105"
          />
        </div>
        
        <div className="w-full space-y-4 my-4">
           <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">What Awaits You:</h1>
           </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Card - Wellness Module */}
            <EmbossedCard className="overflow-hidden">
              <div className="bg-gradient-to-br from-golden-pink to-golden-peach p-6 h-full">
                <h3 className="text-xl font-bold mb-3 text-golden-dark">Wellness Module</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-lg">•</span>
                    <span>Personalized Wellness Journey</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-lg">•</span>
                    <span>Emergency Services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-lg">•</span>
                    <span>AI Powered Diagnostics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-lg">•</span>
                    <span>Track Your Kin</span>
                  </li>
                </ul>
              </div>
            </EmbossedCard>
            
            {/* Second Card - Community Module */}
            <EmbossedCard className="overflow-hidden">
              <div className="bg-gradient-to-br from-golden-yellow to-golden-orange p-6 h-full">
                <h3 className="text-xl font-bold mb-3 text-golden-dark">Community Module</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-lg">•</span>
                    <span>Volunteering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-lg">•</span>
                    <span>Webinars</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-lg">•</span>
                    <span>Hobbies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-lg">•</span>
                    <span>Fun and Cognitive Games</span>
                  </li>
                </ul>
              </div>
            </EmbossedCard>
          </div>
        </div>
        
        <div className="w-full space-y-3">
          <h2 className="text-2xl font-bold text-center">Ready to Embrace Your Best Years?</h2>
          
          {/* Founders Section with split layout - Fixed width issue */}
          <EmbossedCard className="p-4 mb-3 w-full">
            <h3 className="text-center text-lg font-medium mb-3">Meet Our Founders</h3>
            <div className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-2 gap-2"} w-full`}>
              {/* Founder 1 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-primary" />
                  <span>Harinath Chakrapani</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-golden-purple" />
                  <span>
                    <span className="text-golden-purple font-medium">IIMB Alumni</span>
                    <span className="mx-1">·</span>
                    <span className="text-golden-dark">AMP-18</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+91-9840178288</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>harinath04@gmail.com</span>
                </div>
              </div>
              
              {/* Separator for desktop view */}
              {!isMobile && (
                <div className="flex justify-center">
                  <Separator orientation="vertical" className="mx-2" />
                </div>
              )}
              
              {/* Separator for mobile view */}
              {isMobile && <Separator className="my-3" />}
              
              {/* Founder 2 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-primary" />
                  <span>Mahadevan Ranganathan</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-golden-purple" />
                  <span className="text-golden-dark">Retired COO</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+91-9841044186</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>mahadevan.ranganathan@gmail.com</span>
                </div>
              </div>
            </div>
          </EmbossedCard>
          
          {/* QR Code Section */}
          <EmbossedCard className="p-4 mb-3 w-full overflow-hidden">
            <div className="bg-gradient-to-br from-golden-pink to-golden-peach p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold text-golden-dark">Visit GoldenPulse.ai</h3>
                </div>
                <p className="text-sm md:text-base">
                  Scan this QR code to access additional resources, latest updates, 
                  and community events on our website.
                </p>
              </div>
              
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white p-2 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/lovable-uploads/24569b38-feb1-45d0-afdb-859e860a4197.png"
                  alt="QR Code for GoldenPulse.ai"
                  className="w-full h-full object-contain"
                  onError={handleImageError}
                />
              </div>
            </div>
          </EmbossedCard>
          
          <div className="grid gap-3">
            <Link to="/register">
              <Button className="w-full text-lg py-5" size="lg">
                Create Account
              </Button>
            </Link>
            
            <Link to="/login">
              <Button className="w-full text-lg py-5" variant="outline" size="lg">
                I Already Have an Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
