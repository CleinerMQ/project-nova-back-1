import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (err) {
      throw err;
    }
    if (!user) {
      throw new UnauthorizedException(
        info?.message || 'Token inválido o ausente',
      );
    }
    return user;
  }
}
