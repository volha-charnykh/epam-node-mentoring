import * as Joi from '@hapi/joi';
import { uuid } from './joi-uuid';


export const userValidator = Joi.object().keys({
  login: Joi.string().required().email(),
  password: uuid.message('Password must contain letters and numbers'),
  age: Joi.number().min(4).max(130).required()
});

