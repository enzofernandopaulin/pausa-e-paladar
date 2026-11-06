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
import { HeroArt, PlateArt } from "@/components/Art";
import GsapFlipCard from "@/components/ui/gsap-card-flip";
import { basketItems } from "@/data/basket-images";
import { Badge, badgeVariants } from "@/components/ui/badge";

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
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md transition-colors">
      <Wrap className="flex h-20 items-center justify-between py-3">
        <a
          href="#topo"
          className="flex items-center gap-3"
          aria-label="Pausa e Paladar — início"
          onClick={() => setOpen(false)}
        >
          <Wordmark className="h-18 w-60 object-contain" />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative text-sm font-medium transition-colors hover:text-[var(--gold)] after:content-[] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-300"
            >
              {n.label}
            </a>
          ))}
          <div className="hidden md:flex items-center gap-2">
            <a href="#encomendas" className="btn btn-premium btn-sm">
              Fazer encomenda <ArrowRight size={12} />
            </a>
          </div>
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
          className="border-t bg-background/95 md:hidden"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        >
          <Wrap className="flex flex-col gap-4 py-8">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 font-display text-2xl text-foreground transition-colors hover:text-[var(--gold)]"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#encomendas"
              onClick={() => setOpen(false)}
              className="btn mt-2 btn-premium text-primary-foreground"
            >
              Fazer encomenda <ArrowRight size={15} />
            </a>
          </Wrap>
        </nav>
      )}
    </header>
  );
}

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

const stats = [
  ["100%", "montado à mão"],
  ["01", "pessoa por trás de cada detalhe"],
  ["∞", "jeitos de presentear"],
];

function Index() {
  return (
    <div id="topo">
      <Header />
      <main className="min-h-screen">
        <Wrap className="grid grid-cols-1 gap-8 md:gap-12 lg:gap-20 xl:gap-24 pb-16">
          <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
            <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal leading-none tracking-tight text-foreground">
              Um carinho
              <br />
              em forma de <em className="text-[var(--gold)]">presente.</em>
            </h1>
            <p className="mt-4 max-w-sm text-base text-muted-foreground leading-relaxed">
              Cestas e tábuas artesanais para celebrar aniversários, manhãs especiais e todos
              aqueles "lembrei de você".
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#colecoes" className="btn btn-premium">
                Ver coleções <ArrowRight size={16} />
              </a>
              <a
                href="#encomendas"
                className="btn btn-premium-outline btn-sm mt-2 transition-colors"
              >
                Montar meu presente
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 pt-8 md:pt-0 border-t border-border-subtle md:border-0">
            <HeroArt />
          </div>
        </Wrap>

        <section className="py-20 bg-[var(--surface-subtle)]" aria-labelledby="manifesto">
          <Wrap className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <p className="tag text-gold-soft">Um jeito gostoso de presentear</p>
            <h2
              id="manifesto"
              className="col-span-1 md:col-span-2 lg:col-span-3 text-5xl sm:text-6xl lg:text-7xl font-normal leading-none tracking-tight text-foreground"
            >
              Tem coisa melhor do que receber uma pausa bonita, cheia de sabores e feita
              especialmente para você?
            </h2>
          </Wrap>
        </section>

        <section id="a-marca" className="py-24 bg-[var(--surface-elevated)]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div>
              <p className="tag text-gold">01 — A marca</p>
              <h2 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-normal leading-none tracking-tight text-foreground">
                Pequenos gestos.
                <br />
                <em className="text-[var(--terracotta)]">Grandes memórias.</em>
              </h2>
            </div>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                O Pausa e Paladar nasceu das mãos e do olhar de uma mulher apaixonada por montar
                presentes que fazem os olhos brilharem. Cada cesta e cada tábua é pensada como uma
                história gostosa para abrir.
              </p>
              <p>
                Tem pão quentinho, doce escolhido com cuidado, laço bonito e aquele detalhe
                inesperado que mostra: alguém pensou em você.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {stats.map(([n, l]) => (
                <div key={l} className="text-center">
                  <dt className="font-display text-6xl text-gold">{n}</dt>
                  <dd className="tag mt-2 text-muted-foreground">{l}</dd>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="colecoes" className="py-32">
          <div className="text-center mb-12">
            <p className="tag text-gold">02 — Cestas & tábuas</p>
            <h2 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-normal leading-none tracking-tight text-foreground">
              Escolha o seu jeito de <em className="text-[var(--gold)]">celebrar.</em>
            </h2>
          </div>

          <div className="min-h-[60vh] md:min-h-[50vh] relative overflow-hidden rounded-2xl border border-border-subtle bg-[var(--surface-elevated)]">
            <GsapFlipCard
              items={basketItems}
              title="Coleções Pausa e Paladar"
              meta="Cestas & tábuas artesanais"
              description="Cada cesta e tábua é montada à mão com ingredientes selecionados. Toque para explorar."
              rounded={16}
              stackRotation={2}
              showCounter={true}
              backgroundColor="oklch(0.882 0.034 72)"
              textColor="oklch(0.32 0.06 130)"
              mutedColor="oklch(0.42 0.04 120)"
            />
          </div>
        </section>

        <section id="cuidado" className="py-24 bg-[var(--surface-subtle)]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="order-2 order-first md:order-1 lg:order-1">
              <PlateArt />
            </div>
            <div>
              <p className="tag text-gold">03 — O nosso cuidado</p>
              <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-normal leading-none tracking-tight text-foreground">
                O presente fica ainda mais bonito quando é feito com{" "}
                <em className="text-[var(--gold)]">intenção.</em>
              </h2>
              <ul className="mt-6 space-y-4">
                {cares.map(({ I, t, d }) => (
                  <li
                    key={t}
                    className="flex gap-4 items-start border-b border-border-subtle pb-6 last:pb-0"
                  >
                    <I className="mt-1.5 shrink-0 text-terracotta text-lg" aria-hidden="true" />
                    <div>
                      <h3 className="font-medium text-xl text-foreground">{t}</h3>
                      <p className="text-base text-muted-foreground line-clamp-2">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[var(--surface-subtle)]" aria-label="Depoimento">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="font-display text-4xl italic sm:text-5xl leading-relaxed text-foreground pb-8 border-y border-border-subtle">
              “A cesta chegou linda, cheirosa e com tudo que lembrava a minha mãe. Foi o presente
              mais especial.”
            </blockquote>
            <figcaption className="mt-8">
              <span className="font-medium text-lg">Camila R.</span>
              <span className="tag mt-1 block text-xs text-muted-foreground">
                cliente Pausa e Paladar
              </span>
            </figcaption>
          </div>
        </section>

        <section id="encomendas" className="py-24 bg-[var(--surface-elevated)]">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12">
            <div>
              <p className="tag text-gold-soft">04 — Encomendas</p>
              <h2 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-normal leading-none tracking-tight text-foreground">
                Você imagina.
                <br />
                <em className="text-[var(--gold-soft)]">A gente monta.</em>
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Conte para quem é, qual é a ocasião e o que você gostaria de celebrar. A montagem é
                feita sob medida e combinada com você.
              </p>
              <a href="#contato" className="mt-6 btn btn-premium w-full">
                Fazer uma encomenda <MessageCircle size={16} />
              </a>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gold uppercase tracking-wider mb-4">Como funciona</p>
              <div className="space-y-3">
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
                  <div
                    key={n}
                    className="flex gap-4 border-t border-border-subtle pt-5 pb-5 last:pb-0"
                  >
                    <span className="font-mono text-sm text-gold capitalize">{n}</span>
                    <div>
                      <h3 className="text-base font-medium text-foreground capitalize">{t}</h3>
                      <p className="text-sm text-muted-foreground">{d}</p>
                    </div>
                    <Check className="ml-auto shrink-0 text-gold size={16}" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer id="contato" className="py-16 bg-[var(--surface-subtle)]">
        <Wrap className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8 border-t border-border-subtle">
          <div>
            <Wordmark className="w-64 mb-4" />
            <p className="text-base text-muted-foreground leading-relaxed">
              Um convite para celebrar alguém — inclusive você.
            </p>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-2 md:grid-cols-4 justify-center">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-foreground hover:text-[var(--gold)] transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 pt-4 border-t border-border-subtle">
            <span>© 2026 Pausa e Paladar</span>
            <span>Feito com calma, afeto e coisas gostosas.</span>
          </div>
        </Wrap>
      </footer>
    </div>
  );
}
