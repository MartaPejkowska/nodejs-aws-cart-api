
  import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
   import { Orders } from "./orders";

  @Entity()
  export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: false })
    name:string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    email:string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    password:string


    @OneToMany(
      () => Orders,
      order => order.user,
    )
    order:Orders


  }