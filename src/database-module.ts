import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Carts} from "./entity/cart";
import { CartItems } from "./entity/cart_items";

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.HOST,
            port: +process.env.PORT,
            username: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            synchronize: true,
            logging: true,
            entities: [Carts,CartItems],
            namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Carts, CartItems]),
  ],
  exports: [TypeOrmModule],
})

export class DatabaseModule {
}

