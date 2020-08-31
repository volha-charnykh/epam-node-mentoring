import { Request, Response } from 'express';
import { UserService } from '../services';

export const UserRoutes = {
  create: async (req: Request, res: Response) => {
    const user = await UserService.createUser(req.body)
      .catch(error => res.status(400).json({error}));
    !!user ? res.json(user) : res.status(400).json({error: 'User can\'t be added'});
  },
  update: async (req: Request, res: Response) => {
    const user = await UserService.updateUser(req.params.id, req.body)
      .catch(error => res.status(400).json({error}));
    !!user ? res.json(user) : res.status(400).json({error: 'User not found'});
  },
  getById: async (req: Request, res: Response) => {
    const user = await UserService.getUserById(req.params.id)
      .catch(error => res.status(400).json({error}));
    !!user ? res.json(user) : res.status(400).json({error: 'User not found'});
  },
  getAutoSuggestUsers: async (req: Request, res: Response) => {
    let { loginSubstring, limit } = req.query;
    const users = await UserService.getAutoSuggestUsers(loginSubstring as string, Number(limit))
      .catch(error => res.status(400).json({error}));
    res.json(users || []);
  },
  delete: async (req: Request, res: Response) => {
    const deleted = await UserService.markUserDeleted(req.params.id)
      .catch(error => res.status(400).json({error}));
    deleted ? res.json('User deleted') : res.status(400).json({error: 'User not found'});
  }
};
