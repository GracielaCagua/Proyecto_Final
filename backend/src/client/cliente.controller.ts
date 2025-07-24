import { Controller, Post, Body } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('registrar')
  create(@Body() body: any) {
    return this.clienteService.create(body);
  }
}
