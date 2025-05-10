import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AccessibilityControls } from '@/components/AccessibilityControls';
import { 
  ArrowLeft,
  ArrowRight, 
  ArrowUp, 
  ArrowDown, 
  Bell, 
  Home, 
  Pill,
  Calendar,
  Activity,
  Heart,
  Weight,
  Bed,
  Users
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from '@/hooks/use-toast';
import { DetailedAnalysisDialog } from '@/components/DetailedAnalysisDialog';

const Dashboard = () => {
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [activeScoreTab, setActiveScoreTab] = useState('week');
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const { toast } = useToast();
  
  // Mock fitness score data - in a real app this would come from an API
  const fitnessScores = {
    current: 79.8,
    week: {
      score: 76.6,
      change: 3.2,
      direction: 'up'
    },
    month: {
      score: 72.5,
      change: 7.3,
      direction: 'up'
    },
    sinceLogin: {
      score: 65.2,
      change: 14.6,
      direction: 'up'
    }
  };
  
  const medicines = [
    { id: 1, name: "Vitamin D", time: "8:00 AM", dosage: "1000 IU", taken: false },
    { id: 2, name: "Omega-3", time: "12:00 PM", dosage: "1000 mg", taken: true },
    { id: 3, name: "Calcium", time: "8:00 PM", dosage: "500 mg", taken: false },
  ];
  
  const appointments = [
    { id: 1, title: "Dr. Smith", type: "doctor", date: "2025-05-15", time: "10:30 AM" },
    { id: 2, title: "Yoga Class", type: "event", date: "2025-05-12", time: "9:00 AM" },
    { id: 3, title: "Volunteer - Food Bank", type: "volunteer", date: "2025-05-18", time: "1:00 PM" },
  ];
  
  const vitals = {
    steps: 8000,
    weight: "68 kg",
    sleep: "7.5 hrs",
    heartRate: "70 bpm"
  };
  
  const healthFocus = [
    { name: "Cholesterol", value: "210 mg/dL", status: "warning", recommendation: "Consider dietary changes" },
    { name: "Blood Pressure", value: "125/82", status: "normal", recommendation: "Continue monitoring" },
    { name: "Blood Sugar", value: "105 mg/dL", status: "normal", recommendation: "Maintain current habits" }
  ];

  const upcomingActivities = [
    { id: 1, name: "Memory Game Challenge", type: "game", time: "Today at 3:00 PM", color: "bg-golden-yellow/20" },
    { id: 2, name: "Gentle Yoga Webinar", type: "webinar", time: "Tomorrow at 10:00 AM", color: "bg-golden-pink/20" },
    { id: 3, name: "Community Garden Volunteering", type: "volunteer", time: "May 15 at 9:00 AM", color: "bg-golden-peach/20" }
  ];

  const handleMedicineTaken = (id: number) => {
    // In a real app, this would update the database
    toast({
      title: "Medicine marked as taken",
      description: "We've updated your medication record."
    });
  };

  // Function to handle widget visibility toggle
  const toggleWidget = (widgetName: string) => {
    toast({
      title: "Widget settings updated",
      description: `${widgetName} widget visibility toggled.`
    });
  };

  // Function to render the trend arrow based on direction
  const renderTrendArrow = (direction: string) => {
    if (direction === 'up') {
      return <ArrowUp className="text-green-500" size={20} />;
    } else {
      return <ArrowDown className="text-red-500" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b p-4">
        <div className="container max-w-6xl flex justify-between items-center">
          <Logo size="sm" />
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAccessibility(!showAccessibility)}
              aria-label="Accessibility Settings"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l2 2" />
              </svg>
            </Button>
            
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Accessibility Controls */}
      {showAccessibility && (
        <div className="container max-w-6xl px-4 mt-4">
          <AccessibilityControls />
        </div>
      )}
      
      <main className="container max-w-6xl p-4 space-y-6">
        {/* Fitness Score Card with Carousel - Improved styling */}
        <div className="w-full overflow-hidden bg-primary/5 rounded-lg border shadow-sm">
          <div className="bg-primary text-primary-foreground p-4 text-center">
            <h2 className="text-xl font-semibold">Your Fitness Score</h2>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem className="pl-0">
                <Card className="border-0 shadow-none">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="text-6xl font-bold mb-2">{fitnessScores.current}</div>
                      <p className="text-sm text-muted-foreground">Current Score</p>
                      <div className="flex items-center gap-2 mt-3 text-lg">
                        <span>Weekly Change:</span>
                        <div className="flex items-center gap-1">
                          {renderTrendArrow(fitnessScores.week.direction)}
                          <span className={fitnessScores.week.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
                            {fitnessScores.week.change}%
                          </span>
                        </div>
                      </div>
                      <p className="mt-4 text-muted-foreground">Use the arrows to view your score history</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              <CarouselItem>
                <Card className="border-0 shadow-none">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="text-6xl font-bold mb-2">{fitnessScores.week.score}</div>
                      <p className="text-sm text-muted-foreground">Last Week</p>
                      <div className="flex items-center gap-2 mt-3 text-lg">
                        <span>Weekly Change:</span>
                        <div className="flex items-center gap-1 text-green-600">
                          <ArrowUp size={20} />
                          <span>2.8%</span>
                        </div>
                      </div>
                      <p className="mt-4 text-muted-foreground">This was your score one week ago</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              <CarouselItem>
                <Card className="border-0 shadow-none">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="text-6xl font-bold mb-2">{fitnessScores.month.score}</div>
                      <p className="text-sm text-muted-foreground">Last Month</p>
                      <div className="flex items-center gap-2 mt-3 text-lg">
                        <span>Monthly Change:</span>
                        <div className="flex items-center gap-1 text-green-600">
                          <ArrowUp size={20} />
                          <span>{fitnessScores.month.change}%</span>
                        </div>
                      </div>
                      <p className="mt-4 text-muted-foreground">This was your score one month ago</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              <CarouselItem>
                <Card className="border-0 shadow-none">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="text-6xl font-bold mb-2">{fitnessScores.sinceLogin.score}</div>
                      <p className="text-sm text-muted-foreground">Since Login</p>
                      <div className="flex items-center gap-2 mt-3 text-lg">
                        <span>Overall Progress:</span>
                        <div className="flex items-center gap-1 text-green-600">
                          <ArrowUp size={20} />
                          <span>{fitnessScores.sinceLogin.change}%</span>
                        </div>
                      </div>
                      <p className="mt-4 text-muted-foreground">Your progress since you started using the app</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            
            <div className="flex items-center justify-center mt-4 mb-2">
              <CarouselPrevious className="relative inset-auto mx-2" />
              <CarouselNext className="relative inset-auto mx-2" />
            </div>
          </Carousel>
          
          <div className="flex justify-center p-4">
            <Button 
              className="mt-2" 
              variant="outline" 
              onClick={() => setShowDetailedAnalysis(true)}
            >
              View Detailed Analysis
            </Button>
          </div>
        </div>
        
        {/* Detailed Analysis Dialog */}
        <DetailedAnalysisDialog 
          open={showDetailedAnalysis} 
          onOpenChange={setShowDetailedAnalysis} 
        />
        
        {/* Widget Controls */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Health Dashboard</h2>
          <Button variant="outline" size="sm">Customize Widgets</Button>
        </div>
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="medicines" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="medicines">Medicines</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="healthfocus">Health Focus</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>
          
          {/* Medicines Tab */}
          <TabsContent value="medicines" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Today's Medications</h2>
              <Button variant="outline" size="sm" onClick={() => toggleWidget('Medicines')}>
                Customize
              </Button>
            </div>
            
            {medicines.map(medicine => (
              <Card key={medicine.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Pill className="text-primary" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">{medicine.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{medicine.time}</span>
                          <span>•</span>
                          <span>{medicine.dosage}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant={medicine.taken ? "secondary" : "default"}
                      onClick={() => handleMedicineTaken(medicine.id)}
                    >
                      {medicine.taken ? "Taken" : "Take Now"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" className="w-full">View All Medications</Button>
          </TabsContent>
          
          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
              <Button variant="outline" size="sm" onClick={() => toggleWidget('Appointments')}>
                Customize
              </Button>
            </div>
            
            {appointments.map(appointment => (
              <Card key={appointment.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary/20 p-2 rounded-full">
                        <Calendar className="text-secondary-foreground" size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{appointment.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {appointment.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString('en-US', { 
                            month: 'short', day: 'numeric' 
                          })} · {appointment.time}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" className="w-full">View All Appointments</Button>
          </TabsContent>
          
          {/* Vitals Tab */}
          <TabsContent value="vitals" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Today's Health Vitals</h2>
              <Button variant="outline" size="sm" onClick={() => toggleWidget('Vitals')}>
                Customize
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Activity size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-muted-foreground text-sm">Steps</h3>
                      <div className="text-2xl font-semibold">{vitals.steps}</div>
                      <div className="text-xs text-green-600">+12% from yesterday</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Weight size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-muted-foreground text-sm">Weight</h3>
                      <div className="text-2xl font-semibold">{vitals.weight}</div>
                      <div className="text-xs text-muted-foreground">Last updated today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <Bed size={24} className="text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-muted-foreground text-sm">Sleep</h3>
                      <div className="text-2xl font-semibold">{vitals.sleep}</div>
                      <div className="text-xs text-amber-600">-0.5 hrs from average</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-3 rounded-full">
                      <Heart size={24} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-muted-foreground text-sm">Heart Rate</h3>
                      <div className="text-2xl font-semibold">{vitals.heartRate}</div>
                      <div className="text-xs text-green-600">Within normal range</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button variant="outline" className="w-full">Update Vitals</Button>
          </TabsContent>
          
          {/* Health Focus Tab */}
          <TabsContent value="healthfocus" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Health Areas to Focus</h2>
              <Button variant="outline" size="sm" onClick={() => toggleWidget('Health Focus')}>
                Customize
              </Button>
            </div>
            
            {healthFocus.map((item, index) => (
              <Card key={index} className={item.status === 'warning' ? 'border-amber-300' : 'border-green-300'}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">{item.value}</span>
                        <Badge 
                          variant={item.status === 'warning' ? 'default' : 'secondary'}
                          className={item.status === 'warning' ? 'bg-amber-500' : 'bg-green-500'}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right max-w-[50%]">
                      <p className="text-sm text-muted-foreground">{item.recommendation}</p>
                      <Button variant="link" className="p-0 h-auto mt-1">Learn more</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button variant="outline" className="w-full">View Health Report</Button>
          </TabsContent>
          
          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Upcoming Activities</h2>
              <Button variant="outline" size="sm" onClick={() => toggleWidget('Activities')}>
                Customize
              </Button>
            </div>
            
            {upcomingActivities.map((activity) => (
              <Card key={activity.id} className={activity.color}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{activity.name}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                        <Badge variant="outline">{activity.type}</Badge>
                      </div>
                    </div>
                    <div>
                      {activity.type === 'game' && (
                        <Button size="sm">Play Now</Button>
                      )}
                      {activity.type === 'webinar' && (
                        <Button variant="outline" size="sm">Set Reminder</Button>
                      )}
                      {activity.type === 'volunteer' && (
                        <Button variant="outline" size="sm">Learn More</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button variant="outline" className="w-full">View All Activities</Button>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-2">
        <div className="container max-w-6xl flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <Home size={24} />
            <span className="text-xs">Home</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <Pill size={24} />
            <span className="text-xs">Health</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <Users size={24} />
            <span className="text-xs">Community</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
