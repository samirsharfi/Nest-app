import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate the user by email and password
  async validateUser(email: string, password: string): Promise<LoginDto> {
    const user = await this.userService.findUserByEmail(email);

    if (
      user &&
      (await bcrypt.compare(password, await bcrypt.hash(user.password, 10)))
    ) {
      return user;
    }
    return null;
  }

  // Generate JWT token
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
