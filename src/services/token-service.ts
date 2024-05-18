import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { tokenModel } from '../models';
import config from '../config';
import { UserDto } from '../dtos';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from '../constants';

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = config;

class TokenService {
  generateTokens(payload: UserDto) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  validateRefreshToken(token: string) {
    try {
      const userData = <UserDto>jwt.verify(token, JWT_REFRESH_SECRET);

      return userData;
    } catch (err) {
      return null;
    }
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, JWT_ACCESS_SECRET);

      return userData;
    } catch (err) {
      return null;
    }
  }

  async saveToken(userId: Types.ObjectId, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await tokenModel.create({ user: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken: string) {
    await tokenModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken: string) {
    const tokenData = await tokenModel.findOne({ refreshToken });

    return tokenData;
  }
}

export const tokenService = new TokenService();
