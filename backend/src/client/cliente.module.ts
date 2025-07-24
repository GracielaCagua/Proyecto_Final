import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { SoporteCliente } from 'src/soporte-cliente/entities/soporte-cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, SoporteCliente])],
  exports: [TypeOrmModule, ClienteService],
  providers: [ClienteService],
  controllers: [ClienteController],
})
export class ClienteModule {}
