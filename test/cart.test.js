import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { mkdtemp, readFile } from "node:fs/promises";

import * as cartService from "../src/services/cart.js";
import { loadCart, saveCart } from "../src/services/cartPersistence.js";
import createItem from "../src/services/item.js";

test("deve somar quantidade quando item repetido for adicionado", () => {
  const cart = [];

  cartService.addItem(cart, createItem("fone bluetooth", 100, 1));
  cartService.addItem(cart, createItem("fone bluetooth", 100, 2));

  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 3);
});

test("deve remover apenas uma unidade do item", () => {
  const cart = [];
  const keyboard = createItem("teclado mecanico", 200, 2);

  cartService.addItem(cart, keyboard);
  cartService.removeItem(cart, keyboard);

  assert.equal(cart[0].quantity, 1);
});

test("deve aplicar cupom percentual ao total", () => {
  const cart = [];

  cartService.addItem(cart, createItem("mouse gamer", 100, 1));
  cartService.applyCoupon(cart, "DIO10");
  const summary = cartService.getSummary(cart);

  assert.equal(summary.productsDiscount, 10);
  assert.equal(summary.total, 102); // 100 - 10 + 12 de frete
});

test("deve validar dados do item", () => {
  assert.throws(() => createItem("", 10, 1));
  assert.throws(() => createItem("produto", 0, 1));
  assert.throws(() => createItem("produto", 10, 0));
});

test("deve lancar erro para cupom invalido", () => {
  const cart = [];

  assert.throws(() => cartService.applyCoupon(cart, "INVALIDO"));
});

test("deve dar frete gratis em subtotal acima do limite", () => {
  const cart = [];

  cartService.addItem(cart, createItem("cadeira gamer", 300, 1));
  const summary = cartService.getSummary(cart);

  assert.equal(summary.shipping, 0);
  assert.equal(summary.total, 300);
});

test("deve salvar e carregar carrinho com cupom", async () => {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "cart-test-"));
  const filePath = path.join(tempDir, "cart.json");
  const cart = [];

  cartService.addItem(cart, createItem("mouse", 150, 2));
  cartService.applyCoupon(cart, "DIO20");

  await saveCart(cart, filePath);
  const loadedCart = await loadCart(filePath);
  const rawSaved = JSON.parse(await readFile(filePath, "utf8"));

  assert.equal(rawSaved.items.length, 1);
  assert.equal(loadedCart.length, 1);
  assert.equal(loadedCart[0].subtotal(), 300);
  assert.equal(loadedCart.coupon.code, "DIO20");
});

test("deve limpar itens e cupom do carrinho", () => {
  const cart = [];

  cartService.addItem(cart, createItem("produto x", 50, 1));
  cartService.applyCoupon(cart, "DIO10");
  cartService.clearCart(cart);

  assert.equal(cart.length, 0);
  assert.equal(cart.coupon, undefined);
});
