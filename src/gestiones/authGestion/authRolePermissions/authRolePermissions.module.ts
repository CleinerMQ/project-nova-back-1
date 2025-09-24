import { Module } from '@nestjs/common';
import { AuthRolePermissionsService } from './authRolePermissions.service';
import { AuthRolePermissionsController } from './authRolePermissions.controller';
import { ServicesModule } from 'src/common/services/services.module';

@Module({
  controllers: [AuthRolePermissionsController],
  providers: [AuthRolePermissionsService],
  imports: [ServicesModule],
})
export class AuthRolePermissionsModule {}
