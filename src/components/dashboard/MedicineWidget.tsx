
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pill } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
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

export const MedicineWidget: React.FC<MedicineWidgetProps> = ({ medicines: initialMedicines, toggleWidget }) => {
  const [medicines, setMedicines] = useState(initialMedicines);
  const { toast } = useToast();
  
  const handleMedicineTaken = (id: number) => {
    setMedicines(prevMedicines => 
      prevMedicines.map(med => 
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
    
    // In a real app, this would update the database
    toast({
      title: "Medication status updated",
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
                <div className={`p-2 rounded-full ${medicine.taken ? 'bg-green-100' : 'bg-primary/10'}`}>
                  <Pill className={medicine.taken ? 'text-green-600' : 'text-primary'} size={20} />
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
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{medicine.taken ? 'Taken' : 'Take'}</span>
                <Switch 
                  checked={medicine.taken} 
                  onCheckedChange={() => handleMedicineTaken(medicine.id)}
                  aria-label={`Mark ${medicine.name} as ${medicine.taken ? 'not taken' : 'taken'}`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" className="w-full">View All Medications</Button>
    </div>
  );
};
