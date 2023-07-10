import { Entity, Column, ManyToOne, PrimaryColumn} from "typeorm";
import { Carts } from "./cart";

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

}