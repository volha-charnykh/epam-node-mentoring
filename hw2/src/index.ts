import { Express } from 'express';
import * as express from 'express';

const app: Express = express();

app.listen(3456);

app.get('/', (req, res) => res.json({ ok: true }));
