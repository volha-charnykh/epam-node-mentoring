import * as bcrypt from 'bcrypt';
import { UserDao } from '../data-access';
import { User } from '../models';

export const UserService = {
  createUser(user: User): Promise<User | null> {
    return bcrypt.hash(user.password, 10)
      .then((hashedPassword) =>
        UserDao.create({
          login: user.login,
          password: hashedPassword,
          age: user.age
        }));
  },

  getUserById(id: string): Promise<User | null> {
    return UserDao.getById(id);
  },

  updateUser(id: string, user: User): Promise<User | null> {
    return UserDao.update(id, user);
  },

  async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<User[]> {
    if (!loginSubstring || !limit) {
      return [];
    }
    return UserDao.getAutoSuggestUsers(loginSubstring, limit);
  },

  markUserDeleted(id: string): Promise<boolean> {
    return UserDao.delete(id);
  }
};

