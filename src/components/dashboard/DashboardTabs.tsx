import React, { useState } from 'react';
import { MedicineWidget } from './MedicineWidget';
import { AppointmentsWidget } from './AppointmentsWidget';
import { HealthFocusWithVitalsWidget } from './HealthFocusWithVitalsWidget';
import { Pill, Calendar, Heart } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

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
  const { t } = useLanguage();
  
  const tabItems = [
    { 
      id: 'medicines', 
      label: t('todays_medications'), 
      icon: <Pill />, 
      content: <MedicineWidget medicines={medicines} toggleWidget={toggleWidget} />,
      color: 'bg-primary/10'
    },
    { 
      id: 'appointments', 
      label: t('appointments'), 
      icon: <Calendar />, 
      content: <AppointmentsWidget appointments={appointments} activities={activities} toggleWidget={toggleWidget} />,
      color: 'bg-secondary/10'
    },
    { 
      id: 'healthfocus', 
      label: t('health_focus'), 
      icon: <Heart />, 
      content: <HealthFocusWithVitalsWidget healthFocus={healthFocus} vitals={vitals} toggleWidget={toggleWidget} />,
      color: 'bg-red-50'
    }
  ];

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
            <div className="ml-auto">
              <ScreenReader text={tab.label} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        {tabItems.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
