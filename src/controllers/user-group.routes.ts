import { Request, Response } from 'express';
import { logger } from '../logger';
import { functionLogFormatter } from '../logger/formatter';
import { UserGroupService } from '../services';

export const UserGroupRoutes = {
  getGroupWithUsersById: (req: Request, res: Response) => {
    return UserGroupService.getGroupWithUsersById(req.params.id)
      .then(group =>
        !!group ? res.json(group) : res.status(404).json({ error: 'Group not found' })
      )
      .catch(error => {
        logger.error(functionLogFormatter('user-group-controller', 'getGroupWithUsersById',
          [req.params.id], error));
        res.status(400).json({ error: error.message });
      });
  },

  getUserWithGroupsById: (req: Request, res: Response) => {
    return UserGroupService.getUserWithGroupsById(req.params.id)
      .then(user =>
        !!user ? res.json(user) : res.status(404).json({ error: 'User not found' })
      )
      .catch(error => {
        logger.error(functionLogFormatter('user-group-controller', 'getUserWithGroupsById',
          [req.params.id], error));
        res.status(400).json({ error: error.message });
      });
  },

  addUsersToGroup: (req: Request, res: Response) => {
    return UserGroupService.addUsersToGroup(req.params.id, req.body)
      .then(group =>
        !!group ? res.json(group) : res.status(404).json({ error: 'Group not found' })
      )
      .catch(error => {
        logger.error(functionLogFormatter('user-group-controller', 'addUsersToGroup',
          [req.params.id, req.body], error));
        res.status(400).json({ error: error.message });
      });
  },
};
