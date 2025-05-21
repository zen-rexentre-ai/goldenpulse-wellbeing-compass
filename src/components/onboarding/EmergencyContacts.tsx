
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

const EmergencyContacts = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Emergency Contacts</h3>
      <p className="text-sm text-muted-foreground">
        Please provide contact information for your next of kin to reach out incase of emergency.  Providing additional contacts of your personal physician might help in medical emergencies.
      </p>

      <Card className="border border-primary/20">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-4">Primary Physician</h4>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="physicianName">Full Name</Label>
                <Input id="physicianName" placeholder="Dr. John Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="physicianPhone">Phone Number</Label>
                <Input id="physicianPhone" placeholder="+91 9812345678" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="physicianAddress">Address</Label>
              <Input id="physicianAddress" placeholder="123 Medical Center Dr." />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-primary/20">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-4">Primary Emergency Contact</h4>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="primaryName">Full Name</Label>
                <Input id="primaryName" placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryPhone">Phone Number</Label>
                <Input id="primaryPhone" placeholder="+91 9812345678" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="primaryRelationship">Relationship</Label>
                <Input id="primaryRelationship" placeholder="Spouse" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryEmail">Email</Label>
                <Input id="primaryEmail" type="email" placeholder="jane@example.com" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-primary/20">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-4">Secondary Emergency Contact</h4>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="secondaryName">Full Name</Label>
                <Input id="secondaryName" placeholder="Robert Johnson" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryPhone">Phone Number</Label>
                <Input id="secondaryPhone" placeholder="+91 9812345678" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="secondaryRelationship">Relationship</Label>
                <Input id="secondaryRelationship" placeholder="Son" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryEmail">Email</Label>
                <Input id="secondaryEmail" type="email" placeholder="robert@example.com" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyContacts;
