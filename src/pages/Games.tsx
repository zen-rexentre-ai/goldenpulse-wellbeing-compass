
import React, { useState } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { useLanguage } from '@/components/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Layers, Target, Zap, ArrowLeft } from 'lucide-react';
import ScreenReader from '@/components/ScreenReader';
import TriviaGame from '@/components/games/TriviaGame';
import MemoryGame from '@/components/games/MemoryGame';

const Games = () => {
  const { t } = useLanguage();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: 'trivia',
      title: t('trivia_game'),
      description: t('trivia_description'),
      icon: Brain,
      color: 'bg-blue-500',
      available: true,
      component: TriviaGame
    },
    {
      id: 'memory',
      title: t('memory_game'),
      description: t('memory_description'),
      icon: Layers,
      color: 'bg-green-500',
      available: true,
      component: MemoryGame
    },
    {
      id: 'word',
      title: t('word_game'),
      description: t('word_description'),
      icon: Target,
      color: 'bg-purple-500',
      available: false
    },
    {
      id: 'puzzle',
      title: t('puzzle_game'),
      description: t('puzzle_description'),
      icon: Zap,
      color: 'bg-orange-500',
      available: false
    }
  ];

  if (activeGame) {
    const game = games.find(g => g.id === activeGame);
    const GameComponent = game?.component;

    return (
      <div className="min-h-screen bg-background pb-20">
        <Header 
          title={game?.title || t('games')} 
          showBack 
        />
        
        <div className="container max-w-6xl px-4 py-6">
          <div className="mb-4">
            <Button 
              variant="ghost" 
              onClick={() => setActiveGame(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Games
            </Button>
          </div>
          
          {GameComponent && <GameComponent />}
        </div>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title={t('games')} showBack />
      
      <div className="container max-w-6xl px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold">{t('brain_training_games')}</h1>
            <ScreenReader text={t('brain_training_games')} />
          </div>
          <p className="text-muted-foreground">{t('games_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map((game) => {
            const IconComponent = game.icon;
            return (
              <Card key={game.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${game.color} text-white`}>
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{game.title}</CardTitle>
                      <ScreenReader text={game.title} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{game.description}</p>
                  <Button 
                    className="w-full" 
                    disabled={!game.available}
                    onClick={() => game.available && setActiveGame(game.id)}
                    aria-label={`${t('play')} ${game.title}`}
                  >
                    {game.available ? t('play_now') : t('coming_soon')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h2 className="text-lg font-semibold mb-2">{t('benefits_of_brain_games')}</h2>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>{t('improve_memory')}</li>
            <li>{t('enhance_concentration')}</li>
            <li>{t('boost_problem_solving')}</li>
            <li>{t('maintain_cognitive_health')}</li>
          </ul>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Games;
