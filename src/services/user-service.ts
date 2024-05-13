import bcrypt from 'bcrypt';
import { UserModel } from '../models';
import { tokenService } from './token-service';
import { UserDto } from '../dtos';

class UserService {
  async registration(username: string, password: string) {
    try {
      const candidate = await UserModel.findOne({ username });
      if (candidate) {
        throw new Error(`User ${username} already exists`);
      }

      const passwordHash = await bcrypt.hash(password, 4);
      const user = await UserModel.create({ username, password: passwordHash });

      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return { ...tokens, user: userDto };
    } catch (error) {
      console.log('UserService - registration error', error);
      throw error;
    }
  }
}

export const userService = new UserService();
