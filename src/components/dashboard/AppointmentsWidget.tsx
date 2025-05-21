
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Video, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Appointment {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  // Adding new fields for expanded details
  specialization?: string;
  meetingType?: 'virtual' | 'in-person';
  address?: string;
  notes?: string;
}

interface Activity {
  id: number;
  name: string;
  type: string;
  time: string;
  color: string;
}

interface AppointmentsWidgetProps {
  appointments: Appointment[];
  activities: Activity[];
  toggleWidget: (widgetName: string) => void;
}

export const AppointmentsWidget: React.FC<AppointmentsWidgetProps> = ({ 
  appointments: initialAppointments, 
  activities,
  toggleWidget 
}) => {
  // Augment the appointments with sample data since we're adding new fields
  const enhancedAppointments = initialAppointments.map(appt => ({
    ...appt,
    specialization: appt.id === 1 ? 'Cardiologist' : appt.id === 2 ? 'Fitness Instructor' : 'Community Coordinator',
    meetingType: appt.id === 1 ? 'in-person' : appt.id === 2 ? 'virtual' : 'in-person',
    address: appt.id === 1 ? '123 Medical Plaza, Suite 456' : appt.id === 2 ? 'Zoom Meeting Link' : '789 Community Center Dr',
    notes: appt.id === 1 ? 'Bring previous test results' : appt.id === 2 ? 'Wear comfortable clothes' : 'Bring volunteer ID'
  }));
  
  const [appointments] = useState(enhancedAppointments);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
        <Button variant="outline" size="sm" onClick={() => toggleWidget('Appointments')}>
          Customize
        </Button>
      </div>
      
      {appointments.map(appointment => (
        <Card key={appointment.id} className="overflow-hidden transition-all duration-200">
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
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => toggleExpand(appointment.id)}
                aria-label={expandedId === appointment.id ? "Hide details" : "Show details"}
              >
                {expandedId === appointment.id ? 
                  <ChevronUp size={18} /> : 
                  <ChevronDown size={18} />
                }
              </Button>
            </div>
            
            {expandedId === appointment.id && (
              <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Specialization:</span>
                  <span>{appointment.specialization}</span>
                </div>
                <div className="flex items-center gap-2">
                  {appointment.meetingType === 'virtual' ? (
                    <>
                      <Video size={16} className="text-blue-500" />
                      <span>Virtual Meeting</span>
                    </>
                  ) : (
                    <>
                      <MapPin size={16} className="text-red-500" />
                      <span>{appointment.address}</span>
                    </>
                  )}
                </div>
                {appointment.notes && (
                  <div className="bg-muted/50 p-2 rounded mt-2">
                    <span className="text-xs font-medium">Notes: </span>
                    <span className="text-xs">{appointment.notes}</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      
      {/* Activities Section - Collapsible */}
      <Collapsible
        open={activitiesOpen}
        onOpenChange={setActivitiesOpen}
        className="border rounded-lg p-4 bg-muted/20 mt-6"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Upcoming Activities</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {activitiesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              <span className="ml-1">{activitiesOpen ? "Hide" : "Show"}</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="mt-4 space-y-4">
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
        </CollapsibleContent>
      </Collapsible>
      
      <Button variant="outline" className="w-full">View All Appointments</Button>
    </div>
  );
};
