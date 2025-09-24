import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import { ServicesModule } from 'src/common/services/services.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ServicesModule,
    JwtModule.register({
      global: true, // opcional, si quieres usarlo en otros módulos
      secret: envs.jwtSecret,
      signOptions: { expiresIn: envs.jwtExpiresIn },
    }),
  ],
})
export class AuthModule {}
