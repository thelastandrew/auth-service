import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { tokenModel } from '../models';
import config from '../config';
import { UserDto } from '../dtos';
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../constants';

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

  async saveToken(userId: Types.ObjectId, refreshToken: string) {
      const tokenData = await tokenModel.findOne({ user: userId });
      if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
      }

      const token = await tokenModel.create({ user: userId, refreshToken });

      return token;
  }
}

export const tokenService = new TokenService();
