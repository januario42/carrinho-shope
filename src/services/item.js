// CASOS DE USO DOS ITENS
function validateItem(name, price, quantity) {
  if (!name || typeof name !== "string") {
    throw new Error("O nome do item deve ser uma string valida.");
  }

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("O preco do item deve ser um numero maior que zero.");
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("A quantidade do item deve ser um inteiro maior que zero.");
  }
}

// -> criar item com subtotal certo
function createItem(name, price, quantity) {
  validateItem(name, price, quantity);

  return {
    name: name.trim(),
    price,
    quantity,
    subtotal() {
      return this.price * this.quantity;
    },
  };
}

export default createItem;
