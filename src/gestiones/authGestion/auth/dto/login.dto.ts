import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'El identificador es obligatorio.' })
  @MinLength(3, {
    message: 'El identificador debe tener al menos 3 caracteres.',
  })
  @MaxLength(50, {
    message: 'El identificador no puede superar los 50 caracteres.',
  })
  @Matches(/^[a-zA-Z0-9._@-]+$/, {
    message:
      'El identificador solo puede contener letras, números, ".", "_", "-", y "@"',
  })
  identifier!: string; // Puede ser email o username

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @MaxLength(64, {
    message: 'La contraseña no puede superar los 64 caracteres.',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-]).{8,}$/, {
    message:
      'La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&._-).',
  })
  password!: string;
}
