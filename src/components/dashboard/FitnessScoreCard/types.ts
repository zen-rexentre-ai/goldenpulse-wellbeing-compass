
export interface FitnessScore {
  current: number;
  week: {
    score: number;
    change: number;
    direction: string;
  };
  month: {
    score: number;
    change: number;
    direction: string;
  };
  sinceLogin: {
    score: number;
    change: number;
    direction: string;
  };
}

export interface FitnessScoreCardProps {
  fitnessScores: FitnessScore;
  onViewDetailedAnalysis: () => void;
}
