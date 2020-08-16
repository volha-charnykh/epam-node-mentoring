import { Request, Response } from 'express';
import { createUser, getAutoSuggestUsers, getUserById, markUserDeleted, updateUser } from '../../../data-access';

export const userRoutes = {
  create: (req: Request, res: Response) => {
    const user = createUser(req.body);
    !!user ? res.json(user) : res.status(400).json({error: 'User can\'t be added'});
  },
  update: (req: Request, res: Response) => {
    const user = updateUser(req.params.id, req.body);
    !!user ? res.json(user) : res.status(400).json({error: 'User not found'});
  },
  getById: (req: Request, res: Response) => {
    const user = getUserById(req.params.id);
    !!user ? res.json(user) : res.status(400).json({error: 'User not found'});
  },
  getAutoSuggestUsers: (req: Request, res: Response) => {
    let { loginSubstring, limit } = req.query;
    const users = getAutoSuggestUsers(loginSubstring as string, Number(limit));
    res.json(users || []);
  },
  delete: (req: Request, res: Response) => {
    const deleted = markUserDeleted(req.params.id);
    deleted ? res.json('User deleted') : res.status(400).json({error: 'User not found'});
  }
};
