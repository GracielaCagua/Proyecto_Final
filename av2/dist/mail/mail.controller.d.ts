import { MailService } from './mail.service';
import { SendResetPasswordEmailDto } from './dto/send-reset-password-email.dto';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendResetPasswordEmail(sendResetPasswordEmailDto: SendResetPasswordEmailDto): Promise<{
        message: string;
    }>;
}
