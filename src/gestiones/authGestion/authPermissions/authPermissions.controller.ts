import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthPermissionsService } from './authPermissions.service';
import { CreateAuthPermissionDto } from './dto/createAuthPermission.dto';
import { UpdateAuthPermissionDto } from './dto/updateAuthPermission.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('authPermissions')
export class AuthPermissionsController {
  constructor(
    private readonly authPermissionsService: AuthPermissionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo permiso' })
  @ApiBody({
    type: CreateAuthPermissionDto,
    examples: {
      ejemplo1: {
        summary: 'Permiso de lectura de usuario',
        value: {
          name: 'baret_read:user',
          resource: 'user',
          action: 'read',
          description: 'Permiso de lectura para usuarios con alias baret',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Permiso creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createPermissionDto: CreateAuthPermissionDto) {
    return this.authPermissionsService.create(createPermissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los permisos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de permisos obtenida correctamente.',
    schema: {
      example: [
        {
          id: 'cmex4q8spk0002v6cs6j7haz4k',
          name: 'baret_read:user',
          resource: 'user',
          action: 'read',
          description: 'Permiso de lectura para usuarios con alias baret',
        },
        {
          id: 'cmex4q8spk0002v6cs6j7haz4m',
          name: 'baret_update:user',
          resource: 'user',
          action: 'update',
          description: 'Permiso de edición de usuario',
        },
      ],
    },
  })
  findAll() {
    return this.authPermissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un permiso por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID del permiso' })
  @ApiResponse({
    status: 200,
    description: 'Permiso obtenido correctamente.',
    schema: {
      example: {
        id: 'cmex4q8spk0002v6cs6j7haz4k',
        name: 'baret_read:user',
        resource: 'user',
        action: 'read',
        description: 'Permiso de lectura para usuarios con alias baret',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.authPermissionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un permiso' })
  @ApiParam({ name: 'id', type: String, description: 'ID del permiso' })
  @ApiBody({
    type: UpdateAuthPermissionDto,
    examples: {
      ejemplo1: {
        summary: 'Actualizar nombre y descripción',
        value: {
          name: 'baret_update:user',
          description: 'Permiso de actualización de usuario actualizado',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Permiso actualizado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdateAuthPermissionDto,
  ) {
    return this.authPermissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un permiso' })
  @ApiParam({ name: 'id', type: String, description: 'ID del permiso' })
  @ApiResponse({
    status: 200,
    description: 'Permiso eliminado correctamente.',
    schema: {
      example: {
        message: 'Permiso eliminado con éxito',
        id: 'cmex4q8spk0002v6cs6j7haz4k',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado.' })
  remove(@Param('id') id: string) {
    return this.authPermissionsService.remove(id);
  }
}
