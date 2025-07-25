import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import * as crypto from 'crypto';



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    readonly usersRepository: Repository<User>,
    readonly jwtService: JwtService,
    readonly mailService: MailService,
  ) { }

  async register(registerDto: RegisterDto): Promise<{ accessToken: string }> {
    const user = this.usersRepository.create(registerDto);
    await this.usersRepository.save(user);
    return this.generateToken(user);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findOne({ where: { email: loginDto.email } });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User): { accessToken: string } {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: user.keepSignedIn ? '7d' : '1d',
      }),
    };
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      // No revelar que el email no existe por seguridad
      return;
    }

    // Generar token con expiración (1 hora)
    const token = crypto.randomBytes(20).toString('hex');
    // const expires = new Date(Date.now() + 3600000);
    // await this.usersRepository.updateResetToken(user.id, token, expires);
    await this.mailService.sendResetPasswordEmail(user.email, token);
  }

  async findByEmail(email: string){
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    return user;
  }

  async resetPassword(email: string, newPassword: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.usersRepository.update(user.id, {
      password: hashedPassword,
      // resetToken: null,
      // resetTokenExpires: null,
    });
  }
}
