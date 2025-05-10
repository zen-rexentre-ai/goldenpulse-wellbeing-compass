
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: number;
  name: string;
  type: string;
  time: string;
  color: string;
}

interface ActivitiesWidgetProps {
  activities: Activity[];
  toggleWidget: (widgetName: string) => void;
}

export const ActivitiesWidget: React.FC<ActivitiesWidgetProps> = ({ activities, toggleWidget }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Upcoming Activities</h2>
        <Button variant="outline" size="sm" onClick={() => toggleWidget('Activities')}>
          Customize
        </Button>
      </div>
      
      {activities.map((activity) => (
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
    </div>
  );
};
