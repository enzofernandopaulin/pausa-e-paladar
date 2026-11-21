import cesta1 from "@/assets/cesta-1.webp";
import cesta2 from "@/assets/cesta-2.webp";
import cesta3 from "@/assets/cesta-3.webp";
import cesta4 from "@/assets/cesta-4.webp";

export type MenuSize = {
  label: "P" | "M" | "G";
  price: string;
  serve: string;
  detail?: string;
};

export type MenuOption = {
  label: string;
  price: string;
};

export type MenuOrderSelection = {
  category?: string;
  size?: MenuSize;
  options?: MenuOption[];
};

export type MenuProduct = {
  id: string;
  name: string;
  description: string;
  composition?: string[];
  sizes?: MenuSize[];
  options?: MenuOption[];
  optionMode?: "single" | "multiple";
  image?: string;
  imageAlt?: string;
};

export type MenuSection = {
  id: "tabuas" | "cestas" | "adicionais";
  label: string;
  intro: string;
  products: MenuProduct[];
};

export const menuSections: MenuSection[] = [
  {
    id: "tabuas",
    label: "Tábuas",
    intro: "Curadorias para compartilhar, presentear e intensificar o paladar.",
    products: [
      {
        id: "tabuas-classicas",
        name: "Tábuas clássicas",
        description: "Uma curadoria equilibrada que prioriza sabor e tradição.",
        composition: [
          "Queijos: muçarela, prato e meia cura.",
          "Charcutaria: salame, presunto e peito de peru.",
          "Antepastos: azeitonas, tomate cereja, amendoim, geleia e torradas.",
        ],
        sizes: [
          { label: "P", price: "A partir de R$ 155,00", serve: "Serve até 2 pessoas." },
          { label: "M", price: "A partir de R$ 260,00", serve: "Serve até 6 pessoas." },
          { label: "G", price: "A partir de R$ 480,00", serve: "Serve até 10 pessoas." },
        ],
        image: cesta2,
        imageAlt: "Tábua artesanal com queijos, frios, frutas e acompanhamentos",
      },
      {
        id: "tabuas-premium",
        name: "Tábuas premium",
        description: "Uma curadoria nobre que intensifica o paladar com seu contraste sensorial.",
        composition: [
          "Queijos: Gouda, parmesão, provolone e gorgonzola.",
          "Charcutaria: copa, salame italiano e lombo defumado.",
          "Antepastos: patê, azeitonas, pães, torradas e grissinis.",
          "Acompanhamentos: frutas da época, frutas secas, castanhas e geleia.",
        ],
        sizes: [
          { label: "P", price: "A partir de R$ 195,00", serve: "Serve até 2 pessoas." },
          { label: "M", price: "A partir de R$ 365,00", serve: "Serve até 6 pessoas." },
          { label: "G", price: "A partir de R$ 600,00", serve: "Serve até 10 pessoas." },
        ],
        imageAlt: "Fotografia específica da tábua premium ainda não disponível",
      },
    ],
  },
  {
    id: "cestas",
    label: "Cestas",
    intro: "Presentes artesanais para começar o dia, celebrar ou dizer lembrei de você.",
    products: [
      {
        id: "cestas-simples",
        name: "Cestas simples",
        description: "Uma seleção essencial para transformar uma pausa em carinho.",
        composition: ["Pães, frios, geleia, fruta da estação, suco natural e café."],
        options: [
          { label: "Caixa Kraft", price: "R$ 110,00" },
          { label: "Bandeja MDF", price: "R$ 125,00" },
        ],
        optionMode: "single",
        image: cesta1,
        imageAlt: "Cesta de café da manhã com pães, frios, frutas e suco",
      },
      {
        id: "cestas-classicas",
        name: "Cestas clássicas",
        description: "Uma composição afetiva para celebrar manhãs e momentos especiais.",
        composition: [
          "Pães, mini bolo, biscoitos ou torradas, frios, geleia, fruta da estação, iogurte, suco natural e café.",
        ],
        options: [
          { label: "Caixa Kraft", price: "R$ 160,00" },
          { label: "Bandeja MDF", price: "R$ 175,00" },
        ],
        optionMode: "single",
        image: cesta3,
        imageAlt: "Cesta artesanal com waffles, croissants, frutas e doces",
      },
      {
        id: "cestas-premium",
        name: "Cestas premium",
        description: "Uma experiência completa, com mais camadas de sabor e cuidado.",
        composition: [
          "Pães, mini bolo, biscoitos ou torradas, waffle, frios, geleia, requeijão, fruta da estação, iogurte, suco natural, café gourmet, chá, chocolate e oleaginosas.",
        ],
        options: [
          { label: "Caixa Kraft", price: "R$ 195,00" },
          { label: "Bandeja MDF", price: "R$ 210,00" },
        ],
        optionMode: "single",
        image: cesta4,
        imageAlt: "Cesta premium com flores, frutas, queijos, frios e doces",
      },
    ],
  },
  {
    id: "adicionais",
    label: "Adicionais e experiências",
    intro: "Detalhes para personalizar o presente e experiências sob encomenda.",
    products: [
      {
        id: "adicionais-tabuas",
        name: "Adicionais para tábuas",
        description: "Um complemento para deixar a composição ainda mais especial.",
        composition: ["Vinho: valor a consultar."],
        imageAlt: "Fotografia específica do adicional para tábuas ainda não disponível",
      },
      {
        id: "adicionais-cestas",
        name: "Adicionais para cestas",
        description: "Pequenos gestos que deixam a cesta com a cara de quem vai receber.",
        options: [
          { label: "Caneca personalizada", price: "R$ 30,00" },
          { label: "Flores", price: "R$ 35,00" },
          { label: "Mel", price: "R$ 8,00" },
          { label: "Cappuccino", price: "R$ 5,00" },
        ],
        optionMode: "multiple",
        imageAlt: "Fotografia específica dos adicionais para cestas ainda não disponível",
      },
      {
        id: "experiencias-sob-encomenda",
        name: "Experiências sob encomenda",
        description: "Montagens pensadas para ocasiões que pedem um cuidado especial.",
        options: [
          { label: "Cesta para casal", price: "Sob encomenda" },
          { label: "Montagem de mesa de frios", price: "Sob encomenda" },
        ],
        optionMode: "multiple",
        imageAlt: "Fotografia específica da experiência sob encomenda ainda não disponível",
      },
    ],
  },
];

export const sizeGuide = [
  {
    label: "P",
    weight: "Aproximadamente 600g.",
    detail: "Ideal para um jantar romântico ou presentear alguém especial.",
  },
  {
    label: "M",
    weight: "Aproximadamente 1kg.",
    detail: "Ideal para encontros entre amigos ou família.",
  },
  {
    label: "G",
    weight: "Aproximadamente 1,5kg.",
    detail: "Opção para reuniões, celebrações e eventos.",
  },
];

export const whatsappNumber = "5513996542775";
export const instagramUrl = "https://instagram.com/pausaepaladar";

export function getWhatsAppUrl(productName?: string, selection?: MenuOrderSelection) {
  const message = productName
    ? [
        "Olá! Gostaria de fazer uma encomenda na Pausa & Paladar.",
        "",
        `Produto: ${productName}`,
        selection?.category ? `Categoria: ${selection.category}` : undefined,
        selection?.size ? `Tamanho: ${selection.size.label}` : undefined,
        selection?.size ? `Valor inicial: ${selection.size.price}` : undefined,
        selection?.options?.length
          ? `Opção${selection.options.length > 1 ? "ões" : ""}: ${selection.options.map((option) => `${option.label} (${option.price})`).join(", ")}`
          : undefined,
        "",
        "Gostaria de saber mais sobre a disponibilidade.",
      ]
        .filter(Boolean)
        .join("\n")
    : "Olá! Quero fazer uma encomenda no Pausa & Paladar.";

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
