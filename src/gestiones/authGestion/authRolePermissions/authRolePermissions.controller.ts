import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthRolePermissionsService } from './authRolePermissions.service';
import { CreateAuthRolePermissionDto } from './dto/createAuthRolePermission.dto';
import { UpdateAuthRolePermissionDto } from './dto/updateAuthRolePermission.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('authRolePermissions')
export class AuthRolePermissionsController {
  constructor(
    private readonly authRolePermissionsService: AuthRolePermissionsService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'Crear relación Rol-Permiso' })
  @ApiBody({
    type: CreateAuthRolePermissionDto,
    examples: {
      ejemplo: {
        summary: 'Crear relación',
        value: {
          roleId: 'role-uuid-123',
          permissionId: 'perm-uuid-456',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Relación creada exitosamente',
    schema: {
      example: {
        id: 'uuid-1',
        roleId: 'role-uuid-123',
        permissionId: 'perm-uuid-456',
      },
    },
  })
  create(
    @Body() createCreateRolePermissionDtoDto: CreateAuthRolePermissionDto,
  ) {
    return this.authRolePermissionsService.create(
      createCreateRolePermissionDtoDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las relaciones Rol-Permiso' })
  @ApiResponse({
    status: 200,
    description: 'Lista obtenida correctamente',
    schema: {
      example: [
        {
          id: 'uuid-1',
          roleId: 'role-uuid-123',
          permissionId: 'perm-uuid-456',
        },
        {
          id: 'uuid-2',
          roleId: 'role-uuid-789',
          permissionId: 'perm-uuid-987',
        },
      ],
    },
  })
  findAll() {
    return this.authRolePermissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una relación por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID de la relación' })
  @ApiResponse({
    status: 200,
    description: 'Relación obtenida correctamente',
    schema: {
      example: {
        id: 'uuid-1',
        roleId: 'role-uuid-123',
        permissionId: 'perm-uuid-456',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.authRolePermissionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una relación Rol-Permiso' })
  @ApiParam({ name: 'id', type: String, description: 'ID de la relación' })
  @ApiBody({
    type: UpdateAuthRolePermissionDto,
    examples: {
      ejemplo: {
        summary: 'Actualizar relación',
        value: { roleId: 'role-uuid-999', permissionId: 'perm-uuid-111' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Relación actualizada correctamente',
    schema: {
      example: {
        id: 'uuid-1',
        roleId: 'role-uuid-999',
        permissionId: 'perm-uuid-111',
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateCreateRolePermissionDtoDto: UpdateAuthRolePermissionDto,
  ) {
    return this.authRolePermissionsService.update(
      id,
      updateCreateRolePermissionDtoDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una relación Rol-Permiso' })
  @ApiParam({ name: 'id', type: String, description: 'ID de la relación' })
  @ApiResponse({
    status: 200,
    description: 'Relación eliminada correctamente',
    schema: {
      example: {
        id: 'uuid-1',
        roleId: 'role-uuid-123',
        permissionId: 'perm-uuid-456',
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.authRolePermissionsService.remove(id);
  }
}
