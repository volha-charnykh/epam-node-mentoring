import * as express from 'express';
import { router } from './controllers';
import config from './config';

const app = express();

app.use(express.json());
app.use(router);

app.use( (req, res) => {
  res.status(404).json({
    status: 'Page does not exist'
  });
});

const PORT = config.port || 3500;

app.listen(PORT);
