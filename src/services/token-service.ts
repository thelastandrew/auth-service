import jwt from 'jsonwebtoken';
import { tokenModel } from '../models';
import config from '../config';
import { UserDto } from '../dtos';
import { Types } from 'mongoose';

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = config;

class TokenService {
  generateTokens(payload: UserDto) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: '10m',
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  async saveToken(userId: Types.ObjectId, refreshToken: string) {
    try {
      const tokenData = await tokenModel.findOne({ user: userId });
      if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
      }

      const token = await tokenModel.create({ user: userId, refreshToken });

      return token;
    } catch (error) {
      console.log('saveToken error', error);
    }
  }
}

export const tokenService = new TokenService();
