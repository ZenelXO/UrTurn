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
 *               - title
 *               - description
 *               - time
 *               - price
 *               - people
 *               - date
 *             properties:
 *               uid:
 *                 type: string
 *                 description: UID del usuario que crea la cita
 *               title:
 *                 type: string
 *                 description: Título del servicio
 *               description:
 *                 type: string
 *                 description: Detalles del servicio
 *               time:
 *                 type: string
 *                 description: Hora de la cita
 *               price:
 *                 type: string
 *                 description: Precio estimado
 *               people:
 *                 type: integer
 *                 description: Número de personas
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la cita
 *     responses:
 *       201:
 *         description: Cita creada exitosamente
 *       400:
 *         description: Datos incompletos o inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/appointments', createAppointment);

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Obtener citas activas o pendientes de un usuario
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: query
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: UID del usuario para filtrar sus citas
 *     responses:
 *       200:
 *         description: Lista de citas activas o pendientes
 *       400:
 *         description: Falta el parámetro uid
 *       500:
 *         description: Error interno al obtener citas
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
 *         description: ID de la cita a cancelar
 *     responses:
 *       200:
 *         description: Cita cancelada correctamente
 *       404:
 *         description: Cita no encontrada
 *       500:
 *         description: Error al cancelar la cita
 */
router.delete('/appointments/:id', cancelAppointment);

export default router;
