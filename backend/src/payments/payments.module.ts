import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Order } from './entities/order.entity';

@Module({
  imports : [ TypeOrmModule.forFeature([ Payment, Order ]) ],
  exports: [ TypeOrmModule ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
