import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

class UserController {
  async registration(
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response
  ) {
    try {
      const { username, password } = req.body;
      const userData = await userService.registration(username, password);

      if (!userData) {
        res.sendStatus(400);
        return;
      }

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: THIRTY_DAYS,
        httpOnly: true,
      });

      res.json(userData);
    } catch (error) {
      res.sendStatus(400);
      console.log('UserController - registration error', error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }
}

export const userController = new UserController();
