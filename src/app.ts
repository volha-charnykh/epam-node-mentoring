import * as express from 'express';
import { router } from './controllers';
import config from './config';
import appEventEmitter from './events/app-event.emitter';
import { Server } from 'http';

const app = express();

app.use(express.json());
app.use(router);

app.use((req, res) => {
  res.status(404).json({
    status: 'Page does not exist'
  });
});

const PORT = config.port || 3500;

let server: Server;

appEventEmitter.on('app-inited', () => {
  server = app.listen(PORT, () => console.log(`express: Server is listening ${PORT} port.`));
});

appEventEmitter.on('stop-app', () => {
  !!server && server.close();
});
