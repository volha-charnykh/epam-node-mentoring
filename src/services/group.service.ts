import { GroupDao } from '../data-access';
import { logObjectMethods } from '../logger/wrappers/log-object-methods';
import { Group } from '../models';

export const GroupService = logObjectMethods('group-service', {
  createGroup(group: Group): Promise<Group | null> {
    return GroupDao.create(group);
  },

  getGroupById(id: string): Promise<Group | null> {
    return GroupDao.getById(id);
  },

  updateGroup(id: string, group: Group): Promise<Group | null> {
    return GroupDao.update(id, group);
  },

  getAllGroups(): Promise<Group[] | []> {
    return GroupDao.getAll();
  },

  deleteGroup(id: string): Promise<boolean> {
    return GroupDao.delete(id);
  },
});

