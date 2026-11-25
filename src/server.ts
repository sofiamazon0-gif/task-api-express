import type { Server } from 'node:http';
import { app } from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { env } from './config/env.js';

const listen = (port: number): Promise<Server> => new Promise((resolve, reject) => {
  const server = app.listen(port, '0.0.0.0');
  const onError = (error: Error): void => reject(error);

  server.once('error', onError);
  server.once('listening', () => {
    server.off('error', onError);
    resolve(server);
  });
});

const startServer = async (): Promise<void> => {
  let databaseConnected = false;

  try {
    await connectDatabase({
      uri: env.MONGODB_URI,
      dbName: env.MONGODB_DB_NAME
    });
    databaseConnected = true;

    const server = await listen(env.PORT);
      console.log(`API ${env.APP_VERSION} disponible en ${env.PUBLIC_API_URL}`);

    let shuttingDown = false;
    const shutdown = (signal: NodeJS.Signals): void => {
      if (shuttingDown) return;
      shuttingDown = true;

      console.log(`Señal ${signal} recibida; cerrando la API.`);
      server.close(async (error) => {
        if (error) {
          console.error('No fue posible cerrar correctamente el servidor HTTP.');
          process.exitCode = 1;
        }

        try {
          await disconnectDatabase();
          console.log('Conexión con MongoDB cerrada.');
        } catch {
          console.error('No fue posible cerrar correctamente la conexión con MongoDB.');
          process.exitCode = 1;
        }
      });
    };

    process.once('SIGINT', () => shutdown('SIGINT'));
    process.once('SIGTERM', () => shutdown('SIGTERM'));
  } catch {
    if (databaseConnected) {
      try {
        await disconnectDatabase();
      } catch {
        console.error('No fue posible cerrar correctamente la conexión con MongoDB.');
      }
    }

    console.error(
      'No fue posible iniciar la API. Revise MONGODB_URI, ' +
      'el usuario y la lista de acceso de red.'
    );
    process.exitCode = 1;
  }
};

void startServer();
