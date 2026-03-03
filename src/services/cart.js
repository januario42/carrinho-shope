// Quais acoes meu carrinho pode fazer
const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const cartConfig = {
  shippingFee: 12,
  freeShippingThreshold: 250,
};

function normalizeName(name) {
  return String(name).trim().toLowerCase();
}

function formatMoney(value) {
  return currencyFormatter.format(value);
}

function getSubtotal(userCart) {
  return userCart.reduce((total, item) => total + item.subtotal(), 0);
}

function getShipping(subtotal) {
  if (subtotal <= 0) {
    return 0;
  }

  return subtotal >= cartConfig.freeShippingThreshold ? 0 : cartConfig.shippingFee;
}

// CASOS DE USO
// -> adicionar item no carrinho (consolida item repetido)
function addItem(userCart, item) {
  const indexFound = userCart.findIndex(
    (currentItem) => normalizeName(currentItem.name) === normalizeName(item.name)
  );

  if (indexFound === -1) {
    userCart.push(item);
    return;
  }

  userCart[indexFound].quantity += item.quantity;
}

// -> aplicar cupom de desconto
function applyCoupon(userCart, couponCode) {
  const couponMap = {
    DIO10: { type: "percentage", value: 10 },
    DIO20: { type: "percentage", value: 20 },
    FRETEGRATIS: { type: "shipping", value: 100 },
  };

  const normalizedCode = String(couponCode).trim().toUpperCase();
  const selectedCoupon = couponMap[normalizedCode];

  if (!selectedCoupon) {
    throw new Error("Cupom invalido.");
  }

  userCart.coupon = {
    code: normalizedCode,
    ...selectedCoupon,
  };
}

// -> remover cupom
function removeCoupon(userCart) {
  delete userCart.coupon;
}

function getDiscount(userCart, subtotal, shipping) {
  const coupon = userCart.coupon;

  if (!coupon) {
    return { productsDiscount: 0, shippingDiscount: 0 };
  }

  if (coupon.type === "percentage") {
    return {
      productsDiscount: subtotal * (coupon.value / 100),
      shippingDiscount: 0,
    };
  }

  if (coupon.type === "shipping") {
    return {
      productsDiscount: 0,
      shippingDiscount: Math.min(shipping, shipping * (coupon.value / 100)),
    };
  }

  return { productsDiscount: 0, shippingDiscount: 0 };
}

function getSummary(userCart) {
  const subtotal = getSubtotal(userCart);
  const shipping = getShipping(subtotal);
  const { productsDiscount, shippingDiscount } = getDiscount(userCart, subtotal, shipping);
  const total = subtotal - productsDiscount + (shipping - shippingDiscount);

  return {
    itemsCount: userCart.reduce((count, item) => count + item.quantity, 0),
    subtotal,
    productsDiscount,
    shipping,
    shippingDiscount,
    total,
    couponCode: userCart.coupon?.code ?? null,
  };
}

// -> calcular o total do carrinho
function calculateTotal(userCart) {
  const summary = getSummary(userCart);

  console.log("\nResumo do carrinho:");
  console.log(`Itens: ${summary.itemsCount}`);
  console.log(`Subtotal: ${formatMoney(summary.subtotal)}`);
  console.log(`Desconto em produtos: -${formatMoney(summary.productsDiscount)}`);
  console.log(`Frete: ${formatMoney(summary.shipping)}`);
  console.log(`Desconto no frete: -${formatMoney(summary.shippingDiscount)}`);

  if (summary.couponCode) {
    console.log(`Cupom aplicado: ${summary.couponCode}`);
  }

  console.log(`Total final: ${formatMoney(summary.total)}`);
  return summary.total;
}

// -> deletar item do carrinho
function deleteItem(userCart, name) {
  const index = userCart.findIndex((item) => normalizeName(item.name) === normalizeName(name));

  if (index !== -1) {
    userCart.splice(index, 1);
  }
}

// -> remover um item (diminui uma unidade)
function removeItem(userCart, item) {
  const indexFound = userCart.findIndex(
    (currentItem) => normalizeName(currentItem.name) === normalizeName(item.name)
  );

  if (indexFound === -1) {
    console.log("Item nao encontrado.");
    return;
  }

  if (userCart[indexFound].quantity > 1) {
    userCart[indexFound].quantity -= 1;
    return;
  }

  userCart.splice(indexFound, 1);
}

// -> limpar carrinho
function clearCart(userCart) {
  userCart.length = 0;
  removeCoupon(userCart);
}

// -> mostrar todos os itens do carrinho
function displaycart(userCart) {
  if (userCart.length === 0) {
    console.log("\nShopee cart list: (vazio)");
    return;
  }

  console.log("\nShopee cart list:");
  userCart.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.name} - ${formatMoney(item.price)} | ${
        item.quantity
      }x | Subtotal = ${formatMoney(item.subtotal())}`
    );
  });
}

export {
  addItem,
  applyCoupon,
  calculateTotal,
  clearCart,
  deleteItem,
  displaycart,
  getSummary,
  removeCoupon,
  removeItem,
};
