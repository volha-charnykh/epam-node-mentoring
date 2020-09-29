import { Request, Response } from 'express';
import { logger } from '../logger';
import { functionLogFormatter } from '../logger/formatter';
import { GroupService } from '../services';

export const GroupRoutes = {
  create: (req: Request, res: Response) => {
    return GroupService.createGroup(req.body)
      .then(group =>
        !!group ? res.status(201).json(group) : res.status(400).json({ error: 'Group can\'t be added' })
      )
      .catch(error => {
        logger.error(functionLogFormatter('group-controller', 'create',
          [req.body], error));
        res.status(400).json({ error: error.message });
      });
  },

  update: (req: Request, res: Response) => {
    return GroupService.updateGroup(req.params.id, req.body)
      .then(group =>
        !!group ? res.json(group) : res.status(404).json({ error: 'Group not found' })
      )
      .catch(error => {
        logger.error(functionLogFormatter('group-controller', 'update',
          [req.params.id, req.body], error));
        res.status(400).json({ error: error.message });
      });
  },

  getById: (req: Request, res: Response) => {
    return GroupService.getGroupById(req.params.id)
      .then(group =>
        !!group ? res.json(group) : res.status(404).json({ error: 'Group not found' })
      )
      .catch(error => {
        logger.error(functionLogFormatter('group-controller', 'getById',
          [req.params.id], error));
        res.status(400).json({ error: error.message });
      });
  },

  getAll: (req: Request, res: Response) => {
    return GroupService.getAllGroups()
      .then(groups =>
        res.json(groups || [])
      )
      .catch(error => {
        logger.error(functionLogFormatter('group-controller', 'getAll',
          [], error));
        res.status(400).json({ error: error.message });
      });
  },

  delete: (req: Request, res: Response) => {
    return GroupService.deleteGroup(req.params.id)
      .then(deleted =>
        deleted ? res.json('Group deleted') : res.status(404).json({ error: 'Group not found' })
      )
      .catch(error => {
        logger.error(functionLogFormatter('group-controller', 'delete',
          [req.params.id], error));
        res.status(400).json({ error: error.message });
      });
  },
};
