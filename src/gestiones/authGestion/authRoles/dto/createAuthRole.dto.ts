import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateAuthRoleDto {
  @ApiProperty({
    example: 'Administrador',
    description:
      'Nombre único del rol. Solo letras y espacios, mínimo 3 y máximo 50 caracteres.',
    minLength: 3,
    maxLength: 50,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'El nombre no debe exceder los 50 caracteres.' })
  @Matches(/^[a-zA-ZÀ-ÿ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios.',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'Rol con permisos administrativos',
    description: 'Descripción del rol (opcional, máximo 200 caracteres).',
    maxLength: 200,
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsOptional()
  @MaxLength(200, {
    message: 'La descripción no debe exceder los 200 caracteres.',
  })
  description?: string;
}
