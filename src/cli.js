import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import * as cartService from "./services/cart.js";
import { loadCart, saveCart } from "./services/cartPersistence.js";
import createItem from "./services/item.js";

function showMenu() {
  console.log("\n=== Menu Carrinho Shopee ===");
  console.log("1. Listar carrinho");
  console.log("2. Adicionar item");
  console.log("3. Remover uma unidade");
  console.log("4. Deletar item por nome");
  console.log("5. Aplicar cupom");
  console.log("6. Remover cupom");
  console.log("7. Mostrar resumo");
  console.log("8. Limpar carrinho");
  console.log("9. Salvar carrinho");
  console.log("0. Sair");
}

async function promptItem(rl) {
  const name = (await rl.question("Nome do item: ")).trim();
  const price = Number((await rl.question("Preco: ")).trim().replace(",", "."));
  const quantity = Number((await rl.question("Quantidade: ")).trim());
  return createItem(name, price, quantity);
}

async function runCli() {
  const rl = createInterface({ input, output });
  const myCart = await loadCart();

  console.log("Carrinho carregado. Use o menu para operar.");

  try {
    while (true) {
      showMenu();
      const option = (await rl.question("Escolha uma opcao: ")).trim();

      try {
        if (option === "1") {
          cartService.displaycart(myCart);
          continue;
        }

        if (option === "2") {
          const item = await promptItem(rl);
          cartService.addItem(myCart, item);
          console.log("Item adicionado com sucesso.");
          continue;
        }

        if (option === "3") {
          const name = (await rl.question("Nome do item para remover uma unidade: ")).trim();
          cartService.removeItem(myCart, { name });
          continue;
        }

        if (option === "4") {
          const name = (await rl.question("Nome do item para deletar: ")).trim();
          cartService.deleteItem(myCart, name);
          console.log("Item deletado (se encontrado).");
          continue;
        }

        if (option === "5") {
          const coupon = (await rl.question("Cupom: ")).trim();
          cartService.applyCoupon(myCart, coupon);
          console.log("Cupom aplicado.");
          continue;
        }

        if (option === "6") {
          cartService.removeCoupon(myCart);
          console.log("Cupom removido.");
          continue;
        }

        if (option === "7") {
          cartService.displaycart(myCart);
          cartService.calculateTotal(myCart);
          continue;
        }

        if (option === "8") {
          cartService.clearCart(myCart);
          console.log("Carrinho limpo.");
          continue;
        }

        if (option === "9") {
          await saveCart(myCart);
          console.log("Carrinho salvo.");
          continue;
        }

        if (option === "0") {
          await saveCart(myCart);
          console.log("Carrinho salvo. Saindo...");
          break;
        }

        console.log("Opcao invalida.");
      } catch (error) {
        console.log(`Erro: ${error.message}`);
      }
    }
  } finally {
    rl.close();
  }
}

runCli();
