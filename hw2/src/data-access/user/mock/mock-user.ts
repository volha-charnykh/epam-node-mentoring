import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../models';

const userMockList: User[] = [];

export const createUser = (user: User): User => {
  const newUser = {
    id: uuidv4(),
    login: user.login,
    password: user.password,
    age: user.age,
    isDeleted: false
  };
  userMockList.push(newUser);
  return newUser;
};

export const updateUser = (id: string, user: User) => {
  const curUser = getUserById(id);
  if (!curUser) {
    return;
  }
  curUser.login = user.login;
  curUser.password = user.password;
  curUser.age = user.age;
  return curUser;
};

export const getUserById = (id: string) => {
  const foundUser = userMockList.find(el => el.id === id);
  if (foundUser && !foundUser.isDeleted) {
    return foundUser;
  }
};

export const getAutoSuggestUsers = (loginSubstring: string, limit: number) => {
  if (!loginSubstring || !limit) {
    return [];
  }
  const list = userMockList.filter(el => !el.isDeleted && el.login.startsWith(loginSubstring));
  list.sort(((a, b) => (a.login > b.login) ? 1 : -1));
  return list.length > limit ? list.slice(0, limit) : list;
};

export const markUserDeleted = (id: string) => {
  const curUser = getUserById(id);
  if (!curUser) {
    return;
  }
  curUser.isDeleted = true;
  return curUser.isDeleted;
};
