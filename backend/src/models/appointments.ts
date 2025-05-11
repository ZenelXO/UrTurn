// models/appointment.ts
export interface Appointment {
    id: string;
    uid: string;
    date: string;
    status: 'active' | 'canceled';
}
  
export const appointments: Appointment[] = [];
