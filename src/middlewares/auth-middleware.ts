import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions';
import { tokenService } from '../services';
import { UserDto } from '../dtos';
import { tryCatch } from '../utils';

export interface RequestWithUserFeild extends Request {
  user: UserDto;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    throw ApiError.Unauthorized();
  }

  const accessToken = authorizationHeader.split(' ')[1]; // Bearer eyJhbGciO...

  if (!accessToken) {
    throw ApiError.Unauthorized();
  }

  const userData = tokenService.validateAccessToken(accessToken);

  if (!userData) {
    throw ApiError.Unauthorized();
  }

  next();
};

export const authMiddleware = tryCatch(auth);
