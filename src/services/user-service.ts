import bcrypt from 'bcrypt';
import { UserModel } from '../models';
import { tokenService } from './token-service';
import { UserDto } from '../dtos';
import { ApiError } from '../middlewares';

class UserService {
  async registration(username: string, password: string) {
    const candidate = await UserModel.findOne({ username });

    if (candidate) {
      const error: ApiError = new Error(`User ${username} already exists`);
      error.status = 401;

      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 4);
    const user = await UserModel.create({ username, password: passwordHash });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

export const userService = new UserService();
