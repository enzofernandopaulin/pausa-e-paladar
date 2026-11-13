export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "cestas" | "tabuas";
}

import cesta1 from "@/assets/cesta-1.jpg";
import cesta2 from "@/assets/cesta-2.jpg";
import cesta3 from "@/assets/cesta-3.jpg";
import cesta4 from "@/assets/cesta-4.jpg";
import kraftImg from "@/assets/menu-kraft.jpg";

export const menuItems: MenuItem[] = [
  {
    id: "caixa-kraft",
    name: "Cesta Caixa Kraft",
    price: 160,
    description:
      "Caixa kraft elegante recheada com croissants, waffles, mini torta de chocolate, frios, frutas frescas e suco. Prática e encantadora.",
    image: kraftImg,
    category: "cestas",
  },
  {
    id: "cesta-com-flores",
    name: "Cesta com Flores",
    price: 230,
    description:
      "Cesta artesanal acompanhada de um lindo buquê de flores, croissants quentinhos, suco, frutas frescas, queijos selecionados e doces finos.",
    image: cesta4,
    category: "cestas",
  },
  {
    id: "cesta-comum",
    name: "Cesta Comum",
    price: 180,
    description:
      "Seleção afetiva com croissants, waffles, suco, frutas da estação, frios selecionados, geleia artesanal e mini torta de chocolate.",
    image: cesta1,
    category: "cestas",
  },
  {
    id: "cesta-mdf",
    name: "Cesta de MDF",
    price: 180,
    description:
      "Montada em base de MDF com waffles, croissants, suco fresco, frios, queijos, chocolates e frutas para começar o dia com muito carinho.",
    image: cesta3,
    category: "cestas",
  },
  {
    id: "tabua-frios",
    name: "Tábua de Frios",
    price: 350,
    description:
      "Tábua generosa com queijos nobres (brie, gorgonzola), frios selecionados em formato de rosa, pães artesanais, geleia, frutas frescas e castanhas.",
    image: cesta2,
    category: "tabuas",
  },
];
