import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { AuthUserService } from './authUser.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateAuthUserDto } from './dto/updateAuthUser.dto';

@Controller('AuthUser')
export class AuthUserController {
  constructor(private readonly userService: AuthUserService) {}
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida correctamente',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateAuthUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar(Desactiva) un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Patch(':id/toggle-status')
  @ApiOperation({ summary: 'Activar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario activado correctamente' })
  activate(@Param('id') id: string) {
    return this.userService.toggleActiveStatus(id);
  }
}
