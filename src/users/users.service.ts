import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getActiveUsers(timeRange: number): Promise<any[]> {
    const sinceTime = new Date(Date.now() - timeRange * 60 * 60 * 1000);

    const activeUsers = await this.userModel.find({
      lastActivity: { $gt: sinceTime },
    });

    return activeUsers.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      lastActivity: user.lastActivity,
    }));
  }
}
