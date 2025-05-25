
import React, { useState } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { useLanguage } from '@/components/LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Layers, Target, Zap, ArrowLeft } from 'lucide-react';
import { EmbossedCard } from '@/components/ui/card';
import ScreenReader from '@/components/ScreenReader';
import TriviaGame from '@/components/games/TriviaGame';
import MemoryGame from '@/components/games/MemoryGame';
import WordSearchGame from '@/components/games/WordSearchGame';
import SudokuGame from '@/components/games/SudokuGame';

const Entertainment = () => {
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
      available: true,
      component: WordSearchGame
    },
    {
      id: 'puzzle',
      title: t('puzzle_game'),
      description: t('puzzle_description'),
      icon: Zap,
      color: 'bg-orange-500',
      available: true,
      component: SudokuGame
    }
  ];

  const upcomingWebinars = [
    { id: 1, title: "Healthy Aging: Tips for Seniors", date: "May 28, 2025", time: "10:00 AM", instructor: "Dr. Sarah Johnson", thumbnail: "health-aging.jpg" },
    { id: 2, title: "Technology Made Simple", date: "June 2, 2025", time: "2:00 PM", instructor: "Prof. Michael Lee", thumbnail: "tech-simple.jpg" },
    { id: 3, title: "Financial Planning for Retirement", date: "June 5, 2025", time: "11:00 AM", instructor: "Ms. Emily Parker", thumbnail: "financial-planning.jpg" }
  ];
  
  const recordedWebinars = [
    { id: 1, title: "Nutrition for Seniors", date: "May 15, 2025", instructor: "Dr. Sarah Johnson", duration: "45 minutes", thumbnail: "nutrition.jpg" },
    { id: 2, title: "Mental Wellness in Later Life", date: "May 10, 2025", instructor: "Dr. Robert Kumar", duration: "55 minutes", thumbnail: "mental-wellness.jpg" },
    { id: 3, title: "Staying Active at Home", date: "May 5, 2025", instructor: "Ms. Lisa Thompson", duration: "30 minutes", thumbnail: "active-home.jpg" }
  ];

  if (activeGame) {
    const game = games.find(g => g.id === activeGame);
    const GameComponent = game?.component;

    return (
      <div className="min-h-screen bg-background pb-20">
        <Header 
          title={game?.title || t('entertainment')} 
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
              {t('back')} to {t('entertainment')}
            </Button>
          </div>
          
          {GameComponent && <GameComponent />}
        </div>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-16">
      <Header title={t("entertainment")} showBack />
      
      <main className="container max-w-6xl p-4 space-y-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold">{t('entertainment')}</h1>
            <ScreenReader text={t('entertainment')} />
          </div>
          <p className="text-muted-foreground">{t('games_subtitle')}</p>
        </div>

        <Tabs defaultValue="games">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="games">{t("brain_training_games")}</TabsTrigger>
            <TabsTrigger value="webinars">{t("webinars_and_videos")}</TabsTrigger>
          </TabsList>
          
          {/* Games Tab */}
          <TabsContent value="games" className="space-y-4">
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
          </TabsContent>
          
          {/* Webinars Tab */}
          <TabsContent value="webinars" className="space-y-4">
            <Tabs defaultValue="upcoming">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="upcoming">{t("upcoming_live")}</TabsTrigger>
                <TabsTrigger value="recorded">{t("recorded")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="space-y-4">
                {upcomingWebinars.map(webinar => (
                  <EmbossedCard key={webinar.id} className="overflow-hidden">
                    <div className="bg-gradient-to-r from-golden-peach/50 to-golden-yellow/30 p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/3 aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                          <span>{t("webinar_thumbnail")}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{webinar.title}</h3>
                          <p className="text-muted-foreground">{t("with")} {webinar.instructor}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">{webinar.date}</span>
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">{webinar.time}</span>
                          </div>
                          <div className="mt-4">
                            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                              {t("register_now")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </EmbossedCard>
                ))}
              </TabsContent>
              
              <TabsContent value="recorded" className="space-y-4">
                {recordedWebinars.map(webinar => (
                  <EmbossedCard key={webinar.id} className="overflow-hidden">
                    <div className="bg-gradient-to-r from-golden-pink/50 to-golden-peach/30 p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/3 aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                          <span>{t("webinar_recording")}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{webinar.title}</h3>
                          <p className="text-muted-foreground">{t("with")} {webinar.instructor}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">{webinar.date}</span>
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">{webinar.duration}</span>
                          </div>
                          <div className="mt-4">
                            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                              {t("watch_now")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </EmbossedCard>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Entertainment;
