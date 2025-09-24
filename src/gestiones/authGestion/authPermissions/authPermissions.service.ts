import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthPermissionDto } from './dto/createAuthPermission.dto';
import { UpdateAuthPermissionDto } from './dto/updateAuthPermission.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class AuthPermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(createPermissionDto: CreateAuthPermissionDto) {
    const { name, resource, action, description } = createPermissionDto;

    // Verificar si ya existe un permiso con el mismo nombre
    const existingPermission = await this.prisma.authPermissions.findUnique({
      where: { name },
    });
    if (existingPermission) {
      throw new ConflictException(
        `Ya existe un permiso con el nombre '${name}'`,
      );
    }

    // Verificar si ya existe la combinación resource + action
    const existingCombination = await this.prisma.authPermissions.findFirst({
      where: { resource, action },
    });
    if (existingCombination) {
      throw new ConflictException(
        `Ya existe un permiso para el recurso '${resource}' con la acción '${action}'`,
      );
    }

    // ✅ Solo devuelve el dato
    return this.prisma.authPermissions.create({
      data: { name, resource, action, description },
    });
  }

  findAll() {
    return this.prisma.authPermissions.findMany({
      where: { state: 1 },
    });
  }

  async findOne(id: string) {
    const permission = await this.prisma.authPermissions.findUnique({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException(`Permiso con ID '${id}' no encontrado`);
    }
    return permission;
  }

  async update(id: string, updatePermissionDto: UpdateAuthPermissionDto) {
    const existingPermission = await this.prisma.authPermissions.findUnique({
      where: { id },
    });
    if (!existingPermission) {
      throw new NotFoundException(`Permiso con ID '${id}' no encontrado`);
    }

    const { name, resource, action } = updatePermissionDto;

    if (name && name !== existingPermission.name) {
      const duplicateName = await this.prisma.authPermissions.findFirst({
        where: { name, NOT: { id } },
      });
      if (duplicateName) {
        throw new ConflictException(
          `Ya existe otro permiso con el nombre '${name}'`,
        );
      }
    }

    if (
      (resource && resource !== existingPermission.resource) ||
      (action && action !== existingPermission.action)
    ) {
      const duplicateCombination = await this.prisma.authPermissions.findFirst({
        where: {
          resource: resource || existingPermission.resource,
          action: action || existingPermission.action,
          NOT: { id },
        },
      });
      if (duplicateCombination) {
        throw new ConflictException(
          `Ya existe otro permiso para el recurso '${resource || existingPermission.resource}' con la acción '${action || existingPermission.action}'`,
        );
      }
    }

    return this.prisma.authPermissions.update({
      where: { id },
      data: updatePermissionDto,
    });
  }

  async remove(id: string) {
    const existingPermission = await this.prisma.authPermissions.findUnique({
      where: { id },
      include: { authRolePermissions: true },
    });
    if (!existingPermission) {
      throw new NotFoundException(`Permiso con ID '${id}' no encontrado`);
    }

    if (existingPermission.authRolePermissions.length > 0) {
      const rolesUsingPermission = await this.prisma.authRoles.findMany({
        where: { authRolePermissions: { some: { idAuthPermissions: id } } },
        select: { name: true },
      });
      const roleNames = rolesUsingPermission.map((r) => r.name).join(', ');
      throw new BadRequestException(
        `No se puede eliminar el permiso porque está siendo usado por los roles: ${roleNames}. Primero remueve el permiso de estos roles.`,
      );
    }

    return this.prisma.authPermissions.update({
      where: { id },
      data: { state: 0 },
    });
  }
}
