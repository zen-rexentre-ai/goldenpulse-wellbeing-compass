
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Heart, Bed, Weight } from 'lucide-react';

interface Vitals {
  steps: number;
  weight: string;
  sleep: string;
  heartRate: string;
}

interface VitalsWidgetProps {
  vitals: Vitals;
  toggleWidget: (widgetName: string) => void;
}

export const VitalsWidget: React.FC<VitalsWidgetProps> = ({ vitals, toggleWidget }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Today's Health Vitals</h2>
        <Button variant="outline" size="sm" onClick={() => toggleWidget('Vitals')}>
          Customize
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Activity size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm">Steps</h3>
                <div className="text-2xl font-semibold">{vitals.steps}</div>
                <div className="text-xs text-green-600">+12% from yesterday</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Weight size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm">Weight</h3>
                <div className="text-2xl font-semibold">{vitals.weight}</div>
                <div className="text-xs text-muted-foreground">Last updated today</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Bed size={24} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm">Sleep</h3>
                <div className="text-2xl font-semibold">{vitals.sleep}</div>
                <div className="text-xs text-amber-600">-0.5 hrs from average</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-full">
                <Heart size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm">Heart Rate</h3>
                <div className="text-2xl font-semibold">{vitals.heartRate}</div>
                <div className="text-xs text-green-600">Within normal range</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Button variant="outline" className="w-full">Update Vitals</Button>
    </div>
  );
};
