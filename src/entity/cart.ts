import { Entity, PrimaryGeneratedColumn, Column, OneToMany,OneToOne, JoinColumn } from "typeorm";
import {CartItems} from './cart_items';
import { Orders } from "./orders";

export enum status {
    OPEN = 'OPEN',
    ORDERED = 'ORDERED',
  }

@Entity()
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'enum', enum: status })
  status: status;

  @OneToMany(
    () => CartItems,
    cartItems => cartItems.carts,
    { cascade: true },
  )

  @OneToOne(
    ()=> Orders, order=>order.carts
   )
   orders=Orders

  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  items: CartItems[];
}