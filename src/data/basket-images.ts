import type { GsapFlipCardItem } from "@/components/ui/gsap-card-flip";

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=1000&fit=crop&auto=format&q=80`;

export const basketItems: GsapFlipCardItem[] = [
  {
    id: "cafe-manha",
    image: UNSPLASH("1517430816045-df4b7de11d1d"), // breakfast basket
    alt: "Cesta de café da manhã com pães, frutas e doces",
    caption: "Pães artesanais, frutas da estação e doces caseiros.",
  },
  {
    id: "tabua-compartilhar",
    image: UNSPLASH("1505576399279-565b52d4ac71"), // charcuterie board
    alt: "Tábua de queijos, frios e geleias para compartilhar",
    caption: "Queijos selecionados, frios premium e geleias artesanais.",
  },
  {
    id: "caixa-mimos",
    image: UNSPLASH("1549903089-2e1f9e1c5c8c"), // gift box
    alt: "Caixa de mimos com doces e biscoitos artesanais",
    caption: "Seleção afetiva de biscoitos, chocolates e surpresas.",
  },
  {
    id: "cesta-aniversario",
    image: UNSPLASH("1551024709-e8e17c8b7e7d"), // birthday basket
    alt: "Cesta especial de aniversário com bolo e presentes",
    caption: "Bolo artesanal, velas e mimos para celebrar a data.",
  },
  {
    id: "tabua-doces",
    image: UNSPLASH("1563805042-7684c019e1cb"), // dessert board
    alt: "Tábua de doces variados e frutas",
    caption: "Doces finos, frutas frescas e caldas artesanais.",
  },
  {
    id: "cesta-romantica",
    image: UNSPLASH("1519676870-2b2b8b5b8a1e"), // romantic breakfast
    alt: "Cesta romântica para duas pessoas",
    caption: "Tudo para um café da manhã a dois inesquecível.",
  },
];
