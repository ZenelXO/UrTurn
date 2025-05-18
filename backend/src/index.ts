import express from 'express';
import cors from 'cors';
import appointmentRoutes from './routes/appointments';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger';
import userRoutes from './routes/users';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (_req, res) => {
  res.send('API funcionando');
});

app.use('/api', userRoutes);
app.use('/api', appointmentRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
