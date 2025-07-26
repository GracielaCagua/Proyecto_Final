import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Client)
    private readonly clienteRepository: Repository<Client>,
  ) {}

  async findByCedula(cedula: string): Promise<Client | undefined> {
    return this.clienteRepository.findOne({ where: { cedula } });
  }

  async create(cliente: Partial<Client>) {
    const nuevoCliente = this.clienteRepository.create(cliente);
    return this.clienteRepository.save(nuevoCliente);
  }

}
