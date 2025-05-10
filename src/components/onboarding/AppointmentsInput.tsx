
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Plus, X, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  notes: string;
}

const AppointmentsInput: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const addAppointment = () => {
    if (doctorName && date && time) {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        doctorName,
        specialty,
        date,
        time,
        notes
      };
      
      setAppointments([...appointments, newAppointment]);
      resetForm();
    }
  };

  const resetForm = () => {
    setDoctorName('');
    setSpecialty('');
    setDate(undefined);
    setTime('');
    setNotes('');
  };

  const removeAppointment = (id: string) => {
    setAppointments(appointments.filter(appt => appt.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
        <p className="text-muted-foreground mb-4">
          Add your upcoming medical appointments to keep track of them.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="doctor-name">Doctor Name</Label>
            <Input 
              id="doctor-name" 
              value={doctorName} 
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="Dr. Smith"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="specialty">Specialty</Label>
            <Select 
              value={specialty}
              onValueChange={setSpecialty}
            >
              <SelectTrigger id="specialty">
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general-medicine">General Medicine</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                <SelectItem value="dentist">Dentist</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="time">Time</Label>
            <Input 
              id="time" 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special instructions or notes about this appointment..."
            className="min-h-[80px]"
          />
        </div>
      </div>

      <Button 
        onClick={addAppointment} 
        className="w-full" 
        size="sm"
        disabled={!doctorName || !date || !time} 
        type="button"
      >
        <Plus className="w-4 h-4 mr-2" /> Add Appointment
      </Button>

      {appointments.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-2">Your Upcoming Appointments:</h3>
          <div className="space-y-2">
            {appointments.map((appt) => (
              <Card key={appt.id} className="border">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{appt.doctorName}</div>
                    <div className="text-sm text-muted-foreground">
                      {appt.specialty && `${appt.specialty} • `}
                      {format(appt.date, "PPP")} at {appt.time}
                    </div>
                    {appt.notes && (
                      <div className="text-sm mt-1">{appt.notes}</div>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeAppointment(appt.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsInput;
