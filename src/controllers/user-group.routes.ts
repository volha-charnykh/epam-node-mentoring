import { Request, Response } from 'express';
import { UserGroupService } from '../services';

export const UserGroupRoutes = {
  getGroupWithUsersById: async (req: Request, res: Response) => {
    const group = await UserGroupService.getGroupWithUsersById(req.params.id)
      .catch(error => res.status(400).json({ error }));
    !!group ? res.json(group) : res.status(400).json({ error: 'Group not found' });
  },
  getUserWithGroupsById: async (req: Request, res: Response) => {
    const user = await UserGroupService.getUserWithGroupsById(req.params.id)
      .catch(error => res.status(400).json({ error }));
    !!user ? res.json(user) : res.status(400).json({ error: 'User not found' });
  },
  addUsersToGroup: async (req: Request, res: Response) => {
    const group = await UserGroupService.addUsersToGroup(req.params.id, req.body)
      .catch(error => res.status(400).json({ error }));
    !!group ? res.json(group) : res.status(400).json({ error: 'Group not found' });
  },
};
