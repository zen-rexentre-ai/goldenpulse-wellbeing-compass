
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Edit, MapPin, PhoneCall } from 'lucide-react';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import LocationMap from '@/components/LocationMap';
import { toast } from "@/hooks/use-toast";
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';
import Header from '@/components/Header';

const EmergencyContacts = () => {
  const [pressing, setPressing] = useState(false);
  const [pressProgress, setPressProgress] = useState(0);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();
  const primaryPhone = "(555) 123-4567"; // This would come from your user data in a real app
  
  const handlePressStart = () => {
    setPressing(true);
    setPressProgress(0);
    
    // Start progress timer
    progressInterval.current = setInterval(() => {
      setPressProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval.current as NodeJS.Timeout);
          return 100;
        }
        return prev + (100 / 7000) * 100; // Increase by percentage points per 100ms (7 seconds total)
      });
    }, 100);
    
    // Start the main timer for 7 seconds
    pressTimer.current = setTimeout(() => {
      handleEmergencyCall();
      clearInterval(progressInterval.current as NodeJS.Timeout);
    }, 7000);
  };
  
  const handlePressEnd = () => {
    setPressing(false);
    setPressProgress(0);
    
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };
  
  const handleEmergencyCall = () => {
    // In a real app, this would use a native phone API
    toast({
      title: "Emergency call initiated",
      description: `Calling primary emergency contact: ${primaryPhone}`,
      variant: "destructive"
    });
    
    // This would be the actual call implementation
    window.location.href = `tel:${primaryPhone.replace(/[^0-9]/g, '')}`;
  };

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <Header title={t("emergency_contacts")} />
      
      <div className="flex-1 container max-w-6xl py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("emergency_contacts")}</h1>
          <ScreenReader text={t("emergency_contacts")} />
        </div>
        
        {/* SOS Button */}
        <div className="flex justify-center my-6">
          <div className="relative">
            <Button 
              className="rounded-full h-24 w-24 text-lg font-bold bg-red-600 hover:bg-red-700 flex flex-col items-center justify-center"
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              aria-label={t("Emergency SOS button")}
            >
              <PhoneCall className="h-8 w-8 mb-1" />
              SOS
            </Button>
            
            {pressing && (
              <div className="absolute bottom-0 left-0 right-0 bg-gray-200 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-red-600 h-full transition-all duration-100"
                  style={{ width: `${pressProgress}%` }}
                />
              </div>
            )}
            
            {pressing && pressProgress > 0 && (
              <div className="absolute -bottom-8 w-full text-center text-xs text-gray-500">
                {t("Hold for")} {Math.max(0, Math.ceil(7 - (pressProgress * 7 / 100)))} {t("more seconds")}
              </div>
            )}
          </div>
        </div>
        
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-500" />
                {t("your_current_location")}
              </CardTitle>
              <ScreenReader text={t("your_current_location")} />
            </div>
          </CardHeader>
          <CardContent>
            <LocationMap className="mt-2" />
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{t("primary_physician")}</CardTitle>
              <ScreenReader text={t("primary_physician")} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Dr. John Smith</p>
                  <p className="text-sm text-muted-foreground">123 Medical Center Dr.</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4 mr-1" /> {t("Edit")}
                </Button>
              </div>
              <Button variant="outline" className="w-full flex gap-2 mt-2" size="sm">
                <Phone className="h-4 w-4" /> (555) 123-4567
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{t("primary_emergency_contact")}</CardTitle>
              <ScreenReader text={t("primary_emergency_contact")} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Jane Doe</p>
                  <p className="text-sm text-muted-foreground">Spouse</p>
                  <p className="text-sm text-muted-foreground">jane@example.com</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4 mr-1" /> {t("Edit")}
                </Button>
              </div>
              <Button variant="outline" className="w-full flex gap-2 mt-2" size="sm">
                <Phone className="h-4 w-4" /> (555) 987-6543
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-600">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{t("secondary_emergency_contact")}</CardTitle>
              <ScreenReader text={t("secondary_emergency_contact")} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Robert Johnson</p>
                  <p className="text-sm text-muted-foreground">Son</p>
                  <p className="text-sm text-muted-foreground">robert@example.com</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4 mr-1" /> {t("Edit")}
                </Button>
              </div>
              <Button variant="outline" className="w-full flex gap-2 mt-2" size="sm">
                <Phone className="h-4 w-4" /> (555) 456-7890
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default EmergencyContacts;
