// import { Cart, CartItem } from '../models';
import { Carts } from "src/entity/cart";
import { CartItems } from "src/entity/cart_items";

/**

* @param {CartItem[]} items
 * @returns {number}
 */
export function calculateCartTotal(items: CartItems[]): number {
  return items
    ? items.reduce((acc: number, { product, count }: CartItems) => {
        return (acc += product.price * count);
      }, 0)
    : 0;

}
