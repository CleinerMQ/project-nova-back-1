import { PartialType } from '@nestjs/swagger';
import { CreateAuthPermissionDto } from './createAuthPermission.dto';

export class UpdateAuthPermissionDto extends PartialType(
  CreateAuthPermissionDto,
) {}
