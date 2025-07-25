import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { createTransport } from 'nodemailer';
import { Transporter } from 'nodemailer';

// Token personalizado
export const MAIL_TRANSPORTER = 'MAIL_TRANSPORTER';

@Module({
  imports: [ConfigModule], // Asegúrate de importar ConfigModule
  providers: [
    MailService,
    {
      provide: MAIL_TRANSPORTER,
      useFactory: (configService: ConfigService): Transporter => {
        return createTransport({
          service: 'gmail',
          auth: {
            user: configService.get<string>('EMAIL_USER'),
            pass: configService.get<string>('EMAIL_PASS'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [MailService],
})
export class MailModule {}
