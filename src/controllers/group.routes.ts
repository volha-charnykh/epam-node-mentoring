import { Request, Response } from 'express';
import { GroupService } from '../services';

export const GroupRoutes = {
  create: async (req: Request, res: Response) => {
    const group = await GroupService.createGroup(req.body)
      .catch(error => res.status(400).json({error}));
    !!group ? res.json(group) : res.status(400).json({error: 'Group can\'t be added'});
  },
  update: async (req: Request, res: Response) => {
    const group = await GroupService.updateGroup(req.params.id, req.body)
      .catch(error => res.status(400).json({error}));
    !!group ? res.json(group) : res.status(400).json({error: 'Group not found'});
  },
  getById: async (req: Request, res: Response) => {
    const group = await GroupService.getGroupById(req.params.id)
      .catch(error => res.status(400).json({error}));
    !!group ? res.json(group) : res.status(400).json({error: 'Group not found'});
  },
  getAll: async (req: Request, res: Response) => {
    const groups = await GroupService.getAllGroups()
      .catch(error => res.status(400).json({error}));
    res.json(groups || []);
  },
  delete: async (req: Request, res: Response) => {
    const deleted = await GroupService.deleteGroup(req.params.id)
      .catch(error => res.status(400).json({error}));
    deleted ? res.json('Group deleted') : res.status(400).json({error: 'Group not found'});
  },
};
