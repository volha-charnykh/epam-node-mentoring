import { UserGroupDao } from '../data-access';
import { Group, User } from '../models';

export const UserGroupService = {
  async getGroupWithUsersById(id: string): Promise<Group | null> {
    return await UserGroupDao.getGroupWithUsersById(id);
  },
  async getUserWithGroupsById(id: string): Promise<User | null> {
    return await UserGroupDao.getUserWithGroupsById(id);
  },
  async addUsersToGroup(groupId: string, userIds: string[]): Promise<Group | null> {
    return await UserGroupDao.addUsersToGroup(groupId, userIds);
  },
};

