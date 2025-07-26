// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports: [
    PassportModule,
    ClienteModule,
    JwtModule.register({
      secret: '123123123', 
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([])
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
