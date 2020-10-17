import { Op } from 'sequelize';
import { User } from '../../../models';
import { UserModel } from '../models';
import { UserGroupDao } from './user-group.dao';

export const UserDao = {
  create(user: User): Promise<User | null> {
    return UserModel.create({
      login: user.login,
      password: user.password,
      age: user.age
    });
  },

  getById(id: string): Promise<User | null> {
    return UserModel.findOne({ where: { id, isDeleted: false } });
  },

  update(id: string, user: User): Promise<User | null> {
    return UserModel.update(
      {
        login: user.login,
        password: user.password,
        age: user.age
      },
      { where: { id, isDeleted: false }, returning: true })
      .then(([n, data]: [number, User[]]) =>
        n === 1 ? data[0] : null);
  },

  getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<User[]> {
    return UserModel.findAll(
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

  delete(id: string): Promise<any> {
    return UserGroupDao.deleteUserById(id);
  },

  findByLogin(login: string): Promise<User | null> {
    return UserModel.findOne({ where: { login, isDeleted: false } });
  }
};

