import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/mail/mail.service';
export declare class AuthService {
    readonly usersRepository: Repository<User>;
    readonly jwtService: JwtService;
    readonly mailService: MailService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService, mailService: MailService);
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    private generateToken;
    requestPasswordReset(email: string): Promise<void>;
    findByEmail(email: string): Promise<User>;
    resetPassword(email: string, newPassword: string): Promise<void>;
}
