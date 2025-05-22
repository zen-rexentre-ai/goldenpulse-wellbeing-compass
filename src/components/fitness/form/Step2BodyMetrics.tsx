
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Ruler, Weight } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FitnessFormValues } from './types';

interface Step2Props {
  form: UseFormReturn<FitnessFormValues>;
}

const Step2BodyMetrics: React.FC<Step2Props> = ({ form }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-medium">Body Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="heightUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height Unit</FormLabel>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Switch 
                      checked={field.value === "in"}
                      onCheckedChange={(checked) => field.onChange(checked ? "in" : "cm")}
                    />
                  </FormControl>
                  <span className="text-sm">{field.value === "cm" ? "Centimeters (cm)" : "Inches (in)"}</span>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => {
              const heightUnit = form.watch("heightUnit");
              return (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Ruler className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number"
                        placeholder={heightUnit === "cm" ? "Height in cm" : "Height in inches"}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value === "" ? undefined : Number(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="weightUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight Unit</FormLabel>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Switch 
                      checked={field.value === "lb"}
                      onCheckedChange={(checked) => field.onChange(checked ? "lb" : "kg")}
                    />
                  </FormControl>
                  <span className="text-sm">{field.value === "kg" ? "Kilograms (kg)" : "Pounds (lb)"}</span>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => {
              const weightUnit = form.watch("weightUnit");
              return (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Weight className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number"
                        placeholder={weightUnit === "kg" ? "Weight in kg" : "Weight in pounds"}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value === "" ? undefined : Number(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2BodyMetrics;
