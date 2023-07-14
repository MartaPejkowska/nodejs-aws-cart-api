import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Carts } from 'src/entity/cart';
import { CartItems } from 'src/entity/cart_items';
import { Users } from 'src/entity/users';
import { Cart } from '../models';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private cartRepository: Repository<Carts>,
    @InjectRepository(CartItems)
    private CartItemsRepository: Repository<CartItems>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async findByUserId(
    userId: string,
  ): Promise<{ cart: Carts; items: CartItems[] }> {
    //@ts-ignore
    const userCart = await this.cartRepository.findOneBy({ usersId });
    const items = await this.CartItemsRepository.find({
      where: {
        //@ts-ignore
        cart: userCart,
      },
    });
    return { cart: userCart, items };
  }

  async createByUserId(userId: string): Promise<Carts> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const newCart: Carts = {
      id: v4(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      //@ts-ignore
      status: 'OPEN',
      user,
    };
    return this.cartRepository.save(newCart);
  }

  async findOrCreateByUserId(
    userId: string,
  ): Promise<{ cart: Carts; items: CartItems[] }> {
    const { cart } = await this.findByUserId(userId);
    const items = await this.CartItemsRepository.find({
      where: {
        //@ts-ignore
        cart,
      },
    });
    if (cart) {
      return { cart, items };
    }

    const newUserCart = await this.createByUserId(userId);
    return { cart: newUserCart, items: [] as CartItems[] };
  }

  async updateByUserId(
    userId: string,
    items: CartItems[],
  ): Promise<{ cart: Carts; items: CartItems[] }> {
    const userCart = await this.findByUserId(userId);
    items.forEach((CartItems) => {
      const updatedCartItems = {
        ...CartItems,
        userId,
      };
      return this.CartItemsRepository.save(updatedCartItems);
    });
    return userCart;
  }

  async removeByUserId(userId: string): Promise<Carts> {
    const { cart } = await this.findByUserId(userId);
    return this.cartRepository.remove(cart);
  }
  // private userCarts: Record<string, Cart> = {};

  // findByUserId(userId: string): Cart {
  //   return this.userCarts[ userId ];
  // }

  // createByUserId(userId: string) {
  //   const id = v4();
  //   const userCart = {
  //     id,
  //     items: [],
  //   };

  //   this.userCarts[ userId ] = userCart;

  //   return userCart;
  // }

  // findOrCreateByUserId(userId: string): Cart {
  //   const userCart = this.findByUserId(userId);

  //   if (userCart) {
  //     return userCart;
  //   }

  //   return this.createByUserId(userId);
  // }

  // updateByUserId(userId: string, { items }: Cart): Cart {
  //   const { id, ...rest } = this.findOrCreateByUserId(userId);

  //   const updatedCart = {
  //     id,
  //     ...rest,
  //     items: [ ...items ],
  //   }

  //   this.userCarts[ userId ] = { ...updatedCart };

  //   return { ...updatedCart };
  // }

  // removeByUserId(userId): void {
  //   this.userCarts[ userId ] = null;
  // }

}
