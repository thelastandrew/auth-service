import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions';
import { HTTP_STATUSES } from '../constants';

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
