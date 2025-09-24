import { SetMetadata } from '@nestjs/common';

export const Roles = (...authRoles: string[]) =>
  SetMetadata('roles', authRoles);
