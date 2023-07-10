import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Carts} from "./entity/cart";
import { CartItems } from "./entity/cart_items";
import { Orders } from './entity/orders';
import { Users } from './entity/users';


@Module({
    imports:[
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.HOST,
            port: +process.env.PORT,
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
            // database: process.env.DATABASE,
            synchronize: true,
            logging: true,
            entities: [Carts,CartItems, Orders, Users],
            namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Carts, CartItems, Orders, Users]),
  ],
  exports: [TypeOrmModule],
})

export class DatabaseModule {
}

