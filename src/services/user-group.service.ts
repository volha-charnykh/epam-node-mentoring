import { UserGroupDao } from '../data-access';
import { Group, User } from '../models';

export const UserGroupService = {
  getGroupWithUsersById(id: string): Promise<Group | null> {
    return UserGroupDao.getGroupWithUsersById(id);
  },
  getUserWithGroupsById(id: string): Promise<User | null> {
    return UserGroupDao.getUserWithGroupsById(id);
  },
  addUsersToGroup(groupId: string, userIds: string[]): Promise<Group | null> {
    return UserGroupDao.addUsersToGroup(groupId, userIds);
  },
};

