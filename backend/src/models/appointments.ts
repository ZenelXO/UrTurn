// models/appointment.ts
export interface Appointment {
  id?: string;
  uid: string;
  title: string;
  description: string;
  time: string;
  price: string;
  people: number;
  date: string;
  status: 'active' | 'pending' | 'canceled';
}
  
export const appointments: Appointment[] = [];
