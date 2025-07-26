import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Order } from 'src/payments/entities/order.entity';

@Entity('cliente')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => Order, order => order.client)
  orders: Order[];

  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 10;
    this.contraseña = await bcrypt.hash(this.contraseña, saltRounds);
  }

  @Column({ type: 'varchar', length: 20 })
  telefono: string;
}
