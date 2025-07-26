// src/payments/entities/order-item.entity.ts
import { Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class OrderItem {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Product)
    product: Product;

    @ManyToOne(() => Order, order => order.items)
    order: Order;

    @Column('int')
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    unitPrice: number;

    @Column('decimal', { precision: 10, scale: 2 })
    subtotal: number;
}