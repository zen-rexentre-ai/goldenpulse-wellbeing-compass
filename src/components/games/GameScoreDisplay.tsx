
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageProvider';
import { GameScore } from '@/services/gameScoreService';
import { Trophy, Target, Clock, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GameScoreDisplayProps {
  gameScore: GameScore;
  onPlayAgain: () => void;
  onClose: () => void;
}

const GameScoreDisplay: React.FC<GameScoreDisplayProps> = ({ 
  gameScore, 
  onPlayAgain, 
  onClose 
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  React.useEffect(() => {
    // Show notification about wellness score update
    toast({
      title: t("game_score_updated"),
      description: t("wellness_score_impact"),
      duration: 3000,
    });
  }, []);

  const formatTime = (milliseconds: number) => {
    return `${(milliseconds / 1000).toFixed(1)}s`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 75) return 'text-blue-600';
    if (accuracy >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          {t("game_completed")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">{t("performance_analysis")}</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="h-4 w-4" />
              <span className="text-sm font-medium">{t("your_score")}</span>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(gameScore.score)}`}>
              {Math.round(gameScore.score)}
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">{t("accuracy")}</span>
            </div>
            <div className={`text-2xl font-bold ${getAccuracyColor(gameScore.accuracy)}`}>
              {Math.round(gameScore.accuracy)}%
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{t("reaction_time")}</span>
            </div>
            <div className="text-xl font-bold text-blue-600">
              {formatTime(gameScore.reactionTime)}
            </div>
          </div>
          
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">{t("improvement")}</span>
            </div>
            <div className="text-xl font-bold text-green-600">
              +{Math.round(gameScore.score * 0.1)}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {t("cognitive_improvement")}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            {t("keep_playing")}
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={onPlayAgain} className="flex-1">
            {t("play_now")}
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1">
            {t("back")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameScoreDisplay;
