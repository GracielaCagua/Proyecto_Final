import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [ TypeOrmModule.forFeature([User]),
  ConfigModule,
  JwtModule.register({
      secret: 'secretKey', 
      signOptions: { expiresIn: '1h' },
    }),
],
  exports: [ TypeOrmModule ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
