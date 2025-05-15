// routes/appointments.ts
import express from 'express';
import { authenticateUser } from '../auth/middleware';
import {
  createAppointment,
  getAppointments,
  cancelAppointment,
} from '../controllers/appointments';

const router = express.Router();

router.use(authenticateUser);

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Crear una nueva cita
 *     tags:
 *       - Appointments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - uid
 *               - date
 *             properties:
 *               uid:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Cita creada exitosamente
 */
router.post('/appointments', createAppointment);
/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Obtener citas por usuario
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: query
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de citas activas
 */

router.get('/appointments', getAppointments);
/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Cancelar una cita (soft delete)
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la cita
 *     responses:
 *       200:
 *         description: Cita cancelada
 *       404:
 *         description: Cita no encontrada
 */

router.delete('/appointments/:id', cancelAppointment);

export default router;
