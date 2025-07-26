import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Client } from 'src/cliente/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Client])],
  exports: [TypeOrmModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule { }
