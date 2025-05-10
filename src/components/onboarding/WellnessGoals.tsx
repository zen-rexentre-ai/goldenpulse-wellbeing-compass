
import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const wellnessGoalOptions = [
  {
    id: "improve-physical-health",
    label: "Improve Physical Health",
    description: "Regular exercise, better mobility, strength, and balance"
  },
  {
    id: "better-sleep",
    label: "Better Sleep Quality",
    description: "Establish healthy sleep patterns and routines"
  },
  {
    id: "mental-wellbeing",
    label: "Enhance Mental Wellbeing",
    description: "Reduce stress, manage anxiety, improve overall mood"
  },
  {
    id: "healthy-diet",
    label: "Maintain a Healthy Diet",
    description: "Better nutrition, meal planning, and dietary habits"
  },
  {
    id: "social-connections",
    label: "Strengthen Social Connections",
    description: "Build meaningful relationships, reduce isolation"
  },
  {
    id: "cognitive-health",
    label: "Boost Cognitive Health",
    description: "Memory improvement, brain exercises, lifelong learning"
  },
  {
    id: "manage-conditions",
    label: "Better Manage Chronic Conditions",
    description: "Track symptoms, medication, and self-care effectively"
  },
  {
    id: "independence",
    label: "Maintain Independence",
    description: "Skills to safely live independently and confidently"
  }
];

const WellnessGoals: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Choose Your Wellness Goals</h2>
        <p className="text-muted-foreground mb-4">
          Select the wellness areas that matter most to you. You can choose multiple goals.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {wellnessGoalOptions.map((goal) => (
            <Card key={goal.id} className="p-4 border cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-start space-x-3">
                <Checkbox id={goal.id} className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor={goal.id} className="font-medium cursor-pointer">
                    {goal.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Any other wellness goals?</h3>
        <Textarea 
          placeholder="Tell us about any other wellness goals you have..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default WellnessGoals;
