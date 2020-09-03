import * as express from 'express';
import { router } from './controllers';
import config from './config';
import appEventEmitter from './events/app-event.emitter';

const app = express();

app.use(express.json());
app.use(router);

app.use((req, res) => {
  res.status(404).json({
    status: 'Page does not exist'
  });
});

const PORT = config.port || 3500;

let server = app.listen(PORT);

appEventEmitter.on('stop-app', () => {
  server.close();
});
