import { Schema, Model, model } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
}

const UserSchema = new Schema<IUser, Model<IUser>>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<IUser>('User', UserSchema);
export type UserType = ReturnType<(typeof UserModel)['hydrate']>;
