import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';
import { tryCatch } from '../utils';
import { HTTP_STATUSES } from '../constants';
import { validationBadRequest } from '../middlewares';

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

class UserController {
  async registration(
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response,
    next: NextFunction
  ) {
    const error = validationBadRequest(req, 'Request body validation error');

    if (error) {
      return next(error);
    }

    const { username, password } = req.body;
    const userData = await userService.registration(username, password);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: THIRTY_DAYS,
      httpOnly: true,
    });

    res.status(HTTP_STATUSES.CREATED_201).json(userData);
  }

  async login(req: Request, res: Response) {
  }

  async logout(req: Request, res: Response) {
  }

  async refresh(req: Request, res: Response) {
  }

  async getUsers(req: Request, res: Response) {
  }
}

const userController = new UserController();

export const registration = tryCatch(userController.registration);
export const login = tryCatch(userController.login);
export const logout = tryCatch(userController.logout);
export const refresh = tryCatch(userController.refresh);
export const getUsers = tryCatch(userController.getUsers);
