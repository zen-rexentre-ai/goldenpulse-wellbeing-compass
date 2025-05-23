import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Activity, Heart, Brain, Clock, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DetailedAnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DetailedAnalysisDialog: React.FC<DetailedAnalysisDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  // Mock data for the analysis cards
  const analysisData = {
    wellnessGoals: {
      title: "Wellness Goals",
      icon: Target,
      metrics: [
        { name: "Weight management", status: "On track", progress: "75%" },
        { name: "Stress reduction", status: "Needs attention", progress: "42%" },
        { name: "Better sleep", status: "On track", progress: "80%" }
      ],
      action: "Focus on meditation for 10 minutes before bedtime to improve stress levels"
    },
    physicalActivity: {
      title: "Physical Activity",
      icon: Activity,
      metrics: [
        { name: "Daily steps", value: "8,205", target: "10,000" },
        { name: "Weekly exercise", value: "2.5 hrs", target: "3.5 hrs" },
        { name: "Active days", value: "4 days", target: "5 days" }
      ],
      action: "Try to add a 15-minute walk after lunch to increase your daily step count"
    },
    cognitiveFunction: {
      title: "Cognitive Function",
      icon: Brain,
      metrics: [
        { name: "Memory games score", value: "620", status: "Excellent" },
        { name: "Puzzle completion", value: "8/10", status: "Good" },
        { name: "Reaction time", value: "0.42s", status: "Above average" }
      ],
      action: "Challenge yourself with the advanced puzzles section to further improve cognitive abilities"
    },
    heartHealth: {
      title: "Heart Health",
      icon: Heart,
      metrics: [
        { name: "Resting heart rate", value: "68 bpm", status: "Normal" },
        { name: "Blood pressure", value: "125/82", status: "Borderline" },
        { name: "Cholesterol", value: "195 mg/dL", status: "Good" }
      ],
      action: "Consider reducing sodium intake to help lower your blood pressure"
    },
    sleepHealth: {
      title: "Sleep Health",
      icon: Clock,
      metrics: [
        { name: "Average duration", value: "7.2 hrs", target: "8 hrs" },
        { name: "Sleep quality", value: "76%", status: "Good" },
        { name: "Sleep consistency", value: "82%", status: "Excellent" }
      ],
      action: "Try to go to bed 30 minutes earlier to reach your optimal sleep duration"
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Detailed Health Analysis</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <p className="text-muted-foreground">
            This analysis is based on your activity data, health metrics, and wellness goals.
            Review the recommendations and take action to improve your overall health score.
          </p>
          
          {/* Wellness Goals */}
          <Card className="border-l-4 border-l-golden-yellow">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="bg-golden-yellow/20 p-2 rounded-full">
                <analysisData.wellnessGoals.icon className="text-golden-yellow h-5 w-5" />
              </div>
              <CardTitle>{analysisData.wellnessGoals.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisData.wellnessGoals.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{metric.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={metric.status === "On track" ? "secondary" : "outline"} 
                             className={metric.status === "On track" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                        {metric.status}
                      </Badge>
                      <span className="font-semibold">{metric.progress}</span>
                    </div>
                  </div>
                ))}
                <div className="mt-4 pt-2 border-t">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">Action: {analysisData.wellnessGoals.action}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Physical Activity */}
          <Card className="border-l-4 border-l-golden-orange">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="bg-golden-orange/20 p-2 rounded-full">
                <analysisData.physicalActivity.icon className="text-golden-orange h-5 w-5" />
              </div>
              <CardTitle>{analysisData.physicalActivity.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisData.physicalActivity.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{metric.name}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{metric.value}</span>
                      <span className="text-muted-foreground text-xs">/ {metric.target}</span>
                    </div>
                  </div>
                ))}
                <div className="mt-4 pt-2 border-t">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">Action: {analysisData.physicalActivity.action}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Cognitive Function */}
          <Card className="border-l-4 border-l-golden-purple">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="bg-golden-purple/20 p-2 rounded-full">
                <analysisData.cognitiveFunction.icon className="text-golden-purple h-5 w-5" />
              </div>
              <CardTitle>{analysisData.cognitiveFunction.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisData.cognitiveFunction.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{metric.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{metric.value}</span>
                      <Badge variant="outline" 
                             className="bg-blue-100 text-blue-800 border-blue-200">
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <div className="mt-4 pt-2 border-t">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">Action: {analysisData.cognitiveFunction.action}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Heart Health */}
          <Card className="border-l-4 border-l-red-400">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="bg-red-100 p-2 rounded-full">
                <analysisData.heartHealth.icon className="text-red-500 h-5 w-5" />
              </div>
              <CardTitle>{analysisData.heartHealth.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisData.heartHealth.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{metric.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{metric.value}</span>
                      <Badge variant="outline" 
                             className={metric.status === "Normal" || metric.status === "Good" 
                                      ? "bg-green-100 text-green-800" 
                                      : "bg-amber-100 text-amber-800"}>
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <div className="mt-4 pt-2 border-t">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">Action: {analysisData.heartHealth.action}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Sleep Health */}
          <Card className="border-l-4 border-l-indigo-400">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="bg-indigo-100 p-2 rounded-full">
                <analysisData.sleepHealth.icon className="text-indigo-500 h-5 w-5" />
              </div>
              <CardTitle>{analysisData.sleepHealth.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisData.sleepHealth.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{metric.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{metric.value}</span>
                      {metric.status && (
                        <Badge variant="outline" 
                               className="bg-green-100 text-green-800 border-green-200">
                          {metric.status}
                        </Badge>
                      )}
                      {metric.target && (
                        <span className="text-muted-foreground text-xs">/ {metric.target}</span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="mt-4 pt-2 border-t">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">Action: {analysisData.sleepHealth.action}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button>Close Analysis</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
