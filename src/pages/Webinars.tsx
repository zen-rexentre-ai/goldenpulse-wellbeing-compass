
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { useLanguage } from '@/components/LanguageProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmbossedCard } from '@/components/ui/card';

const Webinars = () => {
  const { t } = useLanguage();
  
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-16">
      <Header title={t("webinars")} />
      
      <main className="container max-w-6xl p-4 space-y-6">
        <h1 className="text-2xl font-bold">{t("webinars_and_videos")}</h1>
        
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
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Webinars;
