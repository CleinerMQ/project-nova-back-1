import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateAuthPermissionDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede exceder los 50 caracteres' })
  @Matches(/^[a-zA-Z0-9_:]+$/, {
    message:
      'El nombre solo puede contener letras, números, guion bajo (_) y dos puntos (:)',
  })
  name!: string;

  @IsString({ message: 'El recurso debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El recurso es obligatorio' })
  @MinLength(2, { message: 'El recurso debe tener al menos 2 caracteres' })
  @MaxLength(30, { message: 'El recurso no puede exceder los 30 caracteres' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'El recurso solo puede contener letras, números, guion bajo (_) y guion medio (-)',
  })
  resource!: string;

  @IsString({ message: 'La acción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La acción es obligatoria' })
  @MinLength(2, { message: 'La acción debe tener al menos 2 caracteres' })
  @MaxLength(30, { message: 'La acción no puede exceder los 30 caracteres' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'La acción solo puede contener letras, números, guion bajo (_) y guion medio (-)',
  })
  action!: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(200, {
    message: 'La descripción no puede exceder los 200 caracteres',
  })
  description?: string;
}
