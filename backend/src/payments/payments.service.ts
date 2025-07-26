// src/payments/payments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Order } from './entities/order.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { PaymentStatus } from './enums/payment-status.enum';
import { OrderStatus } from './enums/order-status.enum';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const order = await this.orderRepository.findOne({
      where: { id: createPaymentDto.orderId },
      relations: ['payment'],
    });

    if (!order) {
      throw new NotFoundException(
        `Order with ID ${createPaymentDto.orderId} not found`,
      );
    }

    if (order.payment) {
      throw new Error('Order already has a payment');
    }

    const payment = this.paymentRepository.create({
      amount: createPaymentDto.amount,
      method: createPaymentDto.method,
      transactionId: createPaymentDto.transactionId,
      order,
    });

    return this.paymentRepository.save(payment);
  }

  async processPayment(processPaymentDto: ProcessPaymentDto): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id: processPaymentDto.paymentId },
      relations: ['order'],
    });

    if (!payment) {
      throw new NotFoundException(
        `Payment with ID ${processPaymentDto.paymentId} not found`,
      );
    }

    payment.status = processPaymentDto.status;
    
    if (processPaymentDto.transactionId) {
      payment.transactionId = processPaymentDto.transactionId;
    }

    // Update order status based on payment status
    if (payment.status === PaymentStatus.COMPLETED) {
      payment.order.status = OrderStatus.PROCESSING;
      await this.orderRepository.save(payment.order);
    } else if (payment.status === PaymentStatus.FAILED) {
      payment.order.status = OrderStatus.CANCELLED;
      await this.orderRepository.save(payment.order);
    }

    return this.paymentRepository.save(payment);
  }

  async getPaymentById(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['order', 'order.client'],
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }
}