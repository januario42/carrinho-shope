import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import createItem from "./item.js";

const DEFAULT_CART_PATH = path.resolve(process.cwd(), "data", "cart.json");

function toSerializableCart(userCart) {
  return {
    items: userCart.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
    coupon: userCart.coupon ?? null,
  };
}

function toRuntimeCart(rawData) {
  const runtimeCart = Array.isArray(rawData.items)
    ? rawData.items.map((item) => createItem(item.name, item.price, item.quantity))
    : [];

  if (rawData.coupon) {
    runtimeCart.coupon = rawData.coupon;
  }

  return runtimeCart;
}

async function saveCart(userCart, filePath = DEFAULT_CART_PATH) {
  const payload = toSerializableCart(userCart);
  const targetDir = path.dirname(filePath);

  await mkdir(targetDir, { recursive: true });
  await writeFile(filePath, JSON.stringify(payload, null, 2), "utf8");
}

async function loadCart(filePath = DEFAULT_CART_PATH) {
  try {
    const rawContent = await readFile(filePath, "utf8");
    const parsed = JSON.parse(rawContent);
    return toRuntimeCart(parsed);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export { DEFAULT_CART_PATH, loadCart, saveCart };
