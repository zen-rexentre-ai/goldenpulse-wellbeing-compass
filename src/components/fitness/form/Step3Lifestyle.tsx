
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Bed, Activity, Cigarette, Beer } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FitnessFormValues } from './types';

interface Step3Props {
  form: UseFormReturn<FitnessFormValues>;
}

const Step3Lifestyle: React.FC<Step3Props> = ({ form }) => {
  const genderValue = form.watch("gender");
  const showSmokingAlcohol = genderValue !== "female";

  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-medium">Lifestyle</h3>
      
      <FormField
        control={form.control}
        name="goodSleepQuality"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Do you get 6+ hours of calm, deep sleep?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="sleep-yes" />
                  <label htmlFor="sleep-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="sleep-no" />
                  <label htmlFor="sleep-no">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Bed className="h-4 w-4" />
              <span className="text-xs">Quality sleep is essential for health</span>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="exerciseMinutes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weekly Exercise (minutes): {field.value}</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Slider
                  min={0}
                  max={300}
                  step={5}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>150</span>
                  <span>300</span>
                </div>
              </div>
            </FormControl>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span className="text-xs">Recommended: 150+ minutes/week</span>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {showSmokingAlcohol && (
        <>
          <FormField
            control={form.control}
            name="smokingStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Smoking Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <div className="flex items-center space-x-2">
                        <Cigarette className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select smoking status" />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="never">Never Smoked</SelectItem>
                    <SelectItem value="former">Former Smoker</SelectItem>
                    <SelectItem value="current">Current Smoker</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="alcoholUnits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alcohol Consumption (units/week)</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Beer className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="number"
                      min={0}
                      placeholder="Units per week"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value === "" ? 0 : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </div>
                </FormControl>
                <div className="text-xs text-muted-foreground mt-1">
                  1 unit ≈ 1 small glass of wine or 1/2 pint of beer
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
};

export default Step3Lifestyle;
