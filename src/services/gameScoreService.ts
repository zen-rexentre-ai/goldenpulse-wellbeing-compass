
/**
 * Game Score Service
 * Manages game scoring, progress tracking, and wellness score integration
 */

export interface GameScore {
  gameId: string;
  score: number;
  accuracy: number;
  reactionTime: number;
  completedAt: Date;
  sessionDuration: number;
}

export interface GameStats {
  totalGamesPlayed: number;
  averageScore: number;
  averageAccuracy: number;
  averageReactionTime: number;
  improvement: number;
  cognitiveScore: number;
}

class GameScoreService {
  private scores: GameScore[] = [];
  private storageKey = 'gameScores';

  constructor() {
    this.loadScores();
  }

  private loadScores(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.scores = JSON.parse(stored).map((score: any) => ({
        ...score,
        completedAt: new Date(score.completedAt)
      }));
    }
  }

  private saveScores(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.scores));
  }

  addScore(gameScore: GameScore): void {
    this.scores.push(gameScore);
    this.saveScores();
  }

  getGameStats(gameId?: string): GameStats {
    const relevantScores = gameId 
      ? this.scores.filter(score => score.gameId === gameId)
      : this.scores;

    if (relevantScores.length === 0) {
      return {
        totalGamesPlayed: 0,
        averageScore: 0,
        averageAccuracy: 0,
        averageReactionTime: 0,
        improvement: 0,
        cognitiveScore: 0
      };
    }

    const totalGamesPlayed = relevantScores.length;
    const averageScore = relevantScores.reduce((sum, score) => sum + score.score, 0) / totalGamesPlayed;
    const averageAccuracy = relevantScores.reduce((sum, score) => sum + score.accuracy, 0) / totalGamesPlayed;
    const averageReactionTime = relevantScores.reduce((sum, score) => sum + score.reactionTime, 0) / totalGamesPlayed;

    // Calculate improvement (comparison with first 5 games vs last 5 games)
    let improvement = 0;
    if (totalGamesPlayed >= 10) {
      const firstFive = relevantScores.slice(0, 5);
      const lastFive = relevantScores.slice(-5);
      const firstAvg = firstFive.reduce((sum, score) => sum + score.score, 0) / 5;
      const lastAvg = lastFive.reduce((sum, score) => sum + score.score, 0) / 5;
      improvement = ((lastAvg - firstAvg) / firstAvg) * 100;
    }

    // Calculate cognitive score (weighted combination of metrics)
    const cognitiveScore = Math.min(100, Math.round(
      (averageAccuracy * 0.4 + (averageScore / 100) * 0.3 + (1 / averageReactionTime) * 1000 * 0.3)
    ));

    return {
      totalGamesPlayed,
      averageScore,
      averageAccuracy,
      averageReactionTime,
      improvement,
      cognitiveScore
    };
  }

  getRecentScores(gameId?: string, limit: number = 10): GameScore[] {
    const relevantScores = gameId 
      ? this.scores.filter(score => score.gameId === gameId)
      : this.scores;
    
    return relevantScores
      .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
      .slice(0, limit);
  }

  getCognitiveContribution(): number {
    const stats = this.getGameStats();
    return Math.min(15, stats.cognitiveScore * 0.15); // Max 15 points contribution to wellness score
  }
}

export const gameScoreService = new GameScoreService();
