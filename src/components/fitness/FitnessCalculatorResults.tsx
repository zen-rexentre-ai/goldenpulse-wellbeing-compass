
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, BarChart2, Loader2, Check } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';
import FitnessScoreMeter from '@/components/dashboard/FitnessScoreCard/FitnessScoreMeter';

interface Recommendation {
  text: string;
  impact: string;
  priority: string;
}

interface FitnessCalculatorResultsProps {
  score: number;
  recommendations: Recommendation[];
  normalizedValues: { [key: string]: number };
  onSave: () => void;
  onReset: () => void;
  isSaving?: boolean;
  isAutoSaved?: boolean;
}

const getScoreCategory = (score: number) => {
  if (score > 85) return { label: "Excellent", color: "bg-green-900" }; // Dark Green
  if (score >= 70) return { label: "Very Good", color: "bg-green-500" }; // Green
  if (score >= 60) return { label: "Good", color: "bg-green-400" }; // Light Green
  if (score >= 50) return { label: "Satisfactory", color: "bg-yellow-500" }; // Yellow
  if (score >= 30) return { label: "Unsatisfactory", color: "bg-orange-500" }; // Orange
  return { label: "Poor", color: "bg-red-500" }; // Red
};

const FitnessCalculatorResults: React.FC<FitnessCalculatorResultsProps> = ({
  score,
  recommendations,
  normalizedValues,
  onSave,
  onReset,
  isSaving = false,
  isAutoSaved = false
}) => {
  const { theme } = useTheme();
  const scoreCategory = getScoreCategory(score);
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-2xl font-bold mb-2">{t("health_score")}</h2>      
        </div>
        
        {/* Use the gauge meter for score display */}
        <div className="flex justify-center mb-4">
          <div className="w-80">
            <FitnessScoreMeter score={score} />
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-center gap-2">
          <Badge className={`${scoreCategory.color} text-white`}>{scoreCategory.label}</Badge>
          {isAutoSaved && (
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <Check className="w-3 h-3 mr-1" />
              Auto-saved
            </Badge>
          )}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{t("recommendations")}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.length === 0 ? (
            <div className="text-center py-4">
              <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-2" />
              <p>Great job! Keep maintaining your healthy lifestyle.</p>
            </div>
          ) : (
            recommendations.map((rec, i) => (
              <div key={i} className="flex gap-3 items-start pb-3 border-b border-gray-200 dark:border-gray-800 last:border-0">
                <Badge
                  variant="outline"
                  className={
                    rec.priority === 'high' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : rec.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }
                >
                  {rec.impact}
                </Badge>
                <span>{rec.text}</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{t("detailed_score_breakdown")}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(normalizedValues || {}).map(([key, value]) => (
              <div key={key} className="space-y-1">
                {value !== undefined && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="capitalize text-sm">
                        {key === 'bmi' ? 'BMI' : key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-medium">
                        {Math.round((value || 0) * 100)}%
                      </span>
                    </div>
                    <Progress value={(value || 0) * 100} className="h-2" />
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 border-t pt-4">
          {!isAutoSaved ? (
            <Button 
              className="w-full sm:w-auto" 
              onClick={onSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  {t("save_report")}
                </>
              )}
            </Button>
          ) : (
            <Button 
              variant="outline"
              className="w-full sm:w-auto" 
              disabled
            >
              <Check className="mr-2 h-4 w-4" />
              Data Saved
            </Button>
          )}
          <Button variant="outline" className="w-full sm:w-auto" onClick={onReset}>
            <BarChart2 className="mr-2 h-4 w-4" /> {t("calculate_again")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FitnessCalculatorResults;
