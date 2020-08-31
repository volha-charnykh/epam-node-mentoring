import * as bcrypt from 'bcrypt';
import { UserDao } from '../data-access';
import { User } from '../models';

export const UserService = {
  async createUser(user: User): Promise<User | undefined> {
    return await bcrypt.hash(user.password, 10)
      .then((hashedPassword) =>
        UserDao.create({
          login: user.login,
          password: hashedPassword,
          age: user.age
        }));
  },

  async getUserById(id: string): Promise<User | undefined> {
    return await UserDao.getById(id);
  },

  async updateUser(id: string, user: User): Promise<User | undefined> {
    return await UserDao.update(id, user);
  },

  async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<User[] | []> {
    if (!loginSubstring || !limit) {
      return Promise.resolve([]);
    }
    return await UserDao.getAutoSuggestUsers(loginSubstring, limit);
  },

  async markUserDeleted(id: string): Promise<boolean | undefined> {
    return await UserDao.delete(id);
  }
};

