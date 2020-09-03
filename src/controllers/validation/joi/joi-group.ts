import * as Joi from '@hapi/joi';
import { Permissions } from '../../../models';

export const groupValidator = Joi.object().keys({
  name: Joi.string().required(),
  permissions: Joi.array().required().items(Joi.string().valid(...Permissions))
});

