/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from './dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CurrentUser } from './decorators/authUser.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiOperation({
    summary: 'Registro de usuario',
    description: 'Permite crear un nuevo usuario en el sistema.',
  })
  @ApiBody({
    type: RegisterDto,
    examples: {
      example: {
        summary: 'Ejemplo de registro',
        value: {
          username: 'johndoe',
          email: 'johndoe@example.com',
          password: 'SecurePass123!',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente.',
    schema: {
      example: {
        message: 'Usuario registrado exitosamente',
        user: {
          id: 'cmex4z6x70000v6cs7k2h2a8d',
          username: 'johndoe',
          email: 'johndoe@example.com',
        },
      },
    },
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Inicio de sesión',
    description: 'Autentica al usuario y devuelve un JWT.',
  })
  @ApiBody({
    type: LoginDto,
    examples: {
      example: {
        summary: 'Ejemplo de login',
        value: {
          identifier: 'johndoe@example.com',
          password: 'SecurePass123!',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso. Retorna un token JWT.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Credenciales inválidas',
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('forgotPassword')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Solicitud de recuperación de contraseña',
    description:
      'Envía un correo con instrucciones para restablecer la contraseña.',
  })
  @ApiBody({
    type: ForgotPasswordDto,
    examples: {
      example: {
        summary: 'Ejemplo de solicitud',
        value: {
          email: 'johndoe@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Correo de recuperación enviado.',
    schema: {
      example: { message: 'Correo de recuperación enviado' },
    },
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('resetPassword')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Restablecer contraseña',
    description: 'Permite cambiar la contraseña con el token de recuperación.',
  })
  @ApiBody({
    type: ResetPasswordDto,
    examples: {
      example: {
        summary: 'Ejemplo de reset',
        value: {
          token: 'abcdef123456',
          newPassword: 'NewSecurePass456!',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Contraseña actualizada correctamente.',
    schema: {
      example: { message: 'Contraseña actualizada correctamente.' },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Token inválido o expirado.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Token inválido o expirado',
      },
    },
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // 🔑 Indica que este endpoint requiere JWT Bearer Token
  @ApiOperation({
    summary: 'Perfil del usuario',
    description: 'Obtiene la información del usuario autenticado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil obtenido exitosamente.',
    schema: {
      example: {
        user: {
          id: 'cmex4z6x70000v6cs7k2h2a8d',
          username: 'johndoe',
          email: 'johndoe@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token no válido o expirado.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Token no válido o expirado',
      },
    },
  })
  async getProfile(@CurrentUser() user: any) {
    return { user };
  }
}
