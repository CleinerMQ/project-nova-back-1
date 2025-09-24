import { Module } from '@nestjs/common';
import { AuthUserService } from './authUser.service';
import { AuthUserController } from './authUser.controller';
import { ServicesModule } from 'src/common/services/services.module';

@Module({
  controllers: [AuthUserController],
  providers: [AuthUserService],
  exports: [AuthUserService],
  imports: [ServicesModule],
})
export class AuthUserModule {}
