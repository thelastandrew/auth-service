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

  async login(username: string, password: string) {
    const user = await UserModel.findOne({ username });
    if (!user) {
      // logically it's 404, but for security we throw 400
      throw ApiError.BadRequest('username or password incorrect');
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest('username or password incorrect');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken?: string) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.Unauthorized();
    }

    const user = await UserModel.findById(userData.id);

    if (!user) {
      throw ApiError.NotFound('User not found');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getUsers() {
    return await UserModel.find();
  }

  async getUserById(id: string) {
    const foundUser = await UserModel.findById(id);
    if (!foundUser) {
      throw ApiError.NotFound('User not found');
    }

    return foundUser;
  }
}

export const userService = new UserService();
