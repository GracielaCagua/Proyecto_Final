// src/mail/mail.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendResetPasswordEmailDto } from './dto/send-reset-password-email.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-reset-password')
  async sendResetPasswordEmail(
    @Body() sendResetPasswordEmailDto: SendResetPasswordEmailDto,
  ) {
    const { email, resetUrl } = sendResetPasswordEmailDto;
    await this.mailService.sendResetPasswordEmail(email, resetUrl);
    return { message: 'Correo de recuperación enviado exitosamente' };
  }
}