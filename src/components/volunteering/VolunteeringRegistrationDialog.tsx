import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { volunteeringService, VolunteeringOpportunity } from '@/services/volunteeringService';
import { useLanguage } from '@/components/LanguageProvider';

interface VolunteeringRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: VolunteeringOpportunity | null;
  onRegistrationSuccess: () => void;
}

const VolunteeringRegistrationDialog: React.FC<VolunteeringRegistrationDialogProps> = ({
  open,
  onOpenChange,
  opportunity,
  onRegistrationSuccess
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!opportunity) return;

    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: t("Error"),
        description: t("Please fill in all required fields"),
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await volunteeringService.registerForOpportunity(
        opportunity.id,
        formData.name,
        formData.phone,
        formData.address,
        formData.notes
      );

      toast({
        title: t("Registration Successful"),
        description: t("You have been registered for this volunteering opportunity"),
      });

      setFormData({ name: '', phone: '', address: '', notes: '' });
      onOpenChange(false);
      onRegistrationSuccess();
    } catch (error: any) {
      toast({
        title: t("Registration Failed"),
        description: error.message || t("An error occurred during registration"),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!opportunity) return null;

  const availableSpots = opportunity.total_spots - opportunity.filled_spots;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("Register for Volunteering")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium">{opportunity.title}</h3>
            <p className="text-sm text-muted-foreground">{opportunity.organization}</p>
            <div className="mt-2 space-y-1 text-sm">
              <p><strong>{t("Date")}:</strong> {opportunity.date}</p>
              <p><strong>{t("Time")}:</strong> {opportunity.time}</p>
              <p><strong>{t("Location")}:</strong> {opportunity.location}</p>
              <p><strong>{t("Available Spots")}:</strong> {availableSpots}</p>
              <p><strong>{t("Coordinator")}:</strong> {opportunity.coordinator.name}</p>
            </div>
          </div>

          {availableSpots <= 0 ? (
            <div className="text-center p-4">
              <p className="text-destructive font-medium">{t("No spots available")}</p>
              <p className="text-sm text-muted-foreground">{t("This opportunity is fully booked")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("Full Name")} *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t("Enter your full name")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t("Phone Number")} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder={t("Enter your phone number")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{t("Address")} *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder={t("Enter your full address")}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">{t("Additional Notes")} ({t("Optional")})</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder={t("Any additional information or special requirements")}
                  rows={2}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  {t("Cancel")}
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? t("Registering...") : t("Register")}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VolunteeringRegistrationDialog;