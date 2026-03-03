# Carrinho Shopee em Node.js

Projeto de estudo em JavaScript/Node.js inspirado no desafio da **DIO (Digital Innovation One)** para simular a logica de um carrinho de compras.

## Visao geral

Este projeto implementa regras comuns de e-commerce:

- cadastro e validacao de itens
- consolidacao de produtos repetidos
- aplicacao de cupons
- calculo de frete e total final
- persistencia do estado em arquivo JSON
- interface CLI interativa

## Funcionalidades

- Validacao ao criar item (`nome`, `preco`, `quantidade`)
- Soma de quantidade para itens com o mesmo nome
- Remocao de uma unidade por vez
- Exclusao de item por nome
- Cupons:
  - `DIO10` (10% nos produtos)
  - `DIO20` (20% nos produtos)
  - `FRETEGRATIS` (100% de desconto no frete)
- Frete configurado:
  - `R$ 12,00` abaixo de `R$ 250,00`
  - gratis a partir de `R$ 250,00`
- Resumo de compra com subtotal, descontos, frete e total
- Salvamento/carregamento do carrinho em `data/cart.json`

## Estrutura do projeto

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
data/
  cart.json (gerado automaticamente)
```

## Requisitos

- Node.js 18 ou superior
- npm

## Instalacao

```bash
npm install
```

## Como executar

Fluxo de exemplo:

```bash
npm run start
```

Esse comando executa um cenário padrao e salva o estado do carrinho.

## CLI interativa

Para operar o carrinho manualmente:

```bash
npm run cli
```

Menu disponivel:

1. Listar carrinho  
2. Adicionar item  
3. Remover uma unidade  
4. Deletar item por nome  
5. Aplicar cupom  
6. Remover cupom  
7. Mostrar resumo  
8. Limpar carrinho  
9. Salvar carrinho  
0. Sair (salvando automaticamente)

## Testes

```bash
npm test
```

Cobertura atual inclui:

- regras de adicao/remocao
- validacao de item
- aplicacao de cupom invalido/valido
- regra de frete gratis
- persistencia (save/load)
- limpeza completa do carrinho

## Persistencia de dados

O carrinho e salvo no arquivo:

```txt
data/cart.json
```

Se o arquivo nao existir, ele e criado automaticamente na primeira operacao de salvamento.

## Projeto base (DIO)

Este repositorio foi iniciado a partir do contexto educacional da **DIO** e expandido com novas implementacoes para pratica de:

- modularizacao
- regras de negocio
- testes automatizados
- manipulacao de arquivos no Node.js

