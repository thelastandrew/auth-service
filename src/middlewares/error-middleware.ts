import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions';
import { HTTP_STATUSES } from '../constants';
import { tryCatch } from '../utils';

type ErrorResponse = {
  message: string;
  errors?: any[];
}

export const errorHandler = (
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const { message } = err;
  if (err instanceof ApiError) {
    const { errors } = err;
    const response: ErrorResponse = { message };
    if (errors.length > 0) response.errors = errors;

    return res.status(err.status).json(response);
  }

  return res.status(HTTP_STATUSES.UNEXPECTED_500).json({ message });
};

export const validationBadRequest = (req: Request, message: string) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return ApiError.BadRequest(message, result.array());
    }
  };

const bodyValidation = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw ApiError.BadRequest('Request body validation error', errors.array());
  }

  next();
}

export const bodyValidationMiddleware = tryCatch(bodyValidation);