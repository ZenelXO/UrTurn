import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { OpenAPIV3 } from 'openapi-types';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Appointment API',
    version: '1.0.0',
    description: 'API para gestionar citas',
  },
  servers: [{ url: 'http://localhost:3000/api' }],
};

const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, '../routes/appointments.ts')],
};

const swaggerSpec = swaggerJSDoc(options) as OpenAPIV3.Document;
export default swaggerSpec;