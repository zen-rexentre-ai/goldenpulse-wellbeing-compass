
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { User, Mail, Phone, Ruler, Weight, Heart, Activity, Bed, Cigarette, Beer, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

// Form schema
const formSchema = z.object({
  // Step 1: Basic Info
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  
  // Step 2: Body Metrics
  height: z.coerce.number().min(1, { message: "Height is required" }),
  heightUnit: z.enum(["cm", "in"]),
  weight: z.coerce.number().min(1, { message: "Weight is required" }),
  weightUnit: z.enum(["kg", "lb"]),
  
  // Step 3: Lifestyle
  goodSleepQuality: z.enum(["yes", "no"]),
  exerciseMinutes: z.coerce.number().min(0).max(300),
  smokingStatus: z.enum(["never", "former", "current"]),
  alcoholUnits: z.coerce.number().min(0),
  
  // Step 4: Health Status
  chronicConditions: z.array(z.string()).optional(),
  hba1c: z.coerce.number().min(0).optional(),
  heartRate: z.coerce.number().min(0).optional(),
  systolicBP: z.coerce.number().min(0).optional(),
  diastolicBP: z.coerce.number().min(0).optional(),
});

export type FitnessFormValues = z.infer<typeof formSchema>;

interface FitnessCalculatorFormProps {
  onSubmit: (values: FitnessFormValues) => void;
}

const chronicConditionsList = [
  { id: "diabetes", label: "Diabetes" },
  { id: "hypertension", label: "Hypertension" },
  { id: "heart_disease", label: "Heart Disease" },
  { id: "asthma", label: "Asthma" },
  { id: "arthritis", label: "Arthritis" },
  { id: "cancer", label: "Cancer" },
  { id: "depression", label: "Depression" },
  { id: "thyroid", label: "Thyroid Disorder" },
];

export const FitnessCalculatorForm: React.FC<FitnessCalculatorFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  const form = useForm<FitnessFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      height: undefined,
      heightUnit: "cm",
      weight: undefined,
      weightUnit: "kg",
      goodSleepQuality: "yes",
      exerciseMinutes: 150,
      smokingStatus: "never",
      alcoholUnits: 0,
      chronicConditions: [],
      hba1c: undefined,
      heartRate: undefined,
      systolicBP: undefined,
      diastolicBP: undefined,
    },
  });

  const nextStep = async () => {
    const fieldsToValidate = {
      1: ["name", "email", "phone"],
      2: ["height", "weight"],
      3: ["goodSleepQuality", "smokingStatus", "alcoholUnits"],
    }[step] as Array<keyof FitnessFormValues>;
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(Math.max(1, step - 1));
  };

  const handleSubmit = (values: FitnessFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
        
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-medium">Basic Information</h3>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Enter your name" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input placeholder="your@email.com" type="email" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Enter your phone number" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        
        {/* Step 2: Body Metrics */}
        {step === 2 && (
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
        )}
        
        {/* Step 3: Lifestyle */}
        {step === 3 && (
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
          </div>
        )}
        
        {/* Step 4: Health Status */}
        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-medium">Health Status</h3>
            
            <FormField
              control={form.control}
              name="chronicConditions"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Chronic Conditions</FormLabel>
                    <div className="text-sm text-muted-foreground mb-2">
                      Select all that apply
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {chronicConditionsList.map((condition) => (
                      <FormField
                        key={condition.id}
                        control={form.control}
                        name="chronicConditions"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={condition.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(condition.id)}
                                  onCheckedChange={(checked) => {
                                    const updatedList = checked
                                      ? [...(field.value || []), condition.id]
                                      : (field.value || []).filter(
                                          (value) => value !== condition.id
                                        );
                                    field.onChange(updatedList);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {condition.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
              <h4 className="text-md font-medium mb-4 flex items-center">
                Optional Health Metrics
                <span className="text-xs text-muted-foreground ml-2">(If known)</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between pt-2">
          {step > 1 && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          )}
          
          {step < totalSteps ? (
            <Button 
              type="button" 
              onClick={nextStep}
              className="ml-auto flex items-center"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              className="ml-auto"
            >
              Calculate Score
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default FitnessCalculatorForm;
