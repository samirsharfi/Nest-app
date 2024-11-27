import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import * as fs from 'fs';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      privateKey: fs.readFileSync(
        process.env.JWT_PRIVATE_KEY || './keys/private.key',
      ),
      publicKey: fs.readFileSync(
        process.env.JWT_PUBLIC_KEY || './keys/public.key',
      ),
      signOptions: { algorithm: 'RS256', expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy],
})
export class AuthModule {}
