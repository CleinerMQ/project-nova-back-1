import { IsEmail, IsNotEmpty, MaxLength, Matches } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  @MaxLength(150, { message: 'El correo no puede superar los 150 caracteres' })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'El formato del correo no es válido',
  })
  email!: string;
}
