import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Client } from './entities/cliente.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  exports: [TypeOrmModule, ClienteService],
  providers: [ClienteService],
  controllers: [ClienteController],
})
export class ClienteModule {}
