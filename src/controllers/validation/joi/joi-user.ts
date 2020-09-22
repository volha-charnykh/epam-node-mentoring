import * as Joi from '@hapi/joi';

export const userValidator = Joi.object().keys({
  login: Joi.string().required().email(),
  password: Joi.string().required()
    .regex(/(([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))[a-zA-Z0-9]*/)
    .message('Password must contain letters and numbers'),
  age: Joi.number().min(4).max(130).required()
});

