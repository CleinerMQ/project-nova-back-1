import { Module } from '@nestjs/common';
import { AuthPermissionsService } from './authPermissions.service';
import { AuthPermissionsController } from './authPermissions.controller';
import { ServicesModule } from 'src/common/services/services.module';

@Module({
  controllers: [AuthPermissionsController],
  providers: [AuthPermissionsService],
  imports: [ServicesModule],
})
export class AuthPermissionsModule {}
