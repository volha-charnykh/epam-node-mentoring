import { GroupDao } from '../data-access';
import { Group } from '../models';

export const GroupService = {
  async createGroup(group: Group): Promise<Group | null> {
    return await GroupDao.create(group);
  },

  async getGroupById(id: string): Promise<Group | null> {
    return await GroupDao.getById(id);
  },

  async updateGroup(id: string, group: Group): Promise<Group | null> {
    return await GroupDao.update(id, group);
  },

  async getAllGroups(): Promise<Group[] | []> {
    return await GroupDao.getAll();
  },

  async deleteGroup(id: string): Promise<boolean> {
    return await GroupDao.delete(id);
  },
};

