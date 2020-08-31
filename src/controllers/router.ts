import * as express from 'express';
import { Router } from 'express';
import { userValidator, validateSchema, userIdValidator, validatePath } from './validation';
import { UserRoutes } from './user-routes';

export const router: Router = express.Router();

router
  .get('/user/:id', validatePath(userIdValidator), UserRoutes.getById)
  .put('/user/:id', validatePath(userIdValidator), validateSchema(userValidator), UserRoutes.update)
  .delete('/user/:id', validatePath(userIdValidator), UserRoutes.delete)
  .post('/user', validateSchema(userValidator), UserRoutes.create)
  .get('/user', UserRoutes.getAutoSuggestUsers);

