import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AuthRolesService } from './authRoles.service';
import { CreateAuthRoleDto } from './dto/createAuthRole.dto';
import { UpdateAuthRoleDto } from './dto/updateAuthRole.dto';
import { ParseCuidPipe } from 'src/common/pipes/parseCuid.pipe';

@ApiTags('AuthRoles')
@Controller('authRoles')
export class AuthRolesController {
  constructor(private readonly authRolesService: AuthRolesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo rol de autenticación' })
  @ApiBody({
    type: CreateAuthRoleDto,
    examples: {
      ejemplo1: {
        summary: 'Rol administrador',
        value: {
          name: 'admin',
          description: 'Rol con todos los permisos',
        },
      },
      ejemplo2: {
        summary: 'Rol usuario básico',
        value: {
          name: 'user',
          description: 'Rol con permisos limitados',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Rol creado exitosamente' })
  create(@Body() createAuthRoleDto: CreateAuthRoleDto) {
    return this.authRolesService.create(createAuthRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los roles de autenticación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de roles obtenida correctamente',
  })
  findAll() {
    return this.authRolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un rol por su ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único del rol (CUID)',
  })
  @ApiResponse({ status: 200, description: 'Rol encontrado' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  findOne(@Param('id', ParseCuidPipe) id: string) {
    return this.authRolesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un rol existente' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único del rol (CUID)',
  })
  @ApiBody({
    type: UpdateAuthRoleDto,
    examples: {
      ejemplo1: {
        summary: 'Actualizar nombre y descripción',
        value: {
          name: 'superadmin',
          description: 'Rol con privilegios extendidos',
        },
      },
      ejemplo2: {
        summary: 'Actualizar solo descripción',
        value: {
          description: 'Rol de usuario regular con nuevas restricciones',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Rol actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  update(
    @Param('id', ParseCuidPipe) id: string,
    @Body() updateAuthRoleDto: UpdateAuthRoleDto,
  ) {
    return this.authRolesService.update(id, updateAuthRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un rol por su ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único del rol (CUID)',
  })
  @ApiResponse({ status: 200, description: 'Rol eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  remove(@Param('id', ParseCuidPipe) id: string) {
    return this.authRolesService.remove(id);
  }
}
