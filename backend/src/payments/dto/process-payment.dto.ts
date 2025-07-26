import { IsUUID, IsEnum, IsOptional } from 'class-validator';
import { PaymentStatus } from '../enums/payment-status.enum';

export class ProcessPaymentDto {
  @IsUUID()
  paymentId: string;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsOptional()
  transactionId?: string;
}