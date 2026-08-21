import type {
  ProductComplement,
  ProductComplementGroup,
} from "@/lib/unified-catalog";

export const COMPLEMENT_GROUPS: Record<string, ProductComplementGroup> = {
  "monte-seu-pao-de-queijo-massa": {
    id: "monte-seu-pao-de-queijo-massa",
    title: "Comece escolhendo sua massa de pão de queijo",
    hint: "Escolha 01",
    min: 1,
    max: 1,
    options: [
      {
        id: "massa-provolone",
        name: "Artesanal com queijo provolone",
        price: 0,
      },
      {
        id: "massa-vegana",
        name: "Artesanal com queijo vegano",
        price: 0,
        details: "Zero glúten e Zero leite",
      },
    ],
  },
  "monte-seu-pao-de-queijo-proteina": {
    id: "monte-seu-pao-de-queijo-proteina",
    title: "Hora de escolher suas proteínas",
    hint: "Escolha 01 proteína",
    min: 1,
    max: 1,
    options: [
      { id: "proteina-frango", name: "Frango desfiado", price: 0 },
      {
        id: "proteina-carne-panela",
        name: "Carne de panela ao molho de vinho",
        price: 0,
      },
      {
        id: "proteina-peito-peru",
        name: "Peito de Peru defumado",
        price: 0,
      },
    ],
  },
  "monte-seu-pao-de-queijo-queijo": {
    id: "monte-seu-pao-de-queijo-queijo",
    title: "Escolha o queijo",
    hint: "Escolha 01 queijo",
    min: 1,
    max: 1,
    options: [
      { id: "queijo-cream-cheese", name: "Cream Cheese", price: 0 },
      { id: "queijo-cheddar", name: "Cheddar em fatias", price: 0 },
      {
        id: "queijo-gorgonzola",
        name: "Creme de gorgonzola",
        price: 0,
      },
    ],
  },
  "monte-seu-pao-de-queijo-molho": {
    id: "monte-seu-pao-de-queijo-molho",
    title: "Agora escolha seu molho favorito",
    hint: "Escolha até 02 opções de molho",
    min: 0,
    max: 2,
    options: [
      {
        id: "molho-geleia-pimentao",
        name: "Geleia de pimentão vermelho defumado",
        price: 0,
      },
      { id: "molho-bbq", name: "Molho BBQ", price: 0 },
      { id: "molho-maionese", name: "Maionese", price: 0 },
      {
        id: "molho-especial-sweet",
        name: "Molho especial Sweet",
        price: 0,
      },
    ],
  },
  "monte-seu-pao-de-queijo-salada": {
    id: "monte-seu-pao-de-queijo-salada",
    title: "Uma saladinha cai bem",
    hint: "À vontade",
    min: 0,
    options: [
      { id: "salada-alface", name: "Alface Americana", price: 0 },
      { id: "salada-rucula", name: "Rúcula", price: 0 },
      { id: "salada-tomate", name: "Tomate", price: 0 },
      {
        id: "salada-picles-cebola",
        name: "Picles de cebola roxa",
        price: 0,
      },
    ],
  },
  "monte-seu-pao-de-queijo-adicionais": {
    id: "monte-seu-pao-de-queijo-adicionais",
    title: "Bora turbinar este lanche?",
    hint: "Escolha seus adicionais favoritos",
    min: 0,
    options: [
      {
        id: "extra-bacon",
        name: "Bacon crocante",
        price: 5,
      },
      {
        id: "extra-ovos-mexidos",
        name: "Ovos mexidos",
        price: 5,
      },
      {
        id: "extra-antepasto-berinjela",
        name: "Antepasto de berinjela",
        price: 7,
      },
    ],
  },
  "cobertura-cheesecake-ny": {
    id: "cobertura-cheesecake-ny",
    title: "Complementos",
    hint: "Escolha a cobertura",
    min: 0,
    options: [
      {
        id: "geleia-morango",
        name: "Geleia artesanal de morango",
        price: 0,
      },
      { id: "caramelo-salgado", name: "Caramelo salgado", price: 0 },
      { id: "ganache-chocolate", name: "Ganache de chocolate", price: 0 },
      { id: "churros", name: "Churros", price: 0 },
    ],
  },
  "turbine-croissant": {
    id: "turbine-croissant",
    title: "Complementos",
    hint: "Escolha seus adicionais",
    min: 0,
    options: [
      { id: "goiabada", name: "Goiabada", price: 4 },
      { id: "cream-cheese", name: "Cream Cheese", price: 4 },
      {
        id: "geleia-pimentao-vermelho",
        name: "Geleia de Pimentão Vermelho",
        price: 4,
      },
      { id: "manteiga", name: "Manteiga", price: 4 },
    ],
  },
  "mini-bolo-presenteavel-sabores": {
    id: "mini-bolo-presenteavel-sabores",
    title: "Sabores",
    hint: "Consulte os sabores disponíveis",
    min: 1,
    max: 1,
    options: [
      {
        id: "consultar-sabores-disponiveis",
        name: "Consulte os sabores disponíveis",
        price: 0,
      },
    ],
  },
  "coracao-recheado-sabor": {
    id: "coracao-recheado-sabor",
    title: "Escolha o sabor",
    hint: "Escolha 01",
    min: 1,
    max: 1,
    options: [
      {
        id: "coracao-cheesecake-morango",
        name: "Cheesecake de Morango",
        price: 0,
        details:
          "Chocolate branco recheado com geleia de morango e creme de cheesecake",
      },
      {
        id: "coracao-caramelo-salgado",
        name: "Caramelo Salgado",
        price: 0,
        details:
          "Chocolate meio amargo recheado com caramelo salgado e crocante de praliné de amendoim",
      },
      {
        id: "coracao-doce-de-leite",
        name: "Doce de Leite Artesanal",
        price: 0,
        details:
          "Chocolate caramelizado da Sweet, recheado com creme de doce de leite",
      },
    ],
  },
  "monte-seu-sanduiche-pao": {
    id: "monte-seu-sanduiche-pao",
    title: "Comece escolhendo seu pão favorito",
    hint: "Escolha 01",
    min: 1,
    max: 1,
    options: [
      {
        id: "sanduiche-pao-focaccia",
        name: "Focaccia de fermentação natural com toque de alecrim e azeite",
        price: 0,
      },
      {
        id: "sanduiche-pao-sub",
        name: "Sub fermentação natural com toque de tomate e manjericão",
        price: 0,
      },
      {
        id: "sanduiche-pao-ervas",
        name: "Pão de fermentação longa com toque de ervas finas",
        price: 0,
      },
      {
        id: "sanduiche-pao-croissant",
        name: "Croissant",
        price: 0,
      },
    ],
  },
  "monte-seu-sanduiche-proteina": {
    id: "monte-seu-sanduiche-proteina",
    title: "Hora de escolher suas proteínas",
    hint: "Escolha 01 proteína",
    min: 1,
    max: 1,
    options: [
      { id: "sanduiche-proteina-frango", name: "Frango desfiado", price: 0 },
      {
        id: "sanduiche-proteina-carne-panela",
        name: "Carne de panela ao molho de vinho",
        price: 0,
      },
      {
        id: "sanduiche-proteina-peito-peru",
        name: "Peito de Peru defumado",
        price: 0,
      },
    ],
  },
  "monte-seu-sanduiche-queijo": {
    id: "monte-seu-sanduiche-queijo",
    title: "Escolha o queijo",
    hint: "Escolha 01 queijo",
    min: 1,
    max: 1,
    options: [
      { id: "sanduiche-queijo-cream-cheese", name: "Cream Cheese", price: 0 },
      { id: "sanduiche-queijo-cheddar", name: "Cheddar em fatias", price: 0 },
      {
        id: "sanduiche-queijo-gorgonzola",
        name: "Creme de gorgonzola",
        price: 0,
      },
    ],
  },
  "monte-seu-sanduiche-molho": {
    id: "monte-seu-sanduiche-molho",
    title: "Agora escolha seu molho favorito",
    hint: "Escolha até 02 opções de molho",
    min: 0,
    max: 2,
    options: [
      {
        id: "sanduiche-molho-geleia-pimentao",
        name: "Geleia de pimentão vermelho defumado",
        price: 0,
      },
      { id: "sanduiche-molho-bbq", name: "Molho BBQ", price: 0 },
      { id: "sanduiche-molho-maionese", name: "Maionese", price: 0 },
      {
        id: "sanduiche-molho-especial-sweet",
        name: "Molho especial Sweet",
        price: 0,
      },
    ],
  },
  "monte-seu-sanduiche-salada": {
    id: "monte-seu-sanduiche-salada",
    title: "Uma saladinha cai bem",
    hint: "À vontade",
    min: 0,
    options: [
      { id: "sanduiche-salada-alface", name: "Alface Americana", price: 0 },
      { id: "sanduiche-salada-rucula", name: "Rúcula", price: 0 },
      { id: "sanduiche-salada-tomate", name: "Tomate", price: 0 },
      {
        id: "sanduiche-salada-picles-cebola",
        name: "Picles de cebola roxa",
        price: 0,
      },
    ],
  },
  "monte-seu-sanduiche-adicionais": {
    id: "monte-seu-sanduiche-adicionais",
    title: "Bora turbinar este lanche?",
    hint: "Escolha seus adicionais favoritos",
    min: 0,
    options: [
      {
        id: "sanduiche-extra-bacon",
        name: "Bacon crocante",
        price: 5,
      },
      {
        id: "sanduiche-extra-ovos-mexidos",
        name: "Ovos mexidos",
        price: 5,
      },
      {
        id: "sanduiche-extra-antepasto-berinjela",
        name: "Antepasto de berinjela",
        price: 7,
      },
      {
        id: "sanduiche-extra-proteina",
        name: "Proteína extra",
        price: 7,
      },
      {
        id: "sanduiche-extra-queijo",
        name: "Queijo extra",
        price: 7,
      },
    ],
  },
  "monte-sua-tapioca-proteina": {
    id: "monte-sua-tapioca-proteina",
    title: "Hora de escolher suas proteínas",
    hint: "Escolha 01 proteína",
    min: 1,
    max: 1,
    options: [
      { id: "tapioca-proteina-frango", name: "Frango desfiado", price: 0 },
      {
        id: "tapioca-proteina-carne-panela",
        name: "Carne de panela ao molho de vinho",
        price: 0,
      },
      {
        id: "tapioca-proteina-peito-peru",
        name: "Peito de Peru defumado",
        price: 0,
      },
    ],
  },
  "monte-sua-tapioca-queijo": {
    id: "monte-sua-tapioca-queijo",
    title: "Escolha o queijo",
    hint: "Escolha 01 queijo",
    min: 1,
    max: 1,
    options: [
      { id: "tapioca-queijo-cream-cheese", name: "Cream Cheese", price: 0 },
      { id: "tapioca-queijo-cheddar", name: "Cheddar em fatias", price: 0 },
      {
        id: "tapioca-queijo-gorgonzola",
        name: "Creme de gorgonzola",
        price: 0,
      },
    ],
  },
  "monte-sua-tapioca-molho": {
    id: "monte-sua-tapioca-molho",
    title: "Agora escolha seu molho favorito",
    hint: "Escolha até 02 opções de molho",
    min: 0,
    max: 2,
    options: [
      {
        id: "tapioca-molho-geleia-pimentao",
        name: "Geleia de pimentão vermelho defumado",
        price: 0,
      },
      { id: "tapioca-molho-bbq", name: "Molho BBQ", price: 0 },
      { id: "tapioca-molho-maionese", name: "Maionese", price: 0 },
      {
        id: "tapioca-molho-especial-sweet",
        name: "Molho especial Sweet",
        price: 0,
      },
    ],
  },
  "monte-sua-tapioca-salada": {
    id: "monte-sua-tapioca-salada",
    title: "Uma saladinha cai bem",
    hint: "À vontade",
    min: 0,
    options: [
      { id: "tapioca-salada-alface", name: "Alface Americana", price: 0 },
      { id: "tapioca-salada-rucula", name: "Rúcula", price: 0 },
      { id: "tapioca-salada-tomate", name: "Tomate", price: 0 },
      {
        id: "tapioca-salada-picles-cebola",
        name: "Picles de cebola roxa",
        price: 0,
      },
    ],
  },
  "monte-sua-tapioca-adicionais": {
    id: "monte-sua-tapioca-adicionais",
    title: "Bora turbinar este lanche?",
    hint: "Escolha seus adicionais favoritos",
    min: 0,
    options: [
      {
        id: "tapioca-extra-bacon",
        name: "Bacon crocante",
        price: 5,
      },
      {
        id: "tapioca-extra-ovos-mexidos",
        name: "Ovos mexidos",
        price: 5,
      },
      {
        id: "tapioca-extra-antepasto-berinjela",
        name: "Antepasto de berinjela",
        price: 7,
      },
      {
        id: "tapioca-extra-proteina",
        name: "Proteína extra",
        price: 7,
      },
      {
        id: "tapioca-extra-queijo",
        name: "Queijo extra",
        price: 7,
      },
    ],
  },
  "refrigerantes-lata-sabor": {
    id: "refrigerantes-lata-sabor",
    title: "Escolha o refrigerante",
    hint: "Escolha 01",
    min: 1,
    max: 1,
    options: [
      { id: "lata-coca", name: "Coca", price: 0 },
      { id: "lata-coca-zero", name: "Coca Zero", price: 0 },
      { id: "lata-sprite", name: "Sprite", price: 0 },
      { id: "lata-sprite-zero", name: "Sprite Zero", price: 0 },
      { id: "lata-schweppes", name: "Schweppes", price: 0 },
      {
        id: "lata-schweppes-baixo-acucares",
        name: "Schweppes Baixo em Açúcares",
        price: 0,
      },
    ],
  },
};

const PRODUCT_COMPLEMENT_GROUP_IDS: Record<string, string[]> = {
  "cheesecake-pistache-cerejas-new-york": ["cobertura-cheesecake-ny"],
  "refrigerantes-lata-350ml": ["refrigerantes-lata-sabor"],
  "croissant-amanteigado": ["turbine-croissant"],
  "pao-de-queijo": ["turbine-croissant"],
  "mini-bolo-especial": ["mini-bolo-presenteavel-sabores"],
  "coracao-de-ouro": ["coracao-recheado-sabor"],
  "monte-seu-sanduiche": [
    "monte-seu-sanduiche-pao",
    "monte-seu-sanduiche-proteina",
    "monte-seu-sanduiche-queijo",
    "monte-seu-sanduiche-molho",
    "monte-seu-sanduiche-salada",
    "monte-seu-sanduiche-adicionais",
  ],
  "monte-sua-tapioca": [
    "monte-sua-tapioca-proteina",
    "monte-sua-tapioca-queijo",
    "monte-sua-tapioca-molho",
    "monte-sua-tapioca-salada",
    "monte-sua-tapioca-adicionais",
  ],
  "monte-seu-pao-de-queijo": [
    "monte-seu-pao-de-queijo-massa",
    "monte-seu-pao-de-queijo-proteina",
    "monte-seu-pao-de-queijo-queijo",
    "monte-seu-pao-de-queijo-molho",
    "monte-seu-pao-de-queijo-salada",
    "monte-seu-pao-de-queijo-adicionais",
  ],
};

export function getProductComplementGroups(
  productId: string
): ProductComplementGroup[] {
  const groupIds = PRODUCT_COMPLEMENT_GROUP_IDS[productId] ?? [];
  return groupIds
    .map((groupId) => COMPLEMENT_GROUPS[groupId])
    .filter((group): group is ProductComplementGroup => Boolean(group))
    .filter((group) => group.options.length > 0);
}

export function flattenComplementGroups(
  groups: ProductComplementGroup[]
): ProductComplement[] {
  return groups.flatMap((group) => group.options);
}

export function getProductComplements(productId: string) {
  return flattenComplementGroups(getProductComplementGroups(productId));
}
