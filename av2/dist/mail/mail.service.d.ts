import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { Transporter } from 'nodemailer';
export declare class MailService {
    readonly configService: ConfigService;
    readonly usersService: AuthService;
    private readonly transporter;
    constructor(configService: ConfigService, usersService: AuthService, transporter: Transporter);
    sendResetPasswordEmail(email: string, resetUrl: string): Promise<void>;
}
