export const RAFFLE_CONFIG = {
  // 👇 ALTERE AQUI para mudar a quantidade de pontos da rifa
  TOTAL_POINTS: 200,

  // 👇 ALTERE AQUI para mudar o preço por ponto (em reais)
  PRICE_PER_POINT: 10.00,

  // 👇 ALTERE AQUI com sua chave PIX real
  PIX_KEY: "88998633123",
  PIX_KEY_TYPE: "TELEFONE", // CPF | CNPJ | EMAIL | TELEFONE | ALEATORIA
  PIX_HOLDER_NAME: "Antonio Elias de Lima Coelho",
  PIX_HOLDER_INFO: "(filho da Selma)",

  // 👇 ALTERE AQUI com o link real do grupo
  WHATSAPP_GROUP_LINK: "https://chat.whatsapp.com/HASjxrItI286XzCLyWAA4t?mode=gi_t",

  // 👇 ALTERE AQUI com o nome e descrição do prêmio
  RAFFLE_NAME: "Rifa de Dia das Mães",
  RAFFLE_PRIZE: "Cesta de Maquiagem e Cosmético - Em prol de Selma",

  // 👇 ALTERE AQUI para marcar pontos já vendidos (simulação inicial)
  RESERVED_POINTS: [] as number[],

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
