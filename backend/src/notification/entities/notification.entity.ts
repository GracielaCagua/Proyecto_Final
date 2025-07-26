import { Client } from 'src/cliente/entities/cliente.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationType } from '../enums/notification-type.enum';

@Entity()
export class Notification {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Client)
    client: Client;

    @Column()
    title: string;

    @Column('text')
    message: string;

    @Column({
        type: 'enum',
        enum: NotificationType,
        default: NotificationType.INFO,
    })
    type: NotificationType;

    @Column({ default: false })
    isRead: boolean;
}