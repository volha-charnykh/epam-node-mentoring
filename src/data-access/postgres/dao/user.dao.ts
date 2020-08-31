import { Model, Op } from 'sequelize';
import { UserModel } from '../models';
import { User } from '../../../models';

export const UserDao = {
  async create(user: User): Promise<User | undefined> {
    return await UserModel.create({
        login: user.login,
        password: user.password,
        age: user.age
      })
      .then((data: Model) => data ? data.get({ plain: true }) : undefined);
  },

  async getById(id: string): Promise<User | undefined> {
    return await UserModel.findOne({ where: { id, isDeleted: false } })
      .then((data: Model | null) => data ? data.get({ plain: true }) : undefined);
  },

  async update(id: string, user: User): Promise<User | undefined> {
    return await UserModel.update(
      {
        login: user.login,
        password: user.password,
        age: user.age
      },
      { where: { id, isDeleted: false }, returning: true })
      .then(([n, data]: [number, Model[]]) =>
        data && data[0] ? data[0].get({ plain: true }) : undefined);
  },

  async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<User[] | []> {
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
      })
      .then((data: Model[]) => data ? data.map(d => d.get({ plain: true })) : []);
  },

  async delete(id: string): Promise<boolean | undefined> {
    return await UserModel.update(
      {
        isDeleted: true
      },
      { where: { id } })
      .then(([n, data]: [number, Model[]]) =>
        data && data[0] ? data[0].get({ plain: true }) : undefined);
  }
};

