import express from 'express';
import { env } from './config/env.js';
import swaggerUi from 'swagger-ui-express';
import { openApiDocument } from './docs/openapi.js';
import { authRouter } from './routes/auth.routes.js';
import { healthRouter } from './routes/health.routes.js';
import { taskRouter } from './routes/task.routes.js';
import { requestContext } from './middlewares/request-context.middleware.js';
import { notFound } from './middlewares/not-found.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import {
  corsPolicy,
  documentationSecurityHeaders,
  securityHeaders
} from './middlewares/security.middleware.js';

// Crea la aplicacion principal de Express.
export const app = express();
app.disable('x-powered-by');
if (env.TRUST_PROXY_HOPS > 0) app.set('trust proxy', env.TRUST_PROXY_HOPS);

// Prepara cada peticion y convierte los cuerpos JSON en objetos JavaScript.
app.use(requestContext);
app.get('/api-docs.json', documentationSecurityHeaders, (_req, res): void => {
  res.status(200).json(openApiDocument);
});
app.use(
  '/api-docs',
  documentationSecurityHeaders,
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument, {
    customSiteTitle: 'Task API Express'
  })
);
app.use(securityHeaders);
app.use(corsPolicy);
app.use(express.json({ limit: '20kb' }));
app.use('/health', healthRouter);
app.use('/api/auth', authRouter);

// Agrupa todos los endpoints relacionados con tareas bajo /api/tasks.
app.use('/api/tasks', taskRouter);

// Atiende rutas desconocidas y centraliza el manejo de errores.
app.use(notFound);
app.use(errorHandler);
