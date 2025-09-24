/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/common/services/email.service';
import { PrismaService } from 'src/common/services/prisma.service';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from './dto';
import * as bcrypt from 'bcryptjs';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  /** =====================
   * 🔐 Registro
   ===================== */
  async register({
    email,
    username,
    password,
    firstName,
    lastName,
  }: RegisterDto) {
    const existingUser = await this.prisma.authUser.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existingUser) {
      throw new ConflictException('El email o username ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.prisma.authUser.create({
      data: { email, username, password: hashedPassword, firstName, lastName },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        isActive: true,
        createdAt: true,
      },
    });

    // asignar rol por defecto
    const userRole = await this.prisma.authRoles.findUnique({
      where: { name: 'USER' },
    });
    if (userRole) {
      await this.prisma.authUserRoles.create({
        data: { idAuthUser: user.id, idAuthRoles: userRole.id },
      });
    }

    return { message: 'Usuario registrado exitosamente', user };
  }

  /** =====================
   * 🔑 Login
   ===================== */
  async login({ identifier, password }: LoginDto) {
    const user = await this.prisma.authUser.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
        isActive: 1,
        state: 1,
      },
      include: {
        authUserRoles: {
          include: {
            authRoles: {
              include: {
                authRolePermissions: { include: { authPermissions: true } },
              },
            },
          },
        },
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      roles: user.authUserRoles.map((ur) => ur.authRoles.name),
    };

    const access_token = this.jwtService.sign(payload);

    return { access_token, user: this.mapUserResponse(user) };
  }

  /** =====================
   * 📧 Forgot Password
   ===================== */
  async forgotPassword({ email }: ForgotPasswordDto) {
    const user = await this.prisma.authUser.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const displayName =
      [user.firstName, user.lastName].filter(Boolean).join(' ') ||
      user.username;

    // borrar tokens previos
    await this.prisma.authPasswordResetTokens.deleteMany({
      where: { idAuthUser: user.id },
    });

    // generar nuevo token
    const resetCode = this.generateResetCode();
    const hashedCode = await bcrypt.hash(resetCode, 10);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.authPasswordResetTokens.create({
      data: { token: hashedCode, idAuthUser: user.id, expiresAt },
    });

    // enviar correo
    const html = this.getRecoveryEmailHtml(resetCode, displayName);
    await this.emailService.sendMail(
      email,
      'Recuperación de contraseña Factosys',
      `Tu código de recuperación es: ${resetCode}`,
      html,
    );

    return { message: 'Código de recuperación enviado a tu correo' };
  }

  /** =====================
   * 🔄 Reset Password
   ===================== */
  async resetPassword({ token, newPassword }: ResetPasswordDto) {
    const resetToken = await this.prisma.authPasswordResetTokens.findFirst({
      where: { used: false, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
      include: { authUser: true },
    });

    if (!resetToken || !(await bcrypt.compare(token, resetToken.token))) {
      throw new BadRequestException('Código inválido o expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await this.prisma.authUser.update({
      where: { id: resetToken.idAuthUser },
      data: { password: hashedPassword },
    });

    await this.prisma.authPasswordResetTokens.update({
      where: { id: resetToken.id },
      data: { used: true },
    });

    return { message: 'Contraseña actualizada exitosamente' };
  }

  /** =====================
   * 🧾 Validar Usuario
   ===================== */
  validateUser(userId: string) {
    return this.prisma.authUser.findUnique({
      where: { id: userId, isActive: 1, state: 1 },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        authUserRoles: {
          include: {
            authRoles: {
              include: {
                authRolePermissions: { include: { authPermissions: true } },
              },
            },
          },
        },
      },
    });
  }

  /** =====================
   * 🔧 Helpers
   ===================== */
  private generateResetCode(): string {
    return randomInt(100000, 999999).toString();
  }

  private mapUserResponse(user: any) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.authUserRoles.map((ur) => ({
        id: ur.authRoles.id,
        name: ur.authRoles.name,
        permissions: ur.authRoles.authRolePermissions.map((rp) => ({
          id: rp.authPermissions.id,
          name: rp.authPermissions.name,
          resource: rp.authPermissions.resource,
          action: rp.authPermissions.action,
        })),
      })),
    };
  }

  private getRecoveryEmailHtml(resetCode: string, userName: string) {
    return `
       <style>
      @media only screen and (max-width: 600px) {
        .email-container { margin: 5px !important; border-radius: 12px !important; }
        .header-section { padding: 25px 15px !important; }
        .logo-icon { width: 50px !important; height: 50px !important; margin-bottom: 15px !important; }
        .logo-svg { width: 24px !important; height: 24px !important; }
        .main-title { font-size: 24px !important; letter-spacing: 0.5px !important; }
        .subtitle { font-size: 12px !important; }
        .content-section { padding: 30px 15px !important; }
        .security-icon { width: 40px !important; height: 40px !important; margin-bottom: 20px !important; }
        .security-svg { width: 16px !important; height: 16px !important; }
        .welcome-title { font-size: 20px !important; margin-bottom: 12px !important; }
        .description-text { font-size: 14px !important; margin-bottom: 20px !important; }
        .code-container { padding: 20px 10px !important; margin: 20px 0 !important; border-radius: 10px !important; }
        .code-label { font-size: 12px !important; margin-bottom: 10px !important; }
        .code-box { padding: 15px !important; min-width: 150px !important; }
        .recovery-code { font-size: 28px !important; letter-spacing: 3px !important; }
        .code-timer { font-size: 11px !important; margin-top: 10px !important; }
        .alert-box { padding: 15px !important; margin: 15px 0 !important; border-radius: 6px !important; }
        .alert-icon { width: 20px !important; height: 20px !important; margin-right: 10px !important; }
        .alert-svg { width: 10px !important; height: 10px !important; }
        .alert-title { font-size: 14px !important; margin-bottom: 6px !important; }
        .alert-text { font-size: 12px !important; }
        .footer-text { font-size: 11px !important; }
        .footer-section { padding: 20px 15px !important; }
        .footer-brand { font-size: 14px !important; }
        .decorative-circle { width: 50px !important; height: 50px !important; }
      }
    </style>
    <div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #0a0a23 0%, #1a1a3e 100%); padding: 10px; min-height: 100vh;">
      <div class="email-container" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
        
        <!-- Header con los colores de Factosys -->
        <div class="header-section" style="background: linear-gradient(135deg, #0a0a23 0%, #1a1a3e 100%); color: white; padding: 30px 20px; text-align: center; position: relative;">
          
        
          
          <h1 class="main-title" style="margin: 0; font-size: 36px; font-weight: 600; letter-spacing: 1px; color: #3498db;">Factosys Perú</h1>
          <p class="subtitle" style="margin: 8px 0 0 0; opacity: 0.8; font-size: 14px;">Transformamos ideas en realidad digital</p>
        </div>
        
        <!-- Contenido -->
        <div class="content-section" style="padding: 40px 30px; color: #333;">
         
          
          <h2 class="welcome-title" style="margin: 0 0 15px 0; font-size: 24px; color: #1a1a3e;">Hola ${userName},</h2>
          <p class="description-text" style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 25px;">Has solicitado recuperar tu contraseña.</p>
          
          <!-- Código con colores Factosys -->
          <div class="code-container" style="background: linear-gradient(135deg, #0a0a23 0%, #1a1a3e 100%); border-radius: 12px; padding: 25px; text-align: center; margin: 25px 0; position: relative; overflow: hidden;">
          
            
            <p class="code-label" style="margin: 0 0 12px 0; color: #3498db; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">Tu Código de Recuperación</p>
            
            <div class="code-box" style="background: rgba(255,255,255,0.95); border-radius: 8px; padding: 18px; display: inline-block; min-width: 180px; border: 2px solid rgba(52, 152, 219, 0.2); word-break: break-all; box-sizing: border-box; max-width: 100%;">
              <div class="recovery-code" style="font-size: 32px; font-weight: bold; color: #1a1a3e; letter-spacing: 4px; font-family: 'Courier New', monospace;">${resetCode}</div>
            </div>
            
            <p class="code-timer" style="margin: 12px 0 0 0; color: rgba(52, 152, 219, 0.8); font-size: 12px;">⏰ Válido por 15 minutos</p>
          </div>
          
          <!-- Alerta con colores Factosys -->
          <div class="alert-box" style="background: linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(46, 204, 113, 0.05) 100%); border-left: 4px solid #3498db; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <div style="display: flex; align-items: flex-start;">
              
              <div style="flex: 1;">
                <p class="alert-title" style="margin: 0 0 8px 0; font-size: 15px; font-weight: 600; color: #2980b9;">🔐 Importante</p>
                <p class="alert-text" style="margin: 0; font-size: 14px; color: #2980b9; line-height: 1.5;">Este código es válido por <strong>15 minutos</strong>. No compartas este código con nadie.</p>
              </div>
            </div>
          </div>
          
          <p style="font-size: 14px; color: #7f8c8d; margin: 15px 0 0 0; text-align: center;">Si no solicitaste este cambio, puedes ignorar este correo.</p>
        </div>
        
        <div class="footer-section" style="background: linear-gradient(135deg, #1a1a3e 0%, #0a0a23 100%); color: #ecf0f1; text-align: center; padding: 25px; position: relative;">
          <!-- Línea decorativa con cyan -->
          <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 60px; height: 3px; background: linear-gradient(90deg, #3498db 0%, #2ecc71 100%); border-radius: 0 0 2px 2px;"></div>
          
          <p class="footer-brand" style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #3498db;">FACTOSYS PERÚ</p>
          <div style="height: 1px; background: rgba(52, 152, 219, 0.3); margin: 10px auto; width: 80px;"></div>
          <p class="footer-text" style="margin: 0; font-size: 12px; opacity: 0.8;">&copy; 2025 Factosys. Todos los derechos reservados.</p>
        </div>
        
      </div>
    </div>
    `;
  }
}
