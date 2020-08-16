import * as express from 'express';
import { Request, Response } from 'express';
import { errorHandler } from '../../validation';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);
app.use((err: any, req: Request, res: Response, next: (err?: any) => void) =>
  errorHandler(err, req, res, next));

app.use( (req, res) => {
  res.status(404).json({
    status: 'Page does not exist'
  });
});

const PORT = 3500;

app.listen(PORT);
