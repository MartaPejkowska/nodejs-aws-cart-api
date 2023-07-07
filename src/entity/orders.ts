import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn , OneToOne} from "typeorm";
import {Carts} from './cart'
import { Users } from "./users";

export enum status {
    OPEN = 'OPEN',
    ORDERED = 'ORDERED',
  }

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'uuid', nullable: false })
  cart_id: string;

  @Column()
  payment:JSON

  @Column()
  delivery:JSON

  @Column()
  comments: Text

  @Column()
  status:status

  @Column()
  total: number


  @ManyToOne(
    () => Users,
    user => user.order,
    { cascade: true },
  )
  user:Users

  @OneToOne(
   ()=> Carts, cart=>cart.orders
  )
  carts=Carts

}

