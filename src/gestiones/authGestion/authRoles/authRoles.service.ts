import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthRoleDto } from './dto/createAuthRole.dto';
import { UpdateAuthRoleDto } from './dto/updateAuthRole.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class AuthRolesService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthRoleDto: CreateAuthRoleDto) {
    return this.prisma.authRoles.create({
      data: createAuthRoleDto,
    });
  }

  async findAll() {
    return await this.prisma.authRoles.findMany({ where: { state: 1 } });
  }

  async findOne(id: string) {
    const role = await this.prisma.authRoles.findUnique({ where: { id } });

    if (!role) {
      throw new NotFoundException(`Rol con id ${id} no encontrado`);
    }

    return role;
  }

  async update(id: string, updateAuthRoleDto: UpdateAuthRoleDto) {
    await this.findOne(id); // valida que exista

    return this.prisma.authRoles.update({
      where: { id },
      data: updateAuthRoleDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // valida que exista

    return this.prisma.authRoles.update({
      where: { id },
      data: { state: 0 },
    });
  }
}
