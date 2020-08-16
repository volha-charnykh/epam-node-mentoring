import * as express from 'express';
import { Router } from 'express';
import { userValidator, validator } from '../../../validation';
import { userRoutes } from './user-routes';

export const router: Router = express.Router();

router
  .get('/user/:id', userRoutes.getById)
  .put('/user/:id', validator.body(userValidator), userRoutes.update)
  .delete('/user/:id', userRoutes.delete)
  .post('/user', validator.body(userValidator), userRoutes.create)
  .get('/user', userRoutes.getAutoSuggestUsers);

