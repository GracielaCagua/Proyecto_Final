import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClienteService } from 'src/client/cliente.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(cedula: string, pass: string) {
    const user = await this.clienteService.findByCedula(cedula);
    if (user && await bcrypt.compare(pass, user.contraseña)) {
      const { contraseña, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id_cliente, nombre: user.nombre };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
