// src/mail/mail.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { AuthService } from 'src/auth/auth.service';
import { MAIL_TRANSPORTER } from './mail.module';
import { Transporter } from 'nodemailer';


@Injectable()
export class MailService {
  // readonly transporter: nodemailer.Transporter;

  constructor(
    readonly configService: ConfigService, 
    readonly usersService: AuthService,
    @Inject(MAIL_TRANSPORTER) private readonly transporter: Transporter,
  ) {
    // this.transporter = nodemailer.createTransport({
    //   service: this.configService.get('EMAIL_SERVICE'),
    //   auth: {
    //     user: this.configService.get('EMAIL_USER'),
    //     pass: this.configService.get('EMAIL_PASSWORD'),
    //   },
    // });

  }

  async sendResetPasswordEmail(email: string, resetUrl: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // No revelar que el usuario no existe por seguridad
      return;
    }

    const templatePath = path.join(
      __dirname,
      'templates',
      'reset-password.template.hbs',
    );
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    const html = template({
      name: user.name || 'Usuario',
      resetUrl,
      expirationHours: this.configService.get('RESET_PASSWORD_EXPIRATION_HOURS'),
    });

    await this.transporter.sendMail({
      from: `"${this.configService.get('EMAIL_FROM_NAME')}" <${this.configService.get('EMAIL_FROM')}>`,
      to: email,
      subject: 'Restablecimiento de contraseña',
      html,
    });
  }
}