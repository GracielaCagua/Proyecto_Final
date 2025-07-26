// src/payments/payments.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      return await this.paymentsService.createPayment(createPaymentDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error instanceof NotFoundException
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('process')
  async processPayment(@Body() processPaymentDto: ProcessPaymentDto) {
    try {
      return await this.paymentsService.processPayment(processPaymentDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error instanceof NotFoundException
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async getPaymentById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.paymentsService.getPaymentById(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error instanceof NotFoundException
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST,
      );
    }
  }
}