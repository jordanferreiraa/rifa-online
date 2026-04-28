export const RAFFLE_CONFIG = {
  // 👇 ALTERE AQUI para mudar a quantidade de pontos da rifa
  TOTAL_POINTS: 200,

  // 👇 ALTERE AQUI para mudar o preço por ponto (em reais)
  PRICE_PER_POINT: 5.00,

  // 👇 ALTERE AQUI com sua chave PIX real
  PIX_KEY: "seuemail@exemplo.com",
  PIX_KEY_TYPE: "EMAIL", // CPF | CNPJ | EMAIL | TELEFONE | ALEATORIA

  // 👇 ALTERE AQUI com o link real do grupo
  WHATSAPP_GROUP_LINK: "https://chat.whatsapp.com/SUBSTITUIR",

  // 👇 ALTERE AQUI com o nome e descrição do prêmio
  RAFFLE_NAME: "Rifa [Nome do Prêmio]",
  RAFFLE_PRIZE: "Descrição do prêmio",

  // 👇 ALTERE AQUI para marcar pontos já vendidos (simulação inicial)
  RESERVED_POINTS: [3, 17, 42, 98, 150] as number[],

  // 👇 Configurações visuais do grid — ajustam automaticamente com TOTAL_POINTS
  GRID_COLUMNS: {
    mobile: 5,   // colunas no celular
    tablet: 10,  // colunas no tablet
    desktop: 10, // colunas no desktop
  },
} as const;

// Derivados automáticos — NÃO alterar, calculados a partir do RAFFLE_CONFIG
export const RAFFLE_DERIVED = {
  MAX_VALUE: RAFFLE_CONFIG.TOTAL_POINTS * RAFFLE_CONFIG.PRICE_PER_POINT,
  POINT_LABEL: (n: number) =>
    String(n).padStart(String(RAFFLE_CONFIG.TOTAL_POINTS).length, "0"),
};
