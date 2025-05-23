
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Trophy, Target, Clock } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const TriviaGame: React.FC = () => {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);

  // Sample questions for seniors
  const questions: Question[] = [
    {
      id: 1,
      category: 'History',
      question: 'Who was the first Prime Minister of India?',
      options: ['Jawaharlal Nehru', 'Mahatma Gandhi', 'Sardar Patel', 'Dr. Rajendra Prasad'],
      correctIndex: 0,
      difficulty: 'easy'
    },
    {
      id: 2,
      category: 'Geography',
      question: 'Which is the longest river in India?',
      options: ['Yamuna', 'Ganges', 'Godavari', 'Krishna'],
      correctIndex: 1,
      difficulty: 'easy'
    },
    {
      id: 3,
      category: 'Culture',
      question: 'Which festival is known as the Festival of Lights?',
      options: ['Holi', 'Diwali', 'Dussehra', 'Eid'],
      correctIndex: 1,
      difficulty: 'easy'
    },
    {
      id: 4,
      category: 'Science',
      question: 'What is the largest planet in our solar system?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctIndex: 2,
      difficulty: 'medium'
    },
    {
      id: 5,
      category: 'Literature',
      question: 'Who wrote the famous novel "Gitanjali"?',
      options: ['Rabindranath Tagore', 'R.K. Narayan', 'Premchand', 'Sarojini Naidu'],
      correctIndex: 0,
      difficulty: 'medium'
    }
  ];

  // Timer effect
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1); // Time's up
    }
  }, [timeLeft, gameStarted, showResult]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correctIndex;
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setTimeLeft(30);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
  };

  const getScorePercentage = () => Math.round((score / questions.length) * 100);

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="text-center">
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="h-8 w-8 text-blue-500" />
              <CardTitle className="text-2xl">{t('trivia_game')}</CardTitle>
              <ScreenReader text={t('trivia_game')} />
            </div>
            <p className="text-muted-foreground">{t('trivia_description')}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2 p-3 bg-muted rounded-lg">
                  <Target className="h-5 w-5 text-green-500" />
                  <span>{questions.length} Questions</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 bg-muted rounded-lg">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span>30 seconds each</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 bg-muted rounded-lg">
                  <Trophy className="h-5 w-5 text-purple-500" />
                  <span>Score points</span>
                </div>
              </div>
              <Button onClick={startGame} className="w-full text-lg py-6">
                {t('play_now')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="text-center">
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <CardTitle className="text-2xl">Game Complete!</CardTitle>
              <ScreenReader text="Game Complete!" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-4xl font-bold text-blue-600">
                {score}/{questions.length}
              </div>
              <div className="text-lg text-muted-foreground">
                {getScorePercentage()}% Correct
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-semibold">{score}</div>
                  <div className="text-sm text-muted-foreground">Correct Answers</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-semibold">{Math.max(...Array.from({length: currentQuestion + 1}, (_, i) => i <= currentQuestion ? (i === 0 ? (questions[0] && selectedAnswer === questions[0].correctIndex ? 1 : 0) : 0) : 0))}</div>
                  <div className="text-sm text-muted-foreground">Best Streak</div>
                </div>
              </div>

              <div className="space-y-2">
                <Button onClick={startGame} className="w-full">
                  Play Again
                </Button>
                <Button onClick={resetGame} variant="outline" className="w-full">
                  Back to Menu
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header with Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <Badge variant="outline">{question.category}</Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{score}</div>
          <div className="text-sm text-muted-foreground">Score</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{streak}</div>
          <div className="text-sm text-muted-foreground">Streak</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{timeLeft}</div>
          <div className="text-sm text-muted-foreground">Time</div>
        </Card>
      </div>

      {/* Question */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
            <ScreenReader text={question.question} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  selectedAnswer === null 
                    ? "outline" 
                    : selectedAnswer === index
                      ? index === question.correctIndex 
                        ? "default" 
                        : "destructive"
                      : index === question.correctIndex
                        ? "default"
                        : "outline"
                }
                className="h-auto p-4 text-left justify-start whitespace-normal"
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                aria-label={`Option ${index + 1}: ${option}`}
              >
                <span className="mr-2 font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TriviaGame;
