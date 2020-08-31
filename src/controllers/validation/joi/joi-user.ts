import * as Joi from '@hapi/joi';

export const userValidator = Joi.object().keys({
  login: Joi.string().required().email(),
  password: Joi.string().required()
    .regex(/(([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))[a-zA-Z0-9]*/)
    .message('Password must contain letters and numbers'),
  age: Joi.number().min(4).max(130).required()
});

export const userIdValidator = Joi.object().keys({
  id: Joi.string().required()
    .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    .message('Invalid user id. Must be valid UUID')
});

