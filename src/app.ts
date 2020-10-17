import * as express from 'express';
import { Server } from 'http';
import config from './config';
import { router } from './controllers';
import appEventEmitter from './events/app-event.emitter';
import { logger } from './logger';

const app = express();

app.use(express.json());
app.use(router);

app.use((req, res) => {
  res.status(404).json({
    status: 'Page does not exist'
  });
});

app.use((error, req, res, next) => {
  logger.error(`Internal Server Error: ${error}`);
  res.status(500).send('Internal Server Error');
});

const PORT = config.port || 3500;

let server: Server;

appEventEmitter.on('app-inited', () => {
  server = app.listen(PORT, () => logger.info(`express: Server is listening ${ PORT } port.`));
});

const closeServer = () =>  {
  if (!!server) {
    server.close(() => {
      logger.info(`express: Server was closed successfully.`);
    });
    appEventEmitter.emit('stop-app');
  }};

appEventEmitter.on('app-stopped', () => process.exit(1));

process.on('SIGINT', closeServer)
  .on('SIGTERM', closeServer)
  .on('uncaughtException',
    error => {
      logger.error(`Uncaught Exception thrown: ${ error }`);
      closeServer();
    })
  .on('unhandledRejection',
    error => {
      logger.error(`Unhandled Rejection at Promise: ${ error } `);
      closeServer();
    });
