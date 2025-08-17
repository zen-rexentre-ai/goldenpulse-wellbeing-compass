import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';
import Header from '@/components/Header';
import VolunteeringCarousel from '@/components/volunteering/VolunteeringCarousel';
import VolunteeringRegistrationDialog from '@/components/volunteering/VolunteeringRegistrationDialog';
import ExcelUploadDialog from '@/components/volunteering/ExcelUploadDialog';
import UserRegistrationsDialog from '@/components/volunteering/UserRegistrationsDialog';
import { volunteeringService, VolunteeringOpportunity } from '@/services/volunteeringService';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, User } from 'lucide-react';

const Volunteering = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [opportunities, setOpportunities] = useState<VolunteeringOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState<VolunteeringOpportunity | null>(null);
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  const [excelUploadOpen, setExcelUploadOpen] = useState(false);
  const [userRegistrationsOpen, setUserRegistrationsOpen] = useState(false);

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      setLoading(true);
      const data = await volunteeringService.getOpportunities();
      setOpportunities(data);
    } catch (error: any) {
      toast({
        title: t("Error"),
        description: t("Failed to load volunteering opportunities"),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = (opportunity: VolunteeringOpportunity) => {
    setSelectedOpportunity(opportunity);
    setRegistrationDialogOpen(true);
  };

  const handleRegistrationSuccess = () => {
    loadOpportunities(); // Refresh the opportunities to update available spots
  };
  
  return (
    <div className="min-h-screen flex flex-col pb-20">
      <Header title={t("volunteer")} />
      
      <div className="flex-1 container max-w-6xl py-6 space-y-6">
        {/* New Carousel Section */}
        <VolunteeringCarousel />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{t("volunteer")}</h1>
            <ScreenReader text={t("volunteer")} />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setUserRegistrationsOpen(true)}>
              <User className="h-4 w-4 mr-1" />
              {t("My Registrations")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setExcelUploadOpen(true)}>
              <Upload className="h-4 w-4 mr-1" />
              {t("Upload Excel")}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">{t("Your Preferences")}</h2>
          <Card className="border border-primary/20">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t("Interests")}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">{t("Elder Care")}</Badge>
                    <Badge variant="secondary">{t("Animal Shelters")}</Badge>
                    <Badge variant="secondary">{t("Environmental Cleanup")}</Badge>
                    <Badge variant="secondary">{t("Community Gardening")}</Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t("Availability")}</p>
                  <p>{t("Weekends, Tuesday evenings")}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t("Hours per month")}</p>
                  <p>8 {t("hours")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">{t("Upcoming Opportunities")}</h2>
            <ScreenReader text={t("Upcoming Opportunities")} />
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : opportunities.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">{t("No volunteering opportunities available at the moment")}</p>
                <p className="text-sm text-muted-foreground mt-2">{t("Check back later for new opportunities")}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {opportunities.map((opportunity) => {
                const availableSpots = opportunity.total_spots - opportunity.filled_spots;
                return (
                  <Card key={opportunity.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-md">{opportunity.title}</CardTitle>
                        <Badge>{opportunity.category.name}</Badge>
                      </div>
                      <CardDescription>{opportunity.organization}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{new Date(opportunity.date).toLocaleDateString()}</span>
                          <span className={availableSpots > 0 ? "text-green-600" : "text-red-600"}>
                            {availableSpots} {t("spots left")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                        <p className="text-sm">{t("Time")}: {opportunity.time}</p>
                        {opportunity.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{opportunity.description}</p>
                        )}
                        <Button 
                          className="w-full mt-2" 
                          size="sm"
                          onClick={() => handleSignUp(opportunity)}
                          disabled={availableSpots <= 0}
                        >
                          {availableSpots > 0 ? t("Sign Up") : t("Fully Booked")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <VolunteeringRegistrationDialog
        open={registrationDialogOpen}
        onOpenChange={setRegistrationDialogOpen}
        opportunity={selectedOpportunity}
        onRegistrationSuccess={handleRegistrationSuccess}
      />

      <ExcelUploadDialog
        open={excelUploadOpen}
        onOpenChange={setExcelUploadOpen}
        onUploadSuccess={loadOpportunities}
      />

      <UserRegistrationsDialog
        open={userRegistrationsOpen}
        onOpenChange={setUserRegistrationsOpen}
      />

      <BottomNavigation />
    </div>
  );
};

export default Volunteering;
