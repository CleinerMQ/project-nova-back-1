import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateAuthUserDto {
  @IsEmail({}, { message: 'El email no es válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email!: string;

  @IsString({ message: 'El nombre de usuario debe ser texto' })
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  @MaxLength(20, {
    message: 'El nombre de usuario no debe exceder 20 caracteres',
  })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message:
      'El nombre de usuario solo puede contener letras, números y guiones bajos',
  })
  username!: string;

  @IsString({ message: 'La contraseña debe ser texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(32, { message: 'La contraseña no debe exceder 32 caracteres' })
  @Matches(/(?=.*[A-Z])/, {
    message: 'La contraseña debe contener al menos una letra mayúscula',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'La contraseña debe contener al menos una letra minúscula',
  })
  @Matches(/(?=.*\d)/, {
    message: 'La contraseña debe contener al menos un número',
  })
  @Matches(/(?=.*[@$!%*?&])/, {
    message:
      'La contraseña debe contener al menos un carácter especial (@$!%*?&)',
  })
  password!: string;

  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El nombre no debe exceder 50 caracteres' })
  firstName!: string;

  @IsString({ message: 'El apellido debe ser texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El apellido no debe exceder 50 caracteres' })
  lastName!: string;
}
