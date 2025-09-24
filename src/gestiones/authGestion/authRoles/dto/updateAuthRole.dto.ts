import { PartialType } from '@nestjs/swagger';
import { CreateAuthRoleDto } from './createAuthRole.dto';

export class UpdateAuthRoleDto extends PartialType(CreateAuthRoleDto) {}
