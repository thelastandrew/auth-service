import bcrypt from 'bcrypt';
import { UserModel } from '../models';
import { tokenService } from './token-service';
import { UserDto } from '../dtos';
import { ApiError } from '../exceptions';


class UserService {
  async registration(username: string, password: string) {
    const candidate = await UserModel.findOne({ username });

    if (candidate) {
      throw ApiError.BadRequest(`User ${username} already exists`);
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
