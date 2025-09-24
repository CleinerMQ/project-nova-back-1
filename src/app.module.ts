import { Module } from '@nestjs/common';
import { ServicesModule } from './common/services/services.module';
import { AuthModule } from './gestiones/authGestion/auth/auth.module';
import { AuthUserModule } from './gestiones/authGestion/authUser/authUser.module';
import { AuthPermissionsModule } from './gestiones/authGestion/authPermissions/authPermissions.module';
import { AuthRolePermissionsModule } from './gestiones/authGestion/authRolePermissions/authRolePermissions.module';
import { AuthRolesModule } from './gestiones/authGestion/authRoles/authRoles.module';

@Module({
  imports: [
    ServicesModule,
    AuthModule,
    AuthUserModule,
    AuthPermissionsModule,
    AuthRolePermissionsModule,
    AuthRolesModule,
  ],
})
export class AppModule {}
