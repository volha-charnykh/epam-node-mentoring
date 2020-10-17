import * as Joi from '@hapi/joi';

export const loginValidator = Joi.object().keys({
  login: Joi.string().required().email(),
  password: Joi.string().required()
    .regex(/(([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))[a-zA-Z0-9]*/)
    .message('Invalid login/password combination')
});
