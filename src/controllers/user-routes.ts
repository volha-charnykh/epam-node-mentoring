import { Request, Response } from 'express';
import { logger } from '../logger';
import { functionLogFormatter } from '../logger/formatter';
import { UserService } from '../services';

export const UserRoutes = {
  create: (req: Request, res: Response) => {
    return UserService.createUser(req.body)
      .then(user =>
        !!user ?
          res.status(201).json(user) :
          res.status(400).json({ error: 'User can\'t be added' })
      ).catch(error => {
        logger.error(functionLogFormatter('user-controller', 'create',
          [req.body], error));
        res.status(400).json({ error: error.message });
      });
  },

  update: (req: Request, res: Response) => {
    return UserService.updateUser(req.params.id, req.body)
      .then(user =>
        !!user ?
          res.json(user) :
          res.status(404).json({ error: 'User not found' }))
      .catch(error => {
        logger.error(functionLogFormatter('user-controller', 'update', [req.params.id, req.body], error));
        res.status(400).json({ error: error.message });
      });
  },

  getById: (req: Request, res: Response) => {
    return UserService.getUserById(req.params.id)
      .then(user =>
        !!user ?
          res.json(user) :
          res.status(404).json({ error: 'User not found' }))
      .catch(error => {
        logger.error(functionLogFormatter('user-controller', 'getById', [req.params.id], error));
        res.status(400).json({ error: error.message });
      });
  },

  getAutoSuggestUsers: (req: Request, res: Response) => {
    let { loginSubstring, limit } = req.query;
    return UserService.getAutoSuggestUsers(loginSubstring as string, Number(limit))
      .then(users => res.json(users || []))
      .catch(error => {
        logger.error(functionLogFormatter('user-controller', 'getAutoSuggestUsers',
          [loginSubstring as string, Number(limit)], error));
        res.status(400).json({ error: error.message });
      });
  },

  delete: (req: Request, res: Response) => {
    return UserService.markUserDeleted(req.params.id)
      .then(deleted =>
        deleted ?
          res.json('User deleted') :
          res.status(404).json({ error: 'User not found' })
      )
      .catch(error => {
        logger.error(functionLogFormatter('user-controller', 'delete', [req.params.id], error));
        res.status(400).json({ error: error.message });
      });
  }
};
