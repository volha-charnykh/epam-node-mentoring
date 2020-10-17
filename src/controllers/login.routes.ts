import { Request, Response } from 'express';
import { logger } from '../logger';
import { functionLogFormatter } from '../logger/formatter';
import { LoginService } from '../services/login.service';

export const LoginRoutes = {
  login: (req: Request, res: Response) => {
    return LoginService.login(req.body)
      .then(jwt =>
        !!jwt ?
          res.status(201).json({ accessToken: jwt }) :
          res.status(401).json({ error: 'Bad username/password combination' })
      ).catch(error => {
        logger.error(functionLogFormatter('login-controller', 'login',
          [req.body], error));
        res.status(400).json({ error: error.message });
      });
  },

  checkToken: (req: Request, res: Response, next) => {
    let token = req.headers.authorization as string;
    if (token) {
      token = token.split(' ')[1];
      return LoginService.checkToken(token)
        .then((result) => !!result ? next() : res.status(403).json({error: 'Access denied'}))
        .catch((error) =>  res.status(400).json({ error: error.message }));
    } else {
      res.status(401).json({error: 'Unauthorized Error'});
    }
  }
};
