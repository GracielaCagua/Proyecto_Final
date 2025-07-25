// src/mail/dto/send-reset-password-email.dto.ts
import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

export class SendResetPasswordEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUrl()
  @IsNotEmpty()
  resetUrl: string;
}