# Sistema de Rifa Virtual

Este é um sistema de rifa virtual completo, responsivo e funcional, desenvolvido com Next.js 14+, Tailwind CSS e Zustand.

## 🚀 Tecnologias Utilizadas

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + Shadcn/ui
- **Estado:** Zustand + Persistência (LocalStorage)
- **Formulários:** React Hook Form + Zod
- **QR Code:** qrcode.react
- **Animações:** Framer Motion

## ⚙️ Como Configurar a Rifa

Toda a configuração do sistema é feita em um único arquivo: `lib/constants.ts`.

Abra o arquivo `lib/constants.ts` e altere os valores conforme sua necessidade:

```typescript
export const RAFFLE_CONFIG = {
  // Quantidade total de números da rifa
  TOTAL_POINTS: 200,

  // Preço de cada número (em reais)
  PRICE_PER_POINT: 5.00,

  // Sua chave PIX para recebimento
  PIX_KEY: "seuemail@exemplo.com",
  PIX_KEY_TYPE: "EMAIL", // Opções: CPF | CNPJ | EMAIL | TELEFONE | ALEATORIA

  // Link do grupo de WhatsApp para os participantes
  WHATSAPP_GROUP_LINK: "https://chat.whatsapp.com/...",

  // Nome da rifa e descrição do prêmio
  RAFFLE_NAME: "Rifa Solidária",
  RAFFLE_PRIZE: "iPhone 15 Pro Max",

  // Números que já foram vendidos/reservados (aparecerão desabilitados)
  RESERVED_POINTS: [3, 17, 42, 98, 150],

  // Quantidade de colunas no grid por dispositivo
  GRID_COLUMNS: {
    mobile: 5,
    tablet: 10,
    desktop: 10,
  },
} as const;
```

## 🛠️ Instalação e Execução

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse `http://localhost:3000` no seu navegador.

## 📱 Fluxo do Usuário

1. **Cadastro:** O usuário informa nome e WhatsApp.
2. **Seleção:** Escolha de um ou mais números no grid interativo.
3. **Pagamento:** Resumo do pedido e exibição do QR Code PIX.
4. **Confirmação:** Após confirmar o pagamento, o usuário vê seus números e recebe o link do grupo.

## 📄 Licença

Este projeto está sob a licença MIT.
