// src/controllers/appointments.ts
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Appointment } from '../models/appointments';
import { firestore } from '../auth/firebase';

// Crear nueva reserva
export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  const { uid, title, description, time, price, people, date } = req.body;

  if (!uid || !title || !time || !price || !people || !date) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const newAppointment: Appointment = {
    uid,
    title,
    description,
    time,
    price,
    people,
    date,
    status: 'pending',
  };

  try {
    const docRef = await firestore.collection('appointments').add(newAppointment);
    res.status(201).json({ id: docRef.id, ...newAppointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Error creating appointment' });
  }
};

// Obtener reservas de un usuario
export const getAppointments = async (req: Request, res: Response): Promise<void> => {
  const { uid } = req.query;

  if (!uid || typeof uid !== 'string') {
    res.status(400).json({ error: 'Missing or invalid uid parameter' });
    return;
  }

  try {
    const snapshot = await firestore
      .collection('appointments')
      .where('uid', '==', uid)
      .where('status', 'in', ['pending', 'active', 'canceled']) 
      .get();

    const appointments: Appointment[] = snapshot.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    } as Appointment));

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
};

// Cancelar reserva
export const cancelAppointment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const ref = firestore.collection('appointments').doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }

    await ref.update({ status: 'canceled' });
    res.json({ message: 'Appointment canceled' });
  } catch (error) {
    console.error('Error canceling appointment:', error);
    res.status(500).json({ error: 'Error canceling appointment' });
  }
};
