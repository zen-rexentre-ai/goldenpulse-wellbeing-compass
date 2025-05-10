
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Appointment {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
}

interface AppointmentsWidgetProps {
  appointments: Appointment[];
  toggleWidget: (widgetName: string) => void;
}

export const AppointmentsWidget: React.FC<AppointmentsWidgetProps> = ({ appointments, toggleWidget }) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};
