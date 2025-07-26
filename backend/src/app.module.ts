import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationModule } from './notification/notification.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification/entities/notification.entity';
import { Payment } from './payments/entities/payment.entity';
import { Product } from './products/entities/product.entity';
import { Client } from './cliente/entities/cliente.entity';
import { Order } from './payments/entities/order.entity';
import { Category } from './products/entities/category';
import { OrderItem } from './payments/entities/order-item.entity';

@Module({
  imports: [
    AuthModule,
    PaymentsModule,
    NotificationModule,
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123123',
      database: 'moda',
      entities: [Notification, Payment, Product, Client, Order, Category, OrderItem],
      // synchronize: true, ////quitar en produccion 
    })
  ],

  controllers: [],
  providers: [],
})
export class AppModule { }
