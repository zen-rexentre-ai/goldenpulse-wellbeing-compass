
import React, { useState } from 'react';
import { MedicineWidget } from './MedicineWidget';
import { AppointmentsWidget } from './AppointmentsWidget';
import { VitalsWidget } from './VitalsWidget';
import { HealthFocusWidget } from './HealthFocusWidget';
import { ActivitiesWidget } from './ActivitiesWidget';
import { Pill, Calendar, Activity, Heart, Video } from 'lucide-react';

interface Medicine {
  id: number;
  name: string;
  time: string;
  dosage: string;
  taken: boolean;
}

interface Appointment {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
}

interface Vitals {
  steps: number;
  weight: string;
  sleep: string;
  heartRate: string;
}

interface HealthFocusItem {
  name: string;
  value: string;
  status: string;
  recommendation: string;
}

interface Activity {
  id: number;
  name: string;
  type: string;
  time: string;
  color: string;
}

interface DashboardTabsProps {
  medicines: Medicine[];
  appointments: Appointment[];
  vitals: Vitals;
  healthFocus: HealthFocusItem[];
  activities: Activity[];
  toggleWidget: (widgetName: string) => void;
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({
  medicines,
  appointments,
  vitals,
  healthFocus,
  activities,
  toggleWidget
}) => {
  const [activeTab, setActiveTab] = useState('medicines');
  
  const tabItems = [
    { 
      id: 'medicines', 
      label: 'Medicines', 
      icon: <Pill />, 
      content: <MedicineWidget medicines={medicines} toggleWidget={toggleWidget} />,
      color: 'bg-primary/10'
    },
    { 
      id: 'appointments', 
      label: 'Appointments', 
      icon: <Calendar />, 
      content: <AppointmentsWidget appointments={appointments} toggleWidget={toggleWidget} />,
      color: 'bg-secondary/10'
    },
    { 
      id: 'vitals', 
      label: 'Vitals', 
      icon: <Activity />, 
      content: <VitalsWidget vitals={vitals} toggleWidget={toggleWidget} />,
      color: 'bg-blue-50'
    },
    { 
      id: 'healthfocus', 
      label: 'Health Focus', 
      icon: <Heart />, 
      content: <HealthFocusWidget healthFocus={healthFocus} toggleWidget={toggleWidget} />,
      color: 'bg-red-50'
    },
    { 
      id: 'activities', 
      label: 'Activities', 
      icon: <Video />, 
      content: <ActivitiesWidget activities={activities} toggleWidget={toggleWidget} />,
      color: 'bg-green-50'
    }
  ];

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {tabItems.map((tab) => (
          <div 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-3 rounded-lg cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === tab.id 
                ? `${tab.color} ring-2 ring-primary/20 shadow-sm` 
                : 'bg-muted/50 hover:bg-muted'
            }`}
          >
            <div className={`p-2 rounded-full ${activeTab === tab.id ? 'bg-white/80' : 'bg-muted'}`}>
              {React.cloneElement(tab.icon, { 
                size: 18, 
                className: activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
              })}
            </div>
            <span className={`font-medium ${activeTab === tab.id ? 'text-foreground' : 'text-muted-foreground'}`}>
              {tab.label}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        {tabItems.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
