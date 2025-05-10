
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const volunteeringCategories = [
  { id: 'eldercare', label: 'Elder Care' },
  { id: 'hospitals', label: 'Hospitals' },
  { id: 'animalShelters', label: 'Animal Shelters' },
  { id: 'foodBanks', label: 'Food Banks' },
  { id: 'homelessShelters', label: 'Homeless Shelters' },
  { id: 'environmentalCleanup', label: 'Environmental Cleanup' },
  { id: 'tutoring', label: 'Tutoring' },
  { id: 'communityGardening', label: 'Community Gardening' },
];

const VolunteeringPreferences = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Volunteering Preferences</h3>
      <p className="text-sm text-muted-foreground">
        Please share your volunteering interests and availability to help us connect you with meaningful opportunities.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="volunteeringHours">How many hours per month would you like to volunteer?</Label>
          <Input 
            id="volunteeringHours" 
            type="number" 
            min="1" 
            placeholder="8" 
          />
        </div>

        <div className="space-y-2">
          <Label>What areas are you interested in volunteering? (select all that apply)</Label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {volunteeringCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={category.id} />
                <Label htmlFor={category.id} className="text-sm font-normal">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="volunteeringSkills">What skills would you like to contribute?</Label>
          <Textarea 
            id="volunteeringSkills" 
            placeholder="I can help with organizing, communication, and I have experience in healthcare..."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="volunteeringAvailability">When are you typically available?</Label>
          <Textarea 
            id="volunteeringAvailability" 
            placeholder="Weekends, Tuesday evenings..."
            className="min-h-[60px]"
          />
        </div>
      </div>
    </div>
  );
};

export default VolunteeringPreferences;
