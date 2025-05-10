
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AccessibilityControls } from '@/components/AccessibilityControls';
import { ArrowUp, Bell, Home } from 'lucide-react';
import Logo from '@/components/Logo';

const Dashboard = () => {
  const [showAccessibility, setShowAccessibility] = useState(false);
  
  // Mock data - in a real app this would come from an API
  const fitnessScore = 79.8;
  const fitnessScoreChange = 3.2;
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
        {/* Fitness Score Card */}
        <Card className="w-full overflow-hidden bg-primary/5">
          <CardHeader className="bg-primary text-primary-foreground p-4">
            <CardTitle className="text-xl">Your Fitness Score</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="text-5xl font-bold">{fitnessScore}</div>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUp size={20} />
                <span>{fitnessScoreChange}%</span>
              </div>
            </div>
            <p className="mt-2 text-muted-foreground">Score is calculated based on your activity, vitals, and health data.</p>
            <Button className="mt-4" variant="outline">View Detailed Analysis</Button>
          </CardContent>
        </Card>
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="medicines" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="medicines">Medicines</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>
          
          {/* Medicines Tab */}
          <TabsContent value="medicines" className="space-y-4">
            <h2 className="text-xl font-semibold">Today's Medications</h2>
            {medicines.map(medicine => (
              <Card key={medicine.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{medicine.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {medicine.time} · {medicine.dosage}
                    </p>
                  </div>
                  <Button variant={medicine.taken ? "secondary" : "default"}>
                    {medicine.taken ? "Taken" : "Take Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" className="w-full">View All Medications</Button>
          </TabsContent>
          
          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
            {appointments.map(appointment => (
              <Card key={appointment.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{appointment.title}</h3>
                    <span className="text-sm px-2 py-1 bg-secondary rounded-full">
                      {appointment.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(appointment.date).toLocaleDateString('en-US', { 
                      month: 'short', day: 'numeric' 
                    })} · {appointment.time}
                  </p>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" className="w-full">View All Appointments</Button>
          </TabsContent>
          
          {/* Vitals Tab */}
          <TabsContent value="vitals" className="space-y-4">
            <h2 className="text-xl font-semibold">Today's Health Vitals</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-muted-foreground">Steps</h3>
                  <div className="text-2xl font-semibold">{vitals.steps}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-muted-foreground">Weight</h3>
                  <div className="text-2xl font-semibold">{vitals.weight}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-muted-foreground">Sleep</h3>
                  <div className="text-2xl font-semibold">{vitals.sleep}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-muted-foreground">Heart Rate</h3>
                  <div className="text-2xl font-semibold">{vitals.heartRate}</div>
                </CardContent>
              </Card>
            </div>
            <Button variant="outline" className="w-full">Update Vitals</Button>
          </TabsContent>
          
          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-4">
            <h2 className="text-xl font-semibold">Upcoming Activities</h2>
            <Card className="bg-golden-yellow/20">
              <CardContent className="p-4">
                <h3 className="font-medium">Memory Game Challenge</h3>
                <p className="text-sm text-muted-foreground">Today at 3:00 PM</p>
                <Button className="mt-3" size="sm">Play Now</Button>
              </CardContent>
            </Card>
            <Card className="bg-golden-pink/20">
              <CardContent className="p-4">
                <h3 className="font-medium">Gentle Yoga Webinar</h3>
                <p className="text-sm text-muted-foreground">Tomorrow at 10:00 AM</p>
                <Button className="mt-3" variant="outline" size="sm">Set Reminder</Button>
              </CardContent>
            </Card>
            <Card className="bg-golden-peach/20">
              <CardContent className="p-4">
                <h3 className="font-medium">Community Garden Volunteering</h3>
                <p className="text-sm text-muted-foreground">May 15 at 9:00 AM</p>
                <Button className="mt-3" variant="outline" size="sm">Learn More</Button>
              </CardContent>
            </Card>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
              <path d="M18 12a2 2 0 0 0 0 4h2v-4Z" />
            </svg>
            <span className="text-xs">Health</span>
          </Button>
          
          <Button variant="ghost" className="flex flex-col items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
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
