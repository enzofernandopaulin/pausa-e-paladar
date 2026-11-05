import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  Heart,
  Instagram,
  Menu,
  MessageCircle,
  Package,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { Wordmark } from "@/components/Logo";
import { HeroArt, BrunchArt, CakeArt, PlateArt } from "@/components/Art";

const title = "Pausa e Paladar — Cestas & tábuas artesanais";
const desc =
  "Cestas de café da manhã, tábuas de doces e presentes montados com carinho para celebrar o agora.";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  { href: "#a-marca", label: "A marca" },
  { href: "#colecoes", label: "Cestas & tábuas" },
  { href: "#encomendas", label: "Encomendas" },
];
const Wrap = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
);

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md">
      <Wrap className="flex h-18 items-center justify-between py-3">
        <a
          href="#topo"
          className="flex items-center gap-3"
          aria-label="Pausa e Paladar — início"
          onClick={() => setOpen(false)}
        >
          <Wordmark className="h-12 w-40 object-contain" />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm transition-colors hover:text-gold">
              {n.label}
            </a>
          ))}
          <a href="#encomendas" className="btn bg-primary text-primary-foreground hover:bg-gold">
            Fazer encomenda <ArrowRight size={15} />
          </a>
        </nav>
        <button
          className="grid h-12 w-12 place-items-center rounded-full border md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Wrap>
      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu mobile"
          className="border-t bg-background md:hidden"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        >
          <Wrap className="flex flex-col gap-1 py-4">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 font-display text-2xl"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#encomendas"
              onClick={() => setOpen(false)}
              className="btn mt-2 bg-primary text-primary-foreground"
            >
              Fazer encomenda <ArrowRight size={15} />
            </a>
          </Wrap>
        </nav>
      )}
    </header>
  );
}

const collections = [
  {
    t: "Cesta café da manhã",
    k: "Para começar o dia sorrindo",
    d: "Pães, doces, frutas e pequenos cuidados reunidos numa cesta feita para surpreender.",
    p: "A partir de R$ 89",
    Art: BrunchArt,
    c: "bg-primary text-primary-foreground",
    r: "md:-rotate-1",
  },
  {
    t: "Tábua para compartilhar",
    k: "Feita para abrir e ficar",
    d: "Queijos, frios, geleias e docinhos escolhidos para transformar qualquer encontro em celebração.",
    p: "A partir de R$ 119",
    Art: PlateArt,
    c: "bg-sage text-primary md:translate-y-12",
    r: "",
  },
  {
    t: "Caixa de mimos",
    k: "Um carinho em cada detalhe",
    d: "Uma seleção afetiva de doces, biscoitos e surpresas para dizer o que às vezes falta em palavras.",
    p: "Montagem personalizada",
    Art: CakeArt,
    c: "bg-paper text-primary border",
    r: "md:rotate-1",
  },
];
const cares = [
  {
    I: Sparkles,
    t: "Tudo escolhido com intenção",
    d: "Cada doce, pão e detalhe entra na composição para criar uma experiência gostosa de abrir.",
  },
  {
    I: Heart,
    t: "Montado à mão, de verdade",
    d: "A gente cuida da montagem, do laço à última flor, para que o presente tenha presença.",
  },
  {
    I: Users,
    t: "Do seu jeito",
    d: "Você escolhe a ocasião, o estilo e os sabores. O resultado fica com a cara de quem vai receber.",
  },
];

function Index() {
  return (
    <div id="topo">
      <Header />
      <main>
        <Wrap className="grid items-center gap-12 overflow-hidden py-16 md:grid-cols-[1.05fr_1fr] md:py-24">
          <div>
            <p className="tag text-gold">Cestas, tábuas & carinho</p>
            <h1 className="mt-6 text-6xl sm:text-7xl lg:text-8xl">
              Um carinho
              <br />
              em forma de <em className="text-gold">presente.</em>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Cestas e tábuas artesanais para celebrar aniversários, manhãs especiais e todos
              aqueles “lembrei de você”.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#colecoes" className="btn bg-primary text-primary-foreground hover:bg-gold">
                Ver coleções <ArrowRight size={16} />
              </a>
              <a
                href="#encomendas"
                className="btn border border-primary hover:bg-primary hover:text-primary-foreground"
              >
                Montar meu presente
              </a>
            </div>
          </div>
          <HeroArt />
        </Wrap>
        <section className="bg-primary py-20 text-primary-foreground" aria-labelledby="manifesto">
          <Wrap>
            <p className="tag text-gold-soft">Um jeito gostoso de presentear</p>
            <h2 id="manifesto" className="mt-6 max-w-5xl text-4xl sm:text-6xl">
              Tem coisa melhor do que receber uma pausa bonita, cheia de sabores e feita
              especialmente para você?
            </h2>
          </Wrap>
        </section>
        <section id="a-marca" className="py-24">
          <Wrap>
            <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="tag text-gold">01 — A marca</p>
                <h2 className="mt-4 text-5xl sm:text-6xl">
                  Pequenos gestos.
                  <br />
                  <em className="text-terracotta">Grandes memórias.</em>
                </h2>
              </div>
              <div className="space-y-5 text-lg text-muted-foreground md:pt-12">
                <p>
                  O Pausa e Paladar nasceu das mãos e do olhar de uma mulher apaixonada por montar
                  presentes que fazem os olhos brilharem. Cada cesta e cada tábua é pensada como uma
                  história gostosa para abrir.
                </p>
                <p>
                  Tem pão quentinho, doce escolhido com cuidado, laço bonito e aquele detalhe
                  inesperado que mostra: alguém pensou em você.
                </p>
                <a
                  href="#encomendas"
                  className="inline-flex items-center gap-2 border-b border-gold pb-1 text-foreground hover:text-gold"
                >
                  Conte a sua ocasião <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <dl className="mt-20 grid grid-cols-1 divide-y border-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                ["100%", "montado à mão"],
                ["01", "pessoa por trás de cada detalhe"],
                ["∞", "jeitos de presentear"],
              ].map(([n, l]) => (
                <div key={l} className="px-6 py-8 text-center">
                  <dt className="font-display text-6xl text-gold">{n}</dt>
                  <dd className="tag mt-2 text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </Wrap>
        </section>
        <section id="colecoes" className="pb-32 pt-8">
          <Wrap>
            <p className="tag text-gold">02 — Cestas & tábuas</p>
            <h2 className="mt-4 text-5xl sm:text-6xl">
              Escolha o seu jeito de <em className="text-gold">celebrar.</em>
            </h2>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {collections.map(({ t, k, d, p, Art, c, r }) => (
                <article
                  key={t}
                  className={`lift flex flex-col rounded-[var(--radius)] p-8 ${c} ${r}`}
                >
                  <Art />
                  <p className="tag mt-8 opacity-75">{k}</p>
                  <h3 className="mt-2 text-3xl">{t}</h3>
                  <p className="mt-3 flex-1 opacity-85">{d}</p>
                  <p className="tag mt-6 border-t border-current/20 pt-4">{p}</p>
                </article>
              ))}
            </div>
          </Wrap>
        </section>
        <section id="cuidado" className="bg-paper py-24">
          <Wrap className="grid items-center gap-12 md:grid-cols-[1fr_1.3fr]">
            <PlateArt />
            <div>
              <p className="tag text-gold">03 — O nosso cuidado</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">
                O presente fica ainda mais bonito quando é feito com{" "}
                <em className="text-gold">intenção.</em>
              </h2>
              <ul className="mt-10 space-y-6">
                {cares.map(({ I, t, d }) => (
                  <li key={t} className="flex gap-4 border-t pt-6">
                    <I className="mt-1 shrink-0 text-terracotta" size={22} aria-hidden="true" />
                    <div>
                      <h3 className="text-2xl">{t}</h3>
                      <p className="mt-1 text-muted-foreground">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Wrap>
        </section>
        <section className="py-32" aria-label="Depoimento">
          <Wrap className="text-center">
            <figure className="mx-auto max-w-3xl">
              <blockquote className="font-display text-3xl italic sm:text-5xl">
                “A cesta chegou linda, cheirosa e com tudo que lembrava a minha mãe. Foi o presente
                mais especial.”
              </blockquote>
              <figcaption className="mt-8">
                <span className="font-medium">Camila R.</span>
                <span className="tag mt-1 block text-muted-foreground">
                  cliente Pausa e Paladar
                </span>
              </figcaption>
            </figure>
          </Wrap>
        </section>
        <section id="encomendas" className="bg-primary py-24 text-primary-foreground">
          <Wrap className="grid items-center gap-12 md:grid-cols-[.95fr_1.05fr]">
            <div>
              <p className="tag text-gold-soft">04 — Encomendas</p>
              <h2 className="mt-4 text-5xl sm:text-6xl">
                Você imagina.
                <br />
                <em className="text-gold-soft">A gente monta.</em>
              </h2>
              <p className="mt-6 max-w-md text-lg opacity-85">
                Conte para quem é, qual é a ocasião e o que você gostaria de celebrar. A montagem é
                feita sob medida e combinada com você.
              </p>
              <a href="#contato" className="btn mt-8 bg-gold text-primary hover:bg-gold-soft">
                Fazer uma encomenda <MessageCircle size={16} />
              </a>
            </div>
            <div className="rounded-[var(--radius)] bg-background p-8 text-foreground sm:p-10">
              <p className="tag text-gold">Como funciona</p>
              <div className="mt-8 space-y-6">
                {[
                  [
                    "01",
                    "Você conta a ocasião",
                    "Aniversário, café da manhã, agradecimento ou só vontade de mimar.",
                  ],
                  [
                    "02",
                    "A gente combina os sabores",
                    "Escolhemos juntos o tamanho, a paleta e os itens da sua cesta ou tábua.",
                  ],
                  [
                    "03",
                    "Você surpreende",
                    "A encomenda é preparada com carinho e combinamos a entrega ou retirada.",
                  ],
                ].map(([n, t, d]) => (
                  <div key={n} className="flex gap-4 border-t pt-5">
                    <span className="font-mono text-sm text-gold">{n}</span>
                    <div>
                      <h3 className="text-xl">{t}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                    </div>
                    <Check className="ml-auto shrink-0 text-gold" size={18} />
                  </div>
                ))}
              </div>
            </div>
          </Wrap>
        </section>
      </main>
      <footer id="contato" className="py-16">
        <Wrap className="grid gap-10 md:grid-cols-2">
          <div>
            <Wordmark className="w-56" />
            <p className="mt-4 max-w-xs text-muted-foreground">
              Um convite para celebrar alguém — inclusive você.
            </p>
          </div>
          <nav
            aria-label="Rodapé"
            className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end md:self-center"
          >
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-gold">
                {n.label}
              </a>
            ))}
            <a href="#contato" className="inline-flex items-center gap-1 hover:text-gold">
              <Instagram size={14} /> Instagram
            </a>
            <a href="#contato" className="inline-flex items-center gap-1 hover:text-gold">
              <Package size={14} /> Encomendar
            </a>
          </nav>
          <div className="tag flex flex-col justify-between gap-2 border-t pt-6 text-muted-foreground sm:flex-row md:col-span-2">
            <span>© 2026 Pausa e Paladar</span>
            <span>Feito com calma, afeto e coisas gostosas.</span>
          </div>
        </Wrap>
      </footer>
    </div>
  );
}
