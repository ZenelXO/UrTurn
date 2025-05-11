import { Request, Response } from 'express';
import { firestore } from '../auth/firebase';

export const completeProfile = async (req: Request, res: Response) => {
  const { firstName, lastName, phone, dob, country, state, city, zip } = req.body;

  if (!req.user?.uid) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const newProfile = {
    uid: req.user.uid,
    firstName,
    lastName,
    phone,
    dob,
    country,
    state,
    city,
    zip,
  };

  try {
    await firestore.collection('userProfiles').doc(req.user.uid).set(newProfile);
    res.status(201).json({ message: 'Profile saved', profile: newProfile });
  } catch (error) {
    console.error('Firestore error:', error);
    res.status(500).json({ error: 'Error saving profile to Firestore' });
  }
};
