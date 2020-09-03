import { Schema, ValidationErrorItem } from '@hapi/joi';
import { Request, Response } from 'express';

const errorResponse = (schemaErrors: ValidationErrorItem[]) => {
  const errors = schemaErrors.map(error => {
    let { path, message } = error;
    return { path, message };
  });
  return {
    errors,
  };
};

const validateBySchema = (what: 'params' | 'body') => (schema: Schema) =>
  (req: Request, res: Response, next: (err?: any) => void) => {
    const { error } = schema.validate(req[what], {
      abortEarly: false,
      allowUnknown: false
    });
    console.log(error);
    if (error && error.isJoi) {
      res.status(400).json(errorResponse(error.details));
    } else {
      next();
    }
  };

export const validateBody  = validateBySchema('body');

export const validatePath = validateBySchema('params');
