import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Heart, Activity, ThermometerSnowflake, Bed } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const VitalInput: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Vital Information</h2>
        <p className="text-muted-foreground mb-4">
          Enter your baseline health measurements to track your progress.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 bg-primary/10 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Heart Health</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="blood-pressure-systolic">Blood Pressure (Systolic)</Label>
                <Input 
                  id="blood-pressure-systolic" 
                  type="number"
                  placeholder="120" 
                />
                <p className="text-xs text-muted-foreground">mmHg (Top number)</p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="blood-pressure-diastolic">Blood Pressure (Diastolic)</Label>
                <Input 
                  id="blood-pressure-diastolic" 
                  type="number"
                  placeholder="80" 
                />
                <p className="text-xs text-muted-foreground">mmHg (Bottom number)</p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="heart-rate">Heart Rate (Resting)</Label>
                <Input 
                  id="heart-rate" 
                  type="number"
                  placeholder="72" 
                />
                <p className="text-xs text-muted-foreground">Beats per minute</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 bg-primary/10 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Body Measurements</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="height">Height</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input 
                    id="height" 
                    type="number"
                    placeholder="5" 
                  />
                  <Input 
                    id="height-inches" 
                    type="number"
                    placeholder="10" 
                  />
                </div>
                <p className="text-xs text-muted-foreground">Feet and inches</p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight</Label>
                <Input 
                  id="weight" 
                  type="number"
                  placeholder="150" 
                />
                <p className="text-xs text-muted-foreground">Pounds</p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="blood-sugar">Blood Sugar (if applicable)</Label>
                <Input 
                  id="blood-sugar" 
                  type="number"
                  placeholder="100" 
                />
                <p className="text-xs text-muted-foreground">mg/dL</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 bg-primary/10 flex items-center gap-2">
              <Bed className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Sleep Patterns</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="sleep-duration">Average Sleep Duration</Label>
                <Select defaultValue="7-8">
                  <SelectTrigger id="sleep-duration">
                    <SelectValue placeholder="Select hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-5">Less than 5 hours</SelectItem>
                    <SelectItem value="5-6">5-6 hours</SelectItem>
                    <SelectItem value="7-8">7-8 hours</SelectItem>
                    <SelectItem value="more-8">More than 8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Sleep Quality</Label>
                <div className="pt-2">
                  <Slider
                    defaultValue={[3]}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span>Very Good</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 bg-primary/10 flex items-center gap-2">
              <ThermometerSnowflake className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Additional Vitals</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="temperature">Body Temperature</Label>
                <Input 
                  id="temperature" 
                  type="number" 
                  placeholder="98.6"
                  step="0.1" 
                />
                <p className="text-xs text-muted-foreground">°F (normal is 98.6°F)</p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="oxygen-level">Oxygen Saturation</Label>
                <Input 
                  id="oxygen-level" 
                  type="number"
                  placeholder="98" 
                />
                <p className="text-xs text-muted-foreground">% (normal is 95-100%)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VitalInput;
