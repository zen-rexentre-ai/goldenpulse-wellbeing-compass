
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Edit, MapPin } from 'lucide-react';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import LocationMap from '@/components/LocationMap';

const EmergencyContacts = () => {
  return (
    <div className="min-h-screen flex flex-col pb-20">
      <div className="flex-1 container max-w-6xl py-6 space-y-6">
        <h1 className="text-2xl font-bold">Emergency Contacts</h1>
        
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-500" />
              Your Current Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LocationMap className="mt-2" />
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Primary Physician</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Dr. John Smith</p>
                  <p className="text-sm text-muted-foreground">123 Medical Center Dr.</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4 mr-1" /> Edit
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
            <CardTitle className="text-lg">Primary Emergency Contact</CardTitle>
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
                  <Edit className="h-4 w-4 mr-1" /> Edit
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
            <CardTitle className="text-lg">Secondary Emergency Contact</CardTitle>
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
                  <Edit className="h-4 w-4 mr-1" /> Edit
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
