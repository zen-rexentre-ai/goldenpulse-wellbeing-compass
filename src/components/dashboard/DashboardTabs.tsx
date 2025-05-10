
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MedicineWidget } from './MedicineWidget';
import { AppointmentsWidget } from './AppointmentsWidget';
import { VitalsWidget } from './VitalsWidget';
import { HealthFocusWidget } from './HealthFocusWidget';
import { ActivitiesWidget } from './ActivitiesWidget';

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
  return (
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
        <MedicineWidget medicines={medicines} toggleWidget={toggleWidget} />
      </TabsContent>
      
      {/* Appointments Tab */}
      <TabsContent value="appointments" className="space-y-4">
        <AppointmentsWidget appointments={appointments} toggleWidget={toggleWidget} />
      </TabsContent>
      
      {/* Vitals Tab */}
      <TabsContent value="vitals" className="space-y-4">
        <VitalsWidget vitals={vitals} toggleWidget={toggleWidget} />
      </TabsContent>
      
      {/* Health Focus Tab */}
      <TabsContent value="healthfocus" className="space-y-4">
        <HealthFocusWidget healthFocus={healthFocus} toggleWidget={toggleWidget} />
      </TabsContent>
      
      {/* Activities Tab */}
      <TabsContent value="activities" className="space-y-4">
        <ActivitiesWidget activities={activities} toggleWidget={toggleWidget} />
      </TabsContent>
    </Tabs>
  );
};
