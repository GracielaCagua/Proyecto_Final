import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async findByCedula(cedula: string): Promise<Cliente | undefined> {
    return this.clienteRepository.findOne({ where: { cedula } });
  }

  async create(cliente: Partial<Cliente>) {
    const nuevoCliente = this.clienteRepository.create(cliente);
    return this.clienteRepository.save(nuevoCliente);
  }

}
