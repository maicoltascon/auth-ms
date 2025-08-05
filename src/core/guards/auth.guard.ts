import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    if (!token.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token format');
    }

    
    const authToken = token.split(' ')[1];
    if (!authToken) {
      throw new UnauthorizedException('Token not provided');
    }

    return true; 
  }
}