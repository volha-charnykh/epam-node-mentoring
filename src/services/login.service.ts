import * as bcrypt from 'bcrypt';
import { UserDao } from '../data-access';
import { logger } from '../logger';
import { logObjectMethods } from '../logger/wrappers/log-object-methods';
import { sign, verify } from 'jsonwebtoken';
import config from '../config';

export const LoginService = logObjectMethods('login-service', {
  login({ login, password }: { login: string, password: string }): Promise<string | null> {
    return UserDao.findByLogin(login)
      .then(async user => {
        if (!user) {
          return null;
        }
       const isOk = await bcrypt.compare(password, user.password);
        return isOk ? sign({ login, password }, config.jwtTokenSecret) : null;
      });
  },

  async checkToken(token: string): Promise<any> {
    return verify(token, config.jwtTokenSecret, (error) => {
      logger.info(error);
      return !error;
    });
  }
});

