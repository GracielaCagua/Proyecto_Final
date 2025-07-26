// src/payments/entities/order.entity.ts
import { Entity, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from './payment.entity';
import { Client } from 'src/cliente/entities/cliente.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from '../enums/order-status.enum';

@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Client, client => client.orders)
    client: Client;

    @OneToMany(() => OrderItem, item => item.order, { cascade: true })
    items: OrderItem[];

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    @OneToOne(() => Payment, payment => payment.order, { cascade: true })
    payment: Payment;
}