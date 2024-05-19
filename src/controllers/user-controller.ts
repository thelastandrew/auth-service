import { Request, Response } from 'express';
import { userService } from '../services';
import { tryCatch } from '../utils';
import { HTTP_STATUSES, REFRESH_TOKEN, THIRTY_DAYS_NUMBER } from '../constants';

class UserController {
  async registration(
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response
  ) {
    const { username, password } = req.body;
    const userData = await userService.registration(username, password);

    res.cookie(REFRESH_TOKEN, userData.refreshToken, {
      maxAge: THIRTY_DAYS_NUMBER,
      httpOnly: true,
    });

    res.status(HTTP_STATUSES.CREATED_201).json(userData);
  }

  async login(
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response
  ) {
    const { username, password } = req.body;
    const userData = await userService.login(username, password);

    res.cookie(REFRESH_TOKEN, userData.refreshToken, {
      maxAge: THIRTY_DAYS_NUMBER,
      httpOnly: true,
    });

    res.json(userData);
  }

  async logout(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    await userService.logout(refreshToken);
    res.clearCookie(REFRESH_TOKEN);

    res.sendStatus(HTTP_STATUSES.OK_200);
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const userData = await userService.refresh(refreshToken);

    res.cookie(REFRESH_TOKEN, userData.refreshToken, {
      maxAge: THIRTY_DAYS_NUMBER,
      httpOnly: true,
    });

    res.status(HTTP_STATUSES.CREATED_201).json(userData);
  }

  async getUsers(req: Request, res: Response) {
    const users = await userService.getUsers();
    res.json(users);
  }

  async getUserById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const foundUser = await userService.getUserById(id);
    res.json(foundUser);
  }
}

const userController = new UserController();

export const registration = tryCatch(userController.registration);
export const login = tryCatch(userController.login);
export const logout = tryCatch(userController.logout);
export const refresh = tryCatch(userController.refresh);
export const getUsers = tryCatch(userController.getUsers);
export const getUserById = tryCatch(userController.getUserById);
