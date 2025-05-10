
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { Button } from '@/components/ui/button';

const volunteeringOpportunities = [
  {
    id: 1,
    title: "Community Garden Cleanup",
    organization: "Green Spaces Initiative",
    date: "May 15, 2025",
    location: "Riverside Park",
    category: "Environmental",
    spots: 5,
  },
  {
    id: 2,
    title: "Senior Center Assistance",
    organization: "Golden Years Foundation",
    date: "May 17, 2025",
    location: "Sunset Senior Living",
    category: "Elder Care",
    spots: 3,
  },
  {
    id: 3,
    title: "Food Bank Distribution",
    organization: "Community Food Network",
    date: "May 20, 2025",
    location: "Downtown Community Center",
    category: "Food Banks",
    spots: 8,
  },
  {
    id: 4,
    title: "Animal Shelter Walk-a-thon",
    organization: "Paws & Hearts",
    date: "May 22, 2025",
    location: "City Animal Shelter",
    category: "Animal Shelters",
    spots: 10,
  }
];

const Volunteering = () => {
  return (
    <div className="min-h-screen flex flex-col pb-20">
      <div className="flex-1 container max-w-6xl py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Volunteering</h1>
          <Button variant="outline" size="sm">View All</Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Your Preferences</h2>
          <Card className="border border-primary/20">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Interests</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">Elder Care</Badge>
                    <Badge variant="secondary">Animal Shelters</Badge>
                    <Badge variant="secondary">Environmental Cleanup</Badge>
                    <Badge variant="secondary">Community Gardening</Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Availability</p>
                  <p>Weekends, Tuesday evenings</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hours per month</p>
                  <p>8 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Upcoming Opportunities</h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {volunteeringOpportunities.map((opportunity) => (
              <Card key={opportunity.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-md">{opportunity.title}</CardTitle>
                    <Badge>{opportunity.category}</Badge>
                  </div>
                  <CardDescription>{opportunity.organization}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{opportunity.date}</span>
                      <span>{opportunity.spots} spots left</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                    <Button className="w-full mt-2" size="sm">Sign Up</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Volunteering;
