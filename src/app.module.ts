import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { DatabaseModule } from './database-module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';


@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
