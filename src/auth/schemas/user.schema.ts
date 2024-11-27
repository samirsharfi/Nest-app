import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export interface User extends Document {
  email: string;
  password: string;
}
