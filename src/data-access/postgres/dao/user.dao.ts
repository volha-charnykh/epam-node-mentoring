import { Op } from 'sequelize';
import { User } from '../../../models';
import { UserModel } from '../models';
import { UserGroupDao } from './user-group.dao';

export const UserDao = {
  async create(user: User): Promise<User | null> {
    return await UserModel.create({
      login: user.login,
      password: user.password,
      age: user.age
    });
  },

  async getById(id: string): Promise<User | null> {
    return await UserModel.findOne({ where: { id, isDeleted: false } });
  },

  async update(id: string, user: User): Promise<User | null> {
    return await UserModel.update(
      {
        login: user.login,
        password: user.password,
        age: user.age
      },
      { where: { id, isDeleted: false }, returning: true })
      .then(([n, data]: [number, User[]]) =>
        n === 1 ? data[0] : null);
  },

  async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<User[]> {
    return await UserModel.findAll(
      {
        limit,
        where: {
          isDeleted: false,
          login: {
            [Op.like]: loginSubstring + '%'
          }
        },
        order: ['login']
      });
  },

  async delete(id: string): Promise<any> {
    return UserGroupDao.deleteUserById(id);
  }
};

