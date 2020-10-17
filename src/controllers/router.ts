import * as express from 'express';
import { Router } from 'express';
import { GroupRoutes } from './group.routes';
import {
  userValidator,
  validateBody,
  uuidValidator,
  validatePath,
  groupValidator,
  uuidArrayValidator,
  loginValidator,
} from './validation';
import { UserRoutes } from './user-routes';
import { UserGroupRoutes } from './user-group.routes';
import { LoginRoutes } from './login.routes';
import * as cors from 'cors';

export const router: Router = express.Router();

const corsOptions = {
  origin: ['http://example1.com', 'http://example2.com'],
  optionsSuccessStatus: 200
};

router
  .use(cors(corsOptions))

  // login
  .get('/login', validateBody(loginValidator), LoginRoutes.login)

  // user
  .get('/user/:id', LoginRoutes.checkToken, validatePath(uuidValidator), UserRoutes.getById)
  .put('/user/:id', LoginRoutes.checkToken, validatePath(uuidValidator), validateBody(userValidator), UserRoutes.update)
  .delete('/user/:id', LoginRoutes.checkToken, validatePath(uuidValidator), UserRoutes.delete)
  .post('/user', LoginRoutes.checkToken, validateBody(userValidator), UserRoutes.create)
  .get('/user', LoginRoutes.checkToken, UserRoutes.getAutoSuggestUsers)

  // group
  .get('/group/:id', LoginRoutes.checkToken, validatePath(uuidValidator), GroupRoutes.getById)
  .put('/group/:id', LoginRoutes.checkToken, validatePath(uuidValidator), validateBody(groupValidator),
    GroupRoutes.update)
  .delete('/group/:id', LoginRoutes.checkToken, validatePath(uuidValidator), GroupRoutes.delete)
  .post('/group', LoginRoutes.checkToken, validateBody(groupValidator), GroupRoutes.create)
  .get('/group', LoginRoutes.checkToken, GroupRoutes.getAll)

  // user-group
  .get('/user-groups/:id', LoginRoutes.checkToken, validatePath(uuidValidator), UserGroupRoutes.getUserWithGroupsById)
  .get('/group-users/:id', LoginRoutes.checkToken, UserGroupRoutes.getGroupWithUsersById)
  .put('/group-users/:id', LoginRoutes.checkToken, validateBody(uuidArrayValidator), UserGroupRoutes.addUsersToGroup)
;

