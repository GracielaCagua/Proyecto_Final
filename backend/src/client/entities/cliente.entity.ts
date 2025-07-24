import { SoporteCliente } from 'src/soporte-cliente/entities/soporte-cliente.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @OneToMany(() => SoporteCliente, (soporte) => soporte.cliente)
  soporte: SoporteCliente;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  apellido: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  cedula: string;

  @Column({ type: 'text' })
  direccion: string;

  @Column({ type: 'varchar', length: 100 })
  correo: string;

  @Column({ type: 'varchar', length: 100 })
  contraseña: string;

  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 10;
    this.contraseña = await bcrypt.hash(this.contraseña, saltRounds);
  }

  @Column({ type: 'varchar', length: 20 })
  telefono: string;
}
