import { Request, Response } from 'express';
import * as joi from 'express-joi-validation';
import { ExpressJoiError } from 'express-joi-validation';

export const validator = joi.createValidator({
  passError: true
});

export const errorHandler =
  (err: ExpressJoiError | any, req: Request, res: Response, next: (err?: any) => void) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      type: err.type,
      message: err.error.toString()
    });
  } else {
    res.status(500);
  }
};
