import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'El token es obligatorio.' })
  token!: string;

  @IsString()
  @MinLength(8, {
    message: 'La nueva contraseña debe tener al menos 8 caracteres.',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]+$/,
    {
      message:
        'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    },
  )
  @IsNotEmpty({ message: 'La nueva contraseña es obligatoria.' })
  newPassword!: string;
}
