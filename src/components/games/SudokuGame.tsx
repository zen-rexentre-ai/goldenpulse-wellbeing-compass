
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Grid3x3, Trophy, Target, Clock, Lightbulb, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

interface SudokuGameProps {}

interface GameState {
  grid: number[][];
  solution: number[][];
  originalGrid: number[][];
  selectedCell: { row: number; col: number } | null;
  errors: { row: number; col: number }[];
  difficulty: 'easy' | 'medium' | 'hard';
  timeElapsed: number;
  hintsUsed: number;
  notesMode: boolean;
  notes: number[][][]; // [row][col][possible numbers]
}

const SudokuGame: React.FC<SudokuGameProps> = () => {
  const { t } = useLanguage();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Generate a complete valid Sudoku solution
  const generateCompleteSudoku = useCallback((): number[][] => {
    const grid = Array(9).fill(null).map(() => Array(9).fill(0));
    
    const isValid = (grid: number[][], row: number, col: number, num: number): boolean => {
      // Check row
      for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) return false;
      }
      
      // Check column
      for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) return false;
      }
      
      // Check 3x3 box
      const startRow = row - row % 3;
      const startCol = col - col % 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[i + startRow][j + startCol] === num) return false;
        }
      }
      
      return true;
    };

    const solve = (grid: number[][]): boolean => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === 0) {
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
            for (const num of numbers) {
              if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                if (solve(grid)) return true;
                grid[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    solve(grid);
    return grid;
  }, []);

  // Generate puzzle by removing numbers from complete solution
  const generatePuzzle = useCallback((solution: number[][], difficulty: 'easy' | 'medium' | 'hard'): number[][] => {
    const puzzle = solution.map(row => [...row]);
    const cellsToRemove = difficulty === 'easy' ? 41 : difficulty === 'medium' ? 51 : 56;
    
    let removed = 0;
    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        removed++;
      }
    }
    
    return puzzle;
  }, []);

  const startGame = (difficulty: 'easy' | 'medium' | 'hard') => {
    const solution = generateCompleteSudoku();
    const puzzle = generatePuzzle(solution, difficulty);
    
    setGameState({
      grid: puzzle.map(row => [...row]),
      solution,
      originalGrid: puzzle.map(row => [...row]),
      selectedCell: null,
      errors: [],
      difficulty,
      timeElapsed: 0,
      hintsUsed: 0,
      notesMode: false,
      notes: Array(9).fill(null).map(() => Array(9).fill(null).map(() => []))
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
    if (gameState && gameStarted && !gameComplete) {
      const timer = setInterval(() => {
        setGameState(prev => prev ? { ...prev, timeElapsed: prev.timeElapsed + 1 } : null);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, gameStarted, gameComplete]);

  const validateGrid = useCallback((grid: number[][]): { row: number; col: number }[] => {
    const errors: { row: number; col: number }[] = [];
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const num = grid[row][col];
        if (num === 0) continue;
        
        // Check duplicates in row
        for (let c = 0; c < 9; c++) {
          if (c !== col && grid[row][c] === num) {
            errors.push({ row, col });
            break;
          }
        }
        
        // Check duplicates in column
        for (let r = 0; r < 9; r++) {
          if (r !== row && grid[r][col] === num) {
            errors.push({ row, col });
            break;
          }
        }
        
        // Check duplicates in 3x3 box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let r = startRow; r < startRow + 3; r++) {
          for (let c = startCol; c < startCol + 3; c++) {
            if ((r !== row || c !== col) && grid[r][c] === num) {
              errors.push({ row, col });
              break;
            }
          }
        }
      }
    }
    
    return errors;
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (!gameState || gameComplete) return;
    
    // Don't allow editing original numbers
    if (gameState.originalGrid[row][col] !== 0) return;
    
    setGameState(prev => prev ? {
      ...prev,
      selectedCell: { row, col }
    } : null);
  };

  const handleNumberInput = (number: number) => {
    if (!gameState || !gameState.selectedCell || gameComplete) return;
    
    const { row, col } = gameState.selectedCell;
    
    // Don't allow editing original numbers
    if (gameState.originalGrid[row][col] !== 0) return;
    
    setGameState(prev => {
      if (!prev) return null;
      
      const newGrid = prev.grid.map(r => [...r]);
      newGrid[row][col] = newGrid[row][col] === number ? 0 : number;
      
      const errors = validateGrid(newGrid);
      
      // Check if puzzle is complete
      const isComplete = newGrid.every(row => row.every(cell => cell !== 0)) && errors.length === 0;
      if (isComplete) {
        setGameComplete(true);
      }
      
      return {
        ...prev,
        grid: newGrid,
        errors
      };
    });
  };

  const useHint = () => {
    if (!gameState || !gameState.selectedCell || gameState.hintsUsed >= 3) return;
    
    const { row, col } = gameState.selectedCell;
    const correctNumber = gameState.solution[row][col];
    
    setGameState(prev => {
      if (!prev) return null;
      
      const newGrid = prev.grid.map(r => [...r]);
      newGrid[row][col] = correctNumber;
      
      const errors = validateGrid(newGrid);
      
      return {
        ...prev,
        grid: newGrid,
        errors,
        hintsUsed: prev.hintsUsed + 1
      };
    });
  };

  const undoMove = () => {
    if (!gameState || !gameState.selectedCell) return;
    
    const { row, col } = gameState.selectedCell;
    
    setGameState(prev => {
      if (!prev) return null;
      
      const newGrid = prev.grid.map(r => [...r]);
      newGrid[row][col] = 0;
      
      const errors = validateGrid(newGrid);
      
      return {
        ...prev,
        grid: newGrid,
        errors
      };
    });
  };

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card className="text-center">
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Grid3x3 className="h-8 w-8 text-blue-500" />
              <CardTitle className="text-2xl">Sudoku</CardTitle>
              <ScreenReader text="Sudoku Game" />
            </div>
            <p className="text-muted-foreground">Fill the 9×9 grid with numbers 1-9</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={() => startGame('easy')} className="p-6 h-auto flex-col bg-green-500 hover:bg-green-600">
                  <Target className="h-6 w-6 mb-2" />
                  <span className="text-lg font-semibold">Easy</span>
                  <span className="text-sm">40 given numbers</span>
                </Button>
                <Button onClick={() => startGame('medium')} className="p-6 h-auto flex-col bg-orange-500 hover:bg-orange-600">
                  <Clock className="h-6 w-6 mb-2" />
                  <span className="text-lg font-semibold">Medium</span>
                  <span className="text-sm">30 given numbers</span>
                </Button>
                <Button onClick={() => startGame('hard')} className="p-6 h-auto flex-col bg-red-500 hover:bg-red-600">
                  <Trophy className="h-6 w-6 mb-2" />
                  <span className="text-lg font-semibold">Hard</span>
                  <span className="text-sm">25 given numbers</span>
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>How to play:</strong></p>
                <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-1">
                  <li>Fill each row, column, and 3×3 box with numbers 1-9</li>
                  <li>Each number can appear only once in each row, column, and box</li>
                  <li>Click a cell to select it, then click a number to fill it</li>
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
    const minutes = Math.floor(gameState!.timeElapsed / 60);
    const seconds = gameState!.timeElapsed % 60;
    
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="text-center">
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <CardTitle className="text-2xl">Puzzle Complete!</CardTitle>
              <ScreenReader text="Puzzle Complete!" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-4xl font-bold text-blue-600">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-semibold">{gameState?.difficulty.toUpperCase()}</div>
                  <div className="text-sm text-muted-foreground">Difficulty</div>
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

  const minutes = Math.floor(gameState.timeElapsed / 60);
  const seconds = gameState.timeElapsed % 60;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <Badge variant="outline" className="text-lg px-3 py-1">
          {gameState.difficulty.toUpperCase()}
        </Badge>
        <div className="text-right">
          <div className="text-2xl font-bold">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
          <div className="text-sm text-muted-foreground">Time Elapsed</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Game Grid */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-9 gap-1 max-w-fit mx-auto bg-gray-800 p-2 rounded">
                {gameState.grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const isSelected = gameState.selectedCell?.row === rowIndex && gameState.selectedCell?.col === colIndex;
                    const isOriginal = gameState.originalGrid[rowIndex][colIndex] !== 0;
                    const hasError = gameState.errors.some(error => error.row === rowIndex && error.col === colIndex);
                    const isInThickBorder = (rowIndex % 3 === 2 && rowIndex !== 8) || (colIndex % 3 === 2 && colIndex !== 8);
                    
                    return (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        className={`
                          w-10 h-10 text-lg font-bold rounded
                          ${isSelected ? 'bg-blue-200 border-2 border-blue-500' : 'border border-gray-300'}
                          ${isOriginal ? 'bg-gray-100 text-gray-800 font-black' : 'bg-white text-blue-600'}
                          ${hasError ? 'bg-red-100 border-red-400 text-red-700' : ''}
                          ${isInThickBorder ? 'border-r-2 border-b-2 border-gray-800' : ''}
                          hover:bg-gray-50 transition-colors duration-200
                          disabled:cursor-not-allowed
                        `}
                        disabled={isOriginal}
                        aria-label={`Cell row ${rowIndex + 1}, column ${colIndex + 1}, ${cell === 0 ? 'empty' : `number ${cell}`}`}
                      >
                        {cell === 0 ? '' : cell}
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
          {/* Number Pad */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Numbers</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
                  <Button
                    key={number}
                    onClick={() => handleNumberInput(number)}
                    variant="outline"
                    className="h-12 text-lg font-bold"
                    disabled={!gameState.selectedCell || gameState.originalGrid[gameState.selectedCell.row][gameState.selectedCell.col] !== 0}
                  >
                    {number}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <div className="space-y-2">
            <Button
              onClick={useHint}
              disabled={!gameState.selectedCell || gameState.hintsUsed >= 3}
              className="w-full"
              variant="outline"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Hint ({3 - gameState.hintsUsed} left)
            </Button>
            
            <Button
              onClick={undoMove}
              disabled={!gameState.selectedCell || gameState.originalGrid[gameState.selectedCell.row][gameState.selectedCell.col] !== 0}
              className="w-full"
              variant="outline"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear Cell
            </Button>
          </div>

          {/* Stats */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Hints Used:</span>
                <span className="font-semibold">{gameState.hintsUsed}/3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Errors:</span>
                <span className="font-semibold text-red-600">{gameState.errors.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SudokuGame;
