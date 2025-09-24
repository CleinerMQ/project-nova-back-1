import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateAuthRolePermissionDto } from './dto/createAuthRolePermission.dto';
import { UpdateAuthRolePermissionDto } from './dto/updateAuthRolePermission.dto';

@Injectable()
export class AuthRolePermissionsService {
  constructor(private prisma: PrismaService) {}

  // Crear relación Role-Permission
  create(dto: CreateAuthRolePermissionDto) {
    return this.prisma.authRolePermissions.create({
      data: {
        idAuthRoles: dto.roleId,
        idAuthPermissions: dto.permissionId,
      },
    });
  }

  // Obtener todas las relaciones
  findAll() {
    return this.prisma.authRolePermissions.findMany({
      include: {
        role: true,
        authPermissions: true,
      },
    });
  }

  // Obtener una relación por ID
  async findOne(id: string) {
    const rolePermission = await this.prisma.authRolePermissions.findUnique({
      where: { id },
      include: {
        role: true,
        authPermissions: true,
      },
    });

    if (!rolePermission) {
      throw new NotFoundException(`RolePermission con id ${id} no encontrado`);
    }

    return rolePermission;
  }

  // Actualizar una relación por ID
  update(id: string, dto: UpdateAuthRolePermissionDto) {
    return this.prisma.authRolePermissions.update({
      where: { id },
      data: {
        idAuthRoles: dto.roleId,
        idAuthPermissions: dto.permissionId,
      },
    });
  }

  // Eliminar una relación por ID
  remove(id: string) {
    return this.prisma.authRolePermissions.delete({
      where: { id },
    });
  }
}
