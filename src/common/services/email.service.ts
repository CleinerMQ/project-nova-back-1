/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envs } from 'src/config/envs';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envs.emailHost,
      port: Number(envs.emailPort) || 465,
      secure: true,
      auth: {
        user: envs.emailUser,
        pass: envs.emailPass,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const info = await this.transporter.sendMail({
      from: `"Factosys Soporte" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return info;
  }
}
