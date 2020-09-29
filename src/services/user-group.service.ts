import { UserGroupDao } from '../data-access';
import { logObjectMethods } from '../logger/wrappers/log-object-methods';
import { Group, User } from '../models';

export const UserGroupService = logObjectMethods('user-group-service', {
  getGroupWithUsersById(id: string): Promise<Group | null> {
    return UserGroupDao.getGroupWithUsersById(id);
  },
  getUserWithGroupsById(id: string): Promise<User | null> {
    return UserGroupDao.getUserWithGroupsById(id);
  },
  addUsersToGroup(groupId: string, userIds: string[]): Promise<Group | null> {
    return UserGroupDao.addUsersToGroup(groupId, userIds);
  },
});

