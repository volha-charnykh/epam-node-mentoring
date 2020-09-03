import * as express from 'express';
import { Router } from 'express';
import { GroupRoutes } from './group.routes';
import { userValidator, validateBody, uuidValidator, validatePath, groupValidator, uuidArrayValidator } from './validation';
import { UserRoutes } from './user-routes';
import { UserGroupRoutes } from './user-group.routes';

export const router: Router = express.Router();

router
  // user
  .get('/user/:id', validatePath(uuidValidator), UserRoutes.getById)
  .put('/user/:id', validatePath(uuidValidator), validateBody(userValidator), UserRoutes.update)
  .delete('/user/:id', validatePath(uuidValidator), UserRoutes.delete)
  .post('/user', validateBody(userValidator), UserRoutes.create)
  .get('/user', UserRoutes.getAutoSuggestUsers)

  // group

  .get('/group/:id', validatePath(uuidValidator),  GroupRoutes.getById)
  .put('/group/:id', validatePath(uuidValidator),  validateBody(groupValidator), GroupRoutes.update)
  .delete('/group/:id', validatePath(uuidValidator),  GroupRoutes.delete)
  .post('/group', validateBody(groupValidator), GroupRoutes.create)
  .get('/group', GroupRoutes.getAll)

  // user-group
  .get('/user-groups/:id', validatePath(uuidValidator),  UserGroupRoutes.getUserWithGroupsById)
  .get('/group-users/:id', UserGroupRoutes.getGroupWithUsersById)
  .put('/group-users/:id', validateBody(uuidArrayValidator), UserGroupRoutes.addUsersToGroup)
;

