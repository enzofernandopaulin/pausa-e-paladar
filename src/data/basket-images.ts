import type { GsapFlipCardItem } from "@/components/ui/gsap-card-flip";
import cesta1 from "@/assets/cesta-1.jpg";
import cesta2 from "@/assets/cesta-2.jpg";
import cesta3 from "@/assets/cesta-3.jpg";
import cesta4 from "@/assets/cesta-4.jpg";

export const basketItems: GsapFlipCardItem[] = [
  {
    id: "cafe-manha",
    image: cesta1,
    alt: "Cesta de café da manhã com croissants, waffles, suco, frutas e doces",
    caption:
      "Croissants quentinhos, waffles, suco de laranja e uma seleção afetiva de frutas e doces.",
  },
  {
    id: "tabua-compartilhar",
    image: cesta2,
    alt: "Tábua de queijos, frios, geleias e frutas para compartilhar",
    caption:
      "Queijos selecionados, frios premium, geleia artesanal e frutas da estação para um momento a dois.",
  },
  {
    id: "caixa-mimos",
    image: cesta3,
    alt: "Cesta com suco, waffles, croissants, torta de chocolate, frutas e salgados",
    caption:
      "Torta de chocolate, croissants, waffles, salgados e frutas frescas — um carinho bem vivido.",
  },
  {
    id: "cesta-romantica",
    image: cesta4,
    alt: "Cesta romântica com flores, suco, queijos, frios, frutas e doces",
    caption: "Buquê de flores, queijos, frios, frutas e doces finos para presentear com carinho.",
  },
];
