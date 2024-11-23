import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    try {
      const publicKey = process.env.PUBLIC_KEY; // Ensure PUBLIC_KEY is set in your environment
      const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      request.user = decoded; // Attach user data to the request object
      return true;
    } catch (err) {
      throw new UnauthorizedException(`Invalid or expired token ${err}`);
    }
  }
}
