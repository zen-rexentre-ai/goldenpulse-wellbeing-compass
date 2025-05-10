
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Plus, X, Upload, Pill, FileImage } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MedicineItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
}

const MedicineList: React.FC = () => {
  const [medicines, setMedicines] = useState<MedicineItem[]>([]);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [purpose, setPurpose] = useState('');

  const addMedicine = () => {
    if (name.trim()) {
      const newMedicine: MedicineItem = {
        id: Date.now().toString(),
        name,
        dosage,
        frequency,
        purpose
      };
      
      setMedicines([...medicines, newMedicine]);
      setName('');
      setDosage('');
      setFrequency('');
      setPurpose('');
    }
  };

  const removeMedicine = (id: string) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Current Medication List</h2>
        <p className="text-muted-foreground mb-4">
          Add all medications you currently take, including prescription, over-the-counter, 
          supplements, and vitamins.
        </p>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <Pill className="w-4 h-4" />
            <span>Manual Entry</span>
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <FileImage className="w-4 h-4" />
            <span>Upload Prescription</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="med-name">Medication Name</Label>
                  <Input 
                    id="med-name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Metformin"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="med-dosage">Dosage</Label>
                  <Input 
                    id="med-dosage" 
                    value={dosage} 
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="e.g., 500mg"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="med-frequency">Frequency</Label>
                  <Select 
                    value={frequency}
                    onValueChange={setFrequency}
                  >
                    <SelectTrigger id="med-frequency">
                      <SelectValue placeholder="How often do you take it?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once-daily">Once daily</SelectItem>
                      <SelectItem value="twice-daily">Twice daily</SelectItem>
                      <SelectItem value="three-times-daily">Three times daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="as-needed">As needed</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="med-purpose">Purpose</Label>
                  <Input 
                    id="med-purpose" 
                    value={purpose} 
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="e.g., For diabetes management"
                  />
                </div>
              </div>
            </div>

            <Button 
              onClick={addMedicine} 
              className="w-full" 
              size="sm"
              disabled={name.trim() === ''} 
              type="button"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Medication
            </Button>
          </div>

          {medicines.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Your Medication List:</h3>
              <div className="space-y-2">
                {medicines.map((med) => (
                  <Card key={med.id} className="border">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">{med.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {med.dosage} {med.frequency && `• ${med.frequency}`}
                          {med.purpose && ` • ${med.purpose}`}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeMedicine(med.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upload">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50">
            <div className="flex flex-col items-center text-center space-y-4">
              <FileImage className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">Upload Prescription Images</p>
                <p className="text-sm text-muted-foreground">
                  Drag and drop or click to upload prescriptions or medication lists
                </p>
              </div>
              <Button className="flex gap-2 items-center">
                <Upload className="h-4 w-4" /> Choose Files
                <Input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicineList;
