import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

interface User {
  id: number;
  email: string;
  password: string;
  lastActivity: Date;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { id: 1, email: 'user@example.com', password: 'password123', lastActivity: new Date() },
  ];
  private currentId = 2;

  async createUser(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: this.currentId++, email, password: hashedPassword, lastActivity: new Date() };
    this.users.push(newUser);
    return newUser;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
  async getActiveUsers (): Promise<User[]> {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    // If you want to simulate active users based on an in-memory array
    return this.users.filter(user => {
      // Add a lastActivity property to your User type/interface
      // For now, this is just a placeholder logic
      return user.lastActivity && user.lastActivity >= twentyFourHoursAgo;
    });
  }
}
