/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { UpdateAuthUserDto } from 'src/gestiones/authGestion/authUser/dto/updateAuthUser.dto';

@Injectable()
export class AuthUserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.authUser.findMany({
      where: { state: 1 },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        authUserRoles: {
          select: { authRoles: { select: { name: true } } },
        },
      },
    });

    if (!users || users.length === 0) {
      throw new NotFoundException('No se encontraron usuarios registrados');
    }

    return users.map((u) => ({
      id: u.id,
      email: u.email,
      username: u.username,
      firstName: u.firstName,
      lastName: u.lastName,
      isActive: u.isActive,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
      roles: u.authUserRoles.map((ur) => ({ name: ur.authRoles.name })),
    }));
  }

  async findOne(id: string) {
    const user = await this.prisma.authUser.findUnique({
      where: { id },
      include: {
        authUserRoles: {
          select: { authRoles: { select: { name: true } } },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateAuthUserDto) {
    await this.findOne(id); // valida existencia

    return this.prisma.authUser.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        authUserRoles: {
          select: { authRoles: { select: { name: true } } },
        },
      },
    });
  }

  async toggleActiveStatus(id: string) {
    const user = await this.findOne(id);
    const newStatus = user.isActive === 1 ? 0 : 1;

    const updatedUser = await this.prisma.authUser.update({
      where: { id },
      data: { isActive: newStatus },
    });

    return {
      message: `Estado cambiado a ${updatedUser.isActive === 1 ? 'activo' : 'inactivo'}`,
      user: updatedUser,
    };
  }

  async remove(id: string) {
    const user = await this.prisma.authUser.update({
      where: { id },
      data: { state: 0 },
    });

    return {
      message: `Usuario con id ${id} deshabilitado correctamente`,
      user,
    };
  }
}
