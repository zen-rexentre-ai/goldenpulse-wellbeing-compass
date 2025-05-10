
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Heart, Bed, Weight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

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

export const VitalsWidget: React.FC<VitalsWidgetProps> = ({ vitals: initialVitals, toggleWidget }) => {
  const [vitals, setVitals] = useState(initialVitals);
  const [newVitals, setNewVitals] = useState({
    steps: initialVitals.steps,
    weight: initialVitals.weight.split(' ')[0],
    sleep: initialVitals.sleep.split(' ')[0],
    heartRate: initialVitals.heartRate.split(' ')[0]
  });
  const { toast } = useToast();

  const handleVitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVitals(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setVitals({
      steps: Number(newVitals.steps),
      weight: `${newVitals.weight} kg`,
      sleep: `${newVitals.sleep} hrs`,
      heartRate: `${newVitals.heartRate} bpm`
    });
    
    toast({
      title: "Vitals Updated",
      description: "Your health vitals have been successfully updated."
    });
  };

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
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">Update Vitals</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Your Vitals</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="steps">Steps</Label>
              <Input 
                id="steps" 
                name="steps"
                type="number" 
                value={newVitals.steps}
                onChange={handleVitalChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input 
                id="weight" 
                name="weight"
                type="number" 
                step="0.1"
                value={newVitals.weight}
                onChange={handleVitalChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="sleep">Sleep (hours)</Label>
              <Input 
                id="sleep" 
                name="sleep"
                type="number" 
                step="0.1"
                value={newVitals.sleep}
                onChange={handleVitalChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="heartRate">Resting Heart Rate (bpm)</Label>
              <Input 
                id="heartRate" 
                name="heartRate"
                type="number" 
                value={newVitals.heartRate}
                onChange={handleVitalChange}
              />
            </div>
            
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Save Changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
