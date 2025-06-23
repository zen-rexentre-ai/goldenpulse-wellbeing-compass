
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, AlertCircle } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FitnessFormValues } from './types';

interface Step4Props {
  form: UseFormReturn<FitnessFormValues>;
}

const Step4HealthStatus: React.FC<Step4Props> = ({ form }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-lg font-medium">Health Status</h3>
      
      {/* Chronic Conditions as Radio Buttons */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="font-medium mb-4">Chronic Conditions</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Please select the severity level for any conditions you have
          </p>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="heartRelatedLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Heart Related Conditions</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="heart-none" />
                        <label htmlFor="heart-none" className="text-sm">None</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mild" id="heart-mild" />
                        <label htmlFor="heart-mild" className="text-sm">Mild</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderate" id="heart-moderate" />
                        <label htmlFor="heart-moderate" className="text-sm">Moderate</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="severe" id="heart-severe" />
                        <label htmlFor="heart-severe" className="text-sm">Severe</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cancerLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Cancer</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="cancer-none" />
                        <label htmlFor="cancer-none" className="text-sm">None</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mild" id="cancer-mild" />
                        <label htmlFor="cancer-mild" className="text-sm">Mild</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderate" id="cancer-moderate" />
                        <label htmlFor="cancer-moderate" className="text-sm">Moderate</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="severe" id="cancer-severe" />
                        <label htmlFor="cancer-severe" className="text-sm">Severe</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="othersLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Other Conditions</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="others-none" />
                        <label htmlFor="others-none" className="text-sm">None</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mild" id="others-mild" />
                        <label htmlFor="others-mild" className="text-sm">Mild</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderate" id="others-moderate" />
                        <label htmlFor="others-moderate" className="text-sm">Moderate</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="severe" id="others-severe" />
                        <label htmlFor="others-severe" className="text-sm">Severe</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Stress Level */}
      <FormField
        control={form.control}
        name="stressLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stress Level</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="stress-none" />
                  <label htmlFor="stress-none" className="text-sm">No Stress</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mild" id="stress-mild" />
                  <label htmlFor="stress-mild" className="text-sm">Mild Stress</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="stress-high" />
                  <label htmlFor="stress-high" className="text-sm">Highly Stressed</label>
                </div>
              </RadioGroup>
            </FormControl>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              <AlertCircle className="h-3 w-3" />
              <span>High stress can negatively impact your health score</span>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Optional Metrics */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
        <h4 className="text-md font-medium mb-4 flex items-center">
          Optional Health Metrics
          <span className="text-xs text-muted-foreground ml-2">(If known)</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="heartRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resting Heart Rate (bpm)</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="number"
                      min="0"
                      placeholder="e.g. 70"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value === "" ? undefined : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </div>
                </FormControl>
                <div className="text-xs text-muted-foreground mt-1">
                  Lower resting heart rate usually indicates better cardiovascular health
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="hba1c"
            render={({ field }) => (
              <FormItem>
                <FormLabel>HbA1c (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g. 5.7"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value === "" ? undefined : Number(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="systolicBP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Systolic Blood Pressure (mmHg)</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    min="0"
                    placeholder="e.g. 120"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value === "" ? undefined : Number(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="diastolicBP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diastolic Blood Pressure (mmHg)</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    min="0"
                    placeholder="e.g. 80"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value === "" ? undefined : Number(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Step4HealthStatus;
