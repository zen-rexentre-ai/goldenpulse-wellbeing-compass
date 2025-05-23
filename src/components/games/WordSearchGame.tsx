
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Search, Trophy, Target, Clock, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

interface WordSearchProps {}

interface GameWord {
  word: string;
  found: boolean;
  positions: { row: number; col: number }[];
}

interface GameState {
  grid: string[][];
  words: GameWord[];
  foundWords: string[];
  score: number;
  timeLeft: number;
  difficulty: 'easy' | 'medium' | 'hard';
  hintsUsed: number;
  selectedCells: { row: number; col: number }[];
  isSelecting: boolean;
}

const WordSearchGame: React.FC<WordSearchProps> = () => {
  const { t } = useLanguage();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const wordLists = {
    easy: ['HEALTH', 'PEACE', 'LOVE', 'HOPE', 'JOY'],
    medium: ['WISDOM', 'GARDEN', 'FAMILY', 'FRIEND', 'HAPPY', 'SMILE', 'HEART', 'LIGHT'],
    hard: ['STRENGTH', 'COURAGE', 'PATIENCE', 'KINDNESS', 'GRATITUDE', 'PEACEFUL', 'BEAUTIFUL', 'WONDERFUL', 'HARMONY', 'BLESSING', 'MEMORIES', 'TREASURE']
  };

  const createGrid = useCallback((words: string[], size: number = 15) => {
    const grid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
    const placedWords: GameWord[] = [];

    // Place words in grid
    words.forEach(word => {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 100) {
        const direction = Math.floor(Math.random() * 8); // 8 directions
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        
        if (canPlaceWord(grid, word, row, col, direction, size)) {
          const positions = placeWord(grid, word, row, col, direction);
          placedWords.push({ word, found: false, positions });
          placed = true;
        }
        attempts++;
      }
    });

    // Fill empty cells with random letters
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (grid[i][j] === '') {
          grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    return { grid, words: placedWords };
  }, []);

  const canPlaceWord = (grid: string[][], word: string, row: number, col: number, direction: number, size: number): boolean => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    
    const [dRow, dCol] = directions[direction];
    
    for (let i = 0; i < word.length; i++) {
      const newRow = row + (dRow * i);
      const newCol = col + (dCol * i);
      
      if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size) {
        return false;
      }
      
      if (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i]) {
        return false;
      }
    }
    
    return true;
  };

  const placeWord = (grid: string[][], word: string, row: number, col: number, direction: number) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    
    const [dRow, dCol] = directions[direction];
    const positions: { row: number; col: number }[] = [];
    
    for (let i = 0; i < word.length; i++) {
      const newRow = row + (dRow * i);
      const newCol = col + (dCol * i);
      grid[newRow][newCol] = word[i];
      positions.push({ row: newRow, col: newCol });
    }
    
    return positions;
  };

  const startGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    const words = wordLists[difficulty];
    const { grid, words: gameWords } = createGrid(words);
    
    setGameState({
      grid,
      words: gameWords,
      foundWords: [],
      score: 0,
      timeLeft: difficulty === 'easy' ? 300 : difficulty === 'medium' ? 240 : 180, // 5, 4, 3 minutes
      difficulty,
      hintsUsed: 0,
      selectedCells: [],
      isSelecting: false
    });
    setGameStarted(true);
    setGameComplete(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameComplete(false);
    setGameState(null);
  };

  // Timer effect
  useEffect(() => {
    if (gameState && gameStarted && !gameComplete && gameState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameState(prev => prev ? { ...prev, timeLeft: prev.timeLeft - 1 } : null);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState?.timeLeft === 0) {
      setGameComplete(true);
    }
  }, [gameState?.timeLeft, gameStarted, gameComplete]);

  const handleCellClick = (row: number, col: number) => {
    if (!gameState || gameComplete) return;

    setGameState(prev => {
      if (!prev) return null;
      
      const newSelectedCells = [...prev.selectedCells];
      const cellIndex = newSelectedCells.findIndex(cell => cell.row === row && cell.col === col);
      
      if (cellIndex > -1) {
        newSelectedCells.splice(cellIndex, 1);
      } else {
        newSelectedCells.push({ row, col });
      }
      
      // Check if selected cells form a word
      const selectedWord = getSelectedWord(prev.grid, newSelectedCells);
      if (selectedWord && prev.words.find(w => w.word === selectedWord && !w.found)) {
        const updatedWords = prev.words.map(w => 
          w.word === selectedWord ? { ...w, found: true } : w
        );
        const newFoundWords = [...prev.foundWords, selectedWord];
        const newScore = prev.score + selectedWord.length * 10;
        
        // Check if all words found
        if (updatedWords.every(w => w.found)) {
          setGameComplete(true);
        }
        
        return {
          ...prev,
          words: updatedWords,
          foundWords: newFoundWords,
          score: newScore,
          selectedCells: []
        };
      }
      
      return { ...prev, selectedCells: newSelectedCells };
    });
  };

  const getSelectedWord = (grid: string[][], selectedCells: { row: number; col: number }[]): string | null => {
    if (selectedCells.length < 2) return null;
    
    // Sort cells to form a line
    selectedCells.sort((a, b) => a.row === b.row ? a.col - b.col : a.row - b.row);
    
    // Check if cells form a straight line
    if (!isValidWordSelection(selectedCells)) return null;
    
    return selectedCells.map(cell => grid[cell.row][cell.col]).join('');
  };

  const isValidWordSelection = (cells: { row: number; col: number }[]): boolean => {
    if (cells.length < 2) return false;
    
    const dRow = cells[1].row - cells[0].row;
    const dCol = cells[1].col - cells[0].col;
    
    for (let i = 2; i < cells.length; i++) {
      const expectedRow = cells[0].row + (dRow * i);
      const expectedCol = cells[0].col + (dCol * i);
      
      if (cells[i].row !== expectedRow || cells[i].col !== expectedCol) {
        return false;
      }
    }
    
    return true;
  };

  const useHint = () => {
    if (!gameState || gameState.hintsUsed >= 3) return;
    
    const unFoundWords = gameState.words.filter(w => !w.found);
    if (unFoundWords.length === 0) return;
    
    const randomWord = unFoundWords[Math.floor(Math.random() * unFoundWords.length)];
    const firstPosition = randomWord.positions[0];
    
    setGameState(prev => prev ? {
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
      selectedCells: [firstPosition]
    } : null);
  };

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card className="text-center">
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Search className="h-8 w-8 text-purple-500" />
              <CardTitle className="text-2xl">Word Search</CardTitle>
              <ScreenReader text="Word Search Game" />
            </div>
            <p className="text-muted-foreground">Find hidden words in the letter grid</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={() => startGame('easy')} className="p-6 h-auto flex-col bg-green-500 hover:bg-green-600">
                  <Target className="h-6 w-6 mb-2" />
                  <span className="text-lg font-semibold">Easy</span>
                  <span className="text-sm">5 words, 5 minutes</span>
                </Button>
                <Button onClick={() => startGame('medium')} className="p-6 h-auto flex-col bg-orange-500 hover:bg-orange-600">
                  <Clock className="h-6 w-6 mb-2" />
                  <span className="text-lg font-semibold">Medium</span>
                  <span className="text-sm">8 words, 4 minutes</span>
                </Button>
                <Button onClick={() => startGame('hard')} className="p-6 h-auto flex-col bg-red-500 hover:bg-red-600">
                  <Trophy className="h-6 w-6 mb-2" />
                  <span className="text-lg font-semibold">Hard</span>
                  <span className="text-sm">12 words, 3 minutes</span>
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>How to play:</strong></p>
                <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-1">
                  <li>Click letters to select them</li>
                  <li>Words can be horizontal, vertical, or diagonal</li>
                  <li>Find all words to complete the game</li>
                  <li>Use hints if you get stuck (3 available)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameComplete) {
    const allWordsFound = gameState?.words.every(w => w.found) || false;
    
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="text-center">
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className={`h-8 w-8 ${allWordsFound ? 'text-yellow-500' : 'text-gray-400'}`} />
              <CardTitle className="text-2xl">
                {allWordsFound ? 'Congratulations!' : 'Time\'s Up!'}
              </CardTitle>
              <ScreenReader text={allWordsFound ? 'Congratulations!' : 'Time\'s Up!'} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-4xl font-bold text-purple-600">
                {gameState?.score || 0} points
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-semibold">{gameState?.foundWords.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Words Found</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-semibold">{gameState?.hintsUsed || 0}</div>
                  <div className="text-sm text-muted-foreground">Hints Used</div>
                </div>
              </div>

              <div className="space-y-2">
                <Button onClick={() => startGame(gameState?.difficulty || 'easy')} className="w-full">
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

  if (!gameState) return null;

  const progress = (gameState.foundWords.length / gameState.words.length) * 100;
  const minutes = Math.floor(gameState.timeLeft / 60);
  const seconds = gameState.timeLeft % 60;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="text-lg px-3 py-1">
            {gameState.difficulty.toUpperCase()}
          </Badge>
          <div className="text-right">
            <div className="text-2xl font-bold">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
            <div className="text-sm text-muted-foreground">Time Left</div>
          </div>
        </div>
        <Progress value={progress} className="h-3" />
        <div className="text-sm text-muted-foreground mt-1">
          {gameState.foundWords.length} of {gameState.words.length} words found
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Game Grid */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-15 gap-1 max-w-fit mx-auto">
                {gameState.grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const isSelected = gameState.selectedCells.some(
                      selected => selected.row === rowIndex && selected.col === colIndex
                    );
                    const isFoundWord = gameState.words.some(word => 
                      word.found && word.positions.some(pos => pos.row === rowIndex && pos.col === colIndex)
                    );
                    
                    return (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        className={`
                          w-8 h-8 text-sm font-bold border border-gray-300 rounded
                          ${isSelected ? 'bg-blue-200 border-blue-400' : ''}
                          ${isFoundWord ? 'bg-green-200 border-green-400' : ''}
                          ${!isSelected && !isFoundWord ? 'bg-white hover:bg-gray-100' : ''}
                          transition-colors duration-200
                        `}
                        aria-label={`Letter ${cell} at row ${rowIndex + 1}, column ${colIndex + 1}`}
                      >
                        {cell}
                      </button>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Score */}
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{gameState.score}</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </CardContent>
          </Card>

          {/* Words List */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Words to Find</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                {gameState.words.map((wordObj, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-sm font-medium ${
                      wordObj.found 
                        ? 'bg-green-100 text-green-800 line-through' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {wordObj.word}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hint Button */}
          <Button
            onClick={useHint}
            disabled={gameState.hintsUsed >= 3}
            className="w-full"
            variant="outline"
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            Hint ({3 - gameState.hintsUsed} left)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WordSearchGame;
