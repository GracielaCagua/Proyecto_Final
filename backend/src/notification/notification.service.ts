// src/notification/notification.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Client } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const client = await this.clientRepository.findOne({
      where: { id: createNotificationDto.clientId },
    });
    if (!client) {
      throw new NotFoundException(
        `Client with ID ${createNotificationDto.clientId} not found`,
      );
    }

    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      client,
    });
    return this.notificationRepository.save(notification);
  }

  async findAllByClient(clientId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { client: { id: clientId } },
    });
  }

  async markAsRead(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
    });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    notification.isRead = true;
    return this.notificationRepository.save(notification);
  }
}