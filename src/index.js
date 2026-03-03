import * as cartService from "./services/cart.js";
import { loadCart, saveCart } from "./services/cartPersistence.js";
import createItem from "./services/item.js";

const myCart = await loadCart();

console.log("Welcome to your Shopee Cart!");

if (myCart.length === 0) {
  // criando itens iniciais no primeiro uso
  const item1 = createItem("hotwheels ferrari", 20.99, 1);
  const item2 = createItem("hotwheels lamborghini", 39.99, 3);
  const item3 = createItem("hotwheels ferrari", 20.99, 2);

  // adicionando itens ao carrinho
  cartService.addItem(myCart, item1);
  cartService.addItem(myCart, item2);
  cartService.addItem(myCart, item3); // item repetido: quantidade sera somada

  // removendo uma unidade de um item
  cartService.removeItem(myCart, item2);

  // aplicando cupom
  cartService.applyCoupon(myCart, "DIO10");
}

cartService.displaycart(myCart);
cartService.calculateTotal(myCart);
await saveCart(myCart);
