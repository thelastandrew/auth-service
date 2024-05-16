import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';
import { tryCatch } from '../utils';
import { HTTP_STATUSES, THIRTY_DAYS_NUMBER } from '../constants';

class UserController {
  async registration(
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response,
  ) {
    const { username, password } = req.body;
    const userData = await userService.registration(username, password);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: THIRTY_DAYS_NUMBER,
      httpOnly: true,
    });

    res.status(HTTP_STATUSES.CREATED_201).json(userData);
  }

  async login(
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response,
  ) {
    const { username, password } = req.body;
    const userData = await userService.login(username, password);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: THIRTY_DAYS_NUMBER,
      httpOnly: true,
    });

    res.json(userData);
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
