import { PartialType } from '@nestjs/swagger';
import { CreateAuthRolePermissionDto } from './createAuthRolePermission.dto';

export class UpdateAuthRolePermissionDto extends PartialType(
  CreateAuthRolePermissionDto,
) {}
