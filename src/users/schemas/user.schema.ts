import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  id: string;
  name: string;
  email: string;
  lastActivity: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
