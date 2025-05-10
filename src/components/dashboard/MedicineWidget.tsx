
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pill } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Medicine {
  id: number;
  name: string;
  time: string;
  dosage: string;
  taken: boolean;
}

interface MedicineWidgetProps {
  medicines: Medicine[];
  toggleWidget: (widgetName: string) => void;
}

export const MedicineWidget: React.FC<MedicineWidgetProps> = ({ medicines, toggleWidget }) => {
  const { toast } = useToast();
  
  const handleMedicineTaken = (id: number) => {
    // In a real app, this would update the database
    toast({
      title: "Medicine marked as taken",
      description: "We've updated your medication record."
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Today's Medications</h2>
        <Button variant="outline" size="sm" onClick={() => toggleWidget('Medicines')}>
          Customize
        </Button>
      </div>
      
      {medicines.map(medicine => (
        <Card key={medicine.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Pill className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">{medicine.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{medicine.time}</span>
                    <span>•</span>
                    <span>{medicine.dosage}</span>
                  </div>
                </div>
              </div>
              <Button 
                variant={medicine.taken ? "secondary" : "default"}
                onClick={() => handleMedicineTaken(medicine.id)}
              >
                {medicine.taken ? "Taken" : "Take Now"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" className="w-full">View All Medications</Button>
    </div>
  );
};
