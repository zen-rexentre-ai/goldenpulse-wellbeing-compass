import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { volunteeringService, VolunteeringRegistration } from '@/services/volunteeringService';
import { useLanguage } from '@/components/LanguageProvider';
import { Loader2, Calendar, MapPin, Clock, Phone, Mail } from 'lucide-react';

interface UserRegistrationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserRegistrationsDialog: React.FC<UserRegistrationsDialogProps> = ({
  open,
  onOpenChange
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState<VolunteeringRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      loadRegistrations();
    }
  }, [open]);

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      const data = await volunteeringService.getUserRegistrations();
      setRegistrations(data);
    } catch (error: any) {
      toast({
        title: t("Error"),
        description: t("Failed to load your registrations"),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async (registrationId: string) => {
    try {
      setCancellingId(registrationId);
      await volunteeringService.cancelRegistration(registrationId);
      
      toast({
        title: t("Registration Cancelled"),
        description: t("Your registration has been cancelled successfully"),
      });
      
      await loadRegistrations(); // Refresh the list
    } catch (error: any) {
      toast({
        title: t("Cancellation Failed"),
        description: error.message || t("Failed to cancel registration"),
        variant: "destructive"
      });
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("My Volunteering Registrations")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">{t("You have no volunteering registrations yet")}</p>
              <p className="text-sm text-muted-foreground mt-2">{t("Sign up for opportunities to see them here")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {registrations.map((registration) => (
                <Card key={registration.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{registration.opportunity.title}</CardTitle>
                        <p className="text-muted-foreground">{registration.opportunity.organization}</p>
                      </div>
                      <Badge className={getStatusColor(registration.status)}>
                        {t(registration.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(registration.opportunity.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{registration.opportunity.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{registration.opportunity.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{registration.registrant_phone}</span>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <h4 className="font-medium text-sm mb-2">{t("Coordinator")}</h4>
                      <div className="space-y-1 text-sm">
                        <p>{registration.opportunity.coordinator.name}</p>
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{registration.opportunity.coordinator.email}</span>
                        </div>
                        {registration.opportunity.coordinator.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{registration.opportunity.coordinator.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {registration.opportunity.description && (
                      <div className="border-t pt-3">
                        <h4 className="font-medium text-sm mb-1">{t("Description")}</h4>
                        <p className="text-sm text-muted-foreground">{registration.opportunity.description}</p>
                      </div>
                    )}

                    {registration.notes && (
                      <div className="border-t pt-3">
                        <h4 className="font-medium text-sm mb-1">{t("Your Notes")}</h4>
                        <p className="text-sm text-muted-foreground">{registration.notes}</p>
                      </div>
                    )}

                    {registration.status === 'registered' && (
                      <div className="border-t pt-3">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelRegistration(registration.id)}
                          disabled={cancellingId === registration.id}
                          className="w-full"
                        >
                          {cancellingId === registration.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {t("Cancelling...")}
                            </>
                          ) : (
                            t("Cancel Registration")
                          )}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserRegistrationsDialog;