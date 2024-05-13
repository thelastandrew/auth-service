import { Types } from 'mongoose';
import { UserType } from '../models';

export class UserDto {
  id: Types.ObjectId;
  username: string;
  password: string;

  constructor(model: UserType) {
    this.id = model._id;
    this.username = model.username;
    this.password = model.password;
  }
}
