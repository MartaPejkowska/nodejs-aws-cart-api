import { Entity, Column, ManyToOne, PrimaryColumn,JoinColumn} from "typeorm";
import { Carts } from "./cart";
import {Product} from '../entity/product'

export enum status {
    OPEN = 'OPEN',
    ORDERED = 'ORDERED',
  }

@Entity()
export class CartItems {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  cart_id: string;

  @Column({ type: 'uuid', nullable: false })
  product_id: string;

  @Column()
  count: number;

  @ManyToOne(
    () => Carts,
    (cart) => cart.items,
    { orphanedRowAction: 'delete', onDelete: 'CASCADE' },
  )
  carts:Carts

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product;

}