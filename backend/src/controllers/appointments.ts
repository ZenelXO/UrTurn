// controllers/appointments.ts
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { appointments, Appointment } from '../models/appointments';

export const createAppointment = (req: Request, res: Response) => {
  const { uid, date } = req.body;
  const newAppointment: Appointment = {
    id: uuidv4(),
    uid,
    date,
    status: 'active',
  };
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
};

export const getAppointments = (req: Request, res: Response) => {
  const { uid } = req.query;
  const result = appointments.filter(app => app.uid === uid && app.status === 'active');
  res.json(result);
};

export const cancelAppointment = (req: Request, res: Response): void => {
    const { id } = req.params as { id: string };
    const appointment = appointments.find(app => app.id === id);
  
    if (!appointment) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
  
    appointment.status = 'canceled';
    res.json({ message: 'Canceled', appointment });
  };