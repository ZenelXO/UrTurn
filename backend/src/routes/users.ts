import express from 'express';
import { completeProfile } from '../controllers/users';
import { authenticateUser } from '../auth/middleware';

const router = express.Router();

router.post('/register-info', authenticateUser, completeProfile);
export default router;
