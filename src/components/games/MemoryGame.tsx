
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layers, Trophy, Clock, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

interface GameCard {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC = () => {
  const { t } = useLanguage();
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const cardValues = {
    easy: ['🌸', '🌺', '🌻', '🌷', '🌹', '🏵️'],
    medium: ['🌸', '🌺', '🌻', '🌷', '🌹', '🏵️', '🌼', '🌾'],
    hard: ['🌸', '🌺', '🌻', '🌷', '🌹', '🏵️', '🌼', '🌾', '🍀', '🌿']
  };

  const gridCols = {
    easy: 'grid-cols-3',
    medium: 'grid-cols-4',
    hard: 'grid-cols-5'
  };

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameComplete) {
      const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameComplete]);

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);

      if (firstCard?.value === secondCard?.value) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(prev => prev + 1);
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  // Check win condition
  useEffect(() => {
    const totalPairs = cardValues[difficulty].length;
    if (matches === totalPairs && gameStarted) {
      setGameComplete(true);
    }
  }, [matches, difficulty, gameStarted]);

  const initializeGame = (selectedDifficulty: 'easy' | 'medium' | 'hard') => {
    const values = cardValues[selectedDifficulty];
    const cardPairs = [...values, ...values];
    
    // Shuffle cards
    const shuffled = cardPairs
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
    setMoves(0);
    setMatches(0);
    setTimer(0);
    setGameComplete(false);
    setFlippedCards([]);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (card?.isFlipped || card?.isMatched) return;

    setCards(prev => prev.map(card => 
      card.id === cardId 
        ? { ...card, isFlipped: true }
        : card
    ));
    
    setFlippedCards(prev => [...prev, cardId]);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameComplete(false);
    setCards([]);
    setMoves(0);
    setMatches(0);
    setTimer(0);
    setFlippedCards([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="text-center">
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Layers className="h-8 w-8 text-green-500" />
              <CardTitle className="text-2xl">{t('memory_game')}</CardTitle>
              <ScreenReader text={t('memory_game')} />
            </div>
            <p className="text-muted-foreground">{t('memory_description')}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Choose Difficulty</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col gap-2"
                    onClick={() => initializeGame('easy')}
                  >
                    <span className="font-semibold">Easy</span>
                    <span className="text-sm text-muted-foreground">3x4 Grid</span>
                    <span className="text-sm text-muted-foreground">6 Pairs</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col gap-2"
                    onClick={() => initializeGame('medium')}
                  >
                    <span className="font-semibold">Medium</span>
                    <span className="text-sm text-muted-foreground">4x4 Grid</span>
                    <span className="text-sm text-muted-foreground">8 Pairs</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col gap-2"
                    onClick={() => initializeGame('hard')}
                  >
                    <span className="font-semibold">Hard</span>
                    <span className="text-sm text-muted-foreground">4x5 Grid</span>
                    <span className="text-sm text-muted-foreground">10 Pairs</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="text-center">
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <CardTitle className="text-2xl">Congratulations!</CardTitle>
              <ScreenReader text="Congratulations! Game Complete!" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-lg text-muted-foreground">
                Memory Challenge Complete!
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-semibold">{formatTime(timer)}</div>
                  <div className="text-sm text-muted-foreground">Time</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-semibold">{moves}</div>
                  <div className="text-sm text-muted-foreground">Moves</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-semibold">{matches}</div>
                  <div className="text-sm text-muted-foreground">Pairs</div>
                </div>
              </div>

              <div className="space-y-2">
                <Button onClick={() => initializeGame(difficulty)} className="w-full">
                  Play Again
                </Button>
                <Button onClick={resetGame} variant="outline" className="w-full">
                  Change Difficulty
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Game Stats */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <Badge variant="outline" className="text-sm">
            <Clock className="h-4 w-4 mr-1" />
            {formatTime(timer)}
          </Badge>
          <Badge variant="outline" className="text-sm">
            Moves: {moves}
          </Badge>
          <Badge variant="outline" className="text-sm">
            Pairs: {matches}/{cardValues[difficulty].length}
          </Badge>
        </div>
        <Button onClick={resetGame} variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      {/* Game Grid */}
      <div className={`grid ${gridCols[difficulty]} gap-3 max-w-md mx-auto`}>
        {cards.map((card) => (
          <Button
            key={card.id}
            variant="outline"
            className={`aspect-square text-4xl h-24 transition-all duration-300 ${
              card.isFlipped || card.isMatched 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            } ${card.isMatched ? 'opacity-60' : ''}`}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isMatched}
            aria-label={
              card.isFlipped || card.isMatched 
                ? `Card showing ${card.value}` 
                : `Hidden card ${card.id + 1}`
            }
          >
            {card.isFlipped || card.isMatched ? card.value : '?'}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
