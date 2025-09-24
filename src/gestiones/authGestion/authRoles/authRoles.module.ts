import { Module } from '@nestjs/common';
import { AuthRolesService } from './authRoles.service';
import { AuthRolesController } from './authRoles.controller';
import { ServicesModule } from 'src/common/services/services.module';

@Module({
  controllers: [AuthRolesController],
  providers: [AuthRolesService],
  imports: [ServicesModule],
})
export class AuthRolesModule {}
