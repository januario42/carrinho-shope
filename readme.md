# Carrinho Shopee (Projeto da DIO)

Este repositorio e uma evolucao do desafio de Node.js da [DIO](https://www.dio.me/), com novas regras de negocio para simular um carrinho de compras.

## O que foi implementado

- Validacao de dados ao criar item (`nome`, `preco`, `quantidade`)
- Consolidacao de itens repetidos no carrinho
- Remocao por unidade do produto
- Cupons de desconto (`DIO10`, `DIO20`, `FRETEGRATIS`)
- Calculo de frete com regra de frete gratis por valor minimo
- Resumo completo do pedido (subtotal, descontos, frete e total)
- Persistencia do carrinho em arquivo JSON (`data/cart.json`)
- CLI interativa com menu para operacoes de carrinho
- Testes automatizados com `node:test`

## Estrutura

```txt
src/
  cli.js
  index.js
  services/
    cart.js
    cartPersistence.js
    item.js
test/
  cart.test.js
```

## Requisitos

- Node.js 18+

## Como executar

```bash
npm install
npm run start
```

`npm run start` executa um fluxo de exemplo e salva automaticamente o estado do carrinho.

## Modo interativo (CLI)

```bash
npm run cli
```

No modo CLI, voce pode:

- Adicionar/remover itens
- Aplicar/remover cupom
- Limpar carrinho
- Visualizar resumo
- Salvar e sair com persistencia

## Como testar

```bash
npm test
```

## Exemplo de cupons

- `DIO10`: 10% de desconto nos produtos
- `DIO20`: 20% de desconto nos produtos
- `FRETEGRATIS`: 100% de desconto no frete

## Creditos

Projeto base do desafio da **DIO (Digital Innovation One)**, expandido com novas implementacoes para estudo de logica, modularizacao e regras de negocio em Node.js.
