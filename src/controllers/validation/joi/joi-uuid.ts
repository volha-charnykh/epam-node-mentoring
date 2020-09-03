import * as Joi from '@hapi/joi';

export const uuid = Joi.string().required()
  .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i);

export const uuidValidator = Joi.object().keys({
  id: uuid.message('Invalid user id. Must be valid UUID')
});

export const uuidArrayValidator = Joi.array().items(uuid).required();
