import { Group, User } from '../../../models';
import sequelize from '../connector';
import { GroupModel, UserModel } from '../models';

export const UserGroupDao = {
  getGroupWithUsersById(id: string): Promise<Group | null> {
    return GroupModel.findByPk(id, {
      include: [{
        model: UserModel,
        as: 'users',
        attributes: ['id', 'login', 'age'],
        through: {
          attributes: [],
        },
        where: { isDeleted: false }
      }]
    });
  },

  getUserWithGroupsById(id: string): Promise<User | null> {
    return UserModel.findOne({
      where: { id, isDeleted: false },
      include: [{
        model: GroupModel,
        as: 'groups',
        attributes: ['id', 'name', 'permissions'],
        through: {
          attributes: [],
        }
      }]
    });
  },

  async addUsersToGroup(groupId: string, userIds: string[]): Promise<Group | null> {
    const t = await sequelize.transaction();

    try {
      let group: any = await GroupModel.findByPk(groupId);

      if (!group) {
        return null;
      }

      const users: any = await UserModel.findAll({ where: { id: userIds } });

      if (!users) {
        return null;
      }

      await group.addUsers(users, { where: { isDeleted: false }, transaction: t });
      await t.commit();

      return await this.getGroupWithUsersById(groupId);

    } catch (error) {
      await t.rollback();
      return null;
    }
  },

  async deleteUserById(id: string): Promise<boolean> {
    const t = await sequelize.transaction();

    try {
      const user: any = await UserModel.findOne({
        where: { id, isDeleted: false },
        include: [{
          model: GroupModel,
          as: 'groups',
          attributes: ['id'],
          through: {
            attributes: [],
          }
        }],
      });
      if (!user) {
        return false;
      }

      await user.update({ isDeleted: true }, { transaction: t });
      await user.removeGroups([...user.groups], { transaction: t });

      await t.commit();
    } catch (error) {
      await t.rollback();
      return false;
    }
    return true;
  }
};

