import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthRolePermissionDto {
  @IsString()
  @IsNotEmpty()
  roleId!: string;

  @IsString()
  @IsNotEmpty()
  permissionId!: string;
}
