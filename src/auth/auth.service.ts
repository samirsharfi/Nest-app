import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor(private readonly configService: ConfigService) {
    this.privateKey = this.configService.get<string>('PRIVATE_KEY');
    this.publicKey = this.configService.get<string>('PUBLIC_KEY');
  }

  async validateUser(email: string, password: string): Promise<any> {
    // Replace with your database call
    const user = {
      email: 'user@example.com',
      passwordHash: await bcrypt.hash('password123', 10),
    }; // Mocked user

    if (!user || user.email !== email) {
      return null; // User not found or email mismatch
    }
    console.log('Email:', email);
    console.log('Password:', password);

    if (!user) {
      console.log('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      console.log('Password mismatch');
    }

    return { id: 1, email: user.email }; // Valid user
  }

  generateJwtToken(user: any): string {
    const payload = { sub: user.id, email: user.email };
    return jwt.sign(payload, this.privateKey, {
      algorithm: 'RS256',
      expiresIn: '1h',
    });
  }
}
