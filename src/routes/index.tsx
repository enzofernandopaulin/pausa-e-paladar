import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Heart, MessageCircle, Sparkles, Users } from "lucide-react";
import { Wordmark } from "@/components/Logo";
import { HeroArt, PlateArt } from "@/components/Art";
import GsapFlipCard from "@/components/ui/gsap-card-flip";
import { basketItems } from "@/data/basket-images";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getWhatsAppUrl } from "@/data/menu";

const title = "Pausa e Paladar — Cestas & tábuas artesanais";
const desc =
  "Cestas de café da manhã, tábuas de doces e presentes montados com carinho para celebrar o agora.";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:url", content: "https://pausa-e-paladar.vercel.app/" },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://pausa-e-paladar.vercel.app/" }],
  }),
  component: Index,
});

const nav = [
  { href: "/cardapio", label: "Menu" },
  { href: "#personalizacao", label: "Personalização" },
  { href: "#historia", label: "Nossa história" },
  { href: "#encomendas", label: "Encomendas" },
];

import { Header } from "@/components/Header";

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
  // Scroll reveal hooks for each section
  const [marcaRef, marcaVisible] = useScrollReveal<HTMLDivElement>();
  const [colecoesRef, colecoesVisible] = useScrollReveal<HTMLDivElement>();
  const [cuidadoRef, cuidadoVisible] = useScrollReveal<HTMLDivElement>();
  const [depoimentoRef, depoimentoVisible] = useScrollReveal<HTMLDivElement>();
  const [encomendasRef, encomendasVisible] = useScrollReveal<HTMLDivElement>();

  const revealClass = (visible: boolean) =>
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";

  return (
    <div id="topo">
      <Header />
      <main className="min-h-screen">
        <section
          className="section-py overflow-hidden lg:min-h-[min(760px,calc(100svh-5rem))] lg:flex lg:items-center"
          aria-labelledby="hero-title"
        >
          <div className="section-container gap-section">
            <div className="grid grid-12 gap-section-lg items-center">
              {/* Content column: cols 1-6 on lg, full on mobile */}
              <div className="col-start-1 col-end-7 lg:col-end-7 text-center lg:text-left flex flex-col items-center lg:items-start">
                <p className="text-body-xs text-gold-ink tracking-wider uppercase mb-5">
                  Presentes gastronômicos artesanais
                </p>
                <h1 id="hero-title" className="text-display-2xl text-foreground max-w-[11ch]">
                  Um carinho
                  <br />
                  em forma de <em className="text-[var(--gold-ink)] not-italic">presente.</em>
                </h1>
                <p className="text-body-lg text-muted-foreground mt-7 max-w-md lg:max-w-lg leading-relaxed">
                  Cestas e tábuas montadas à mão para transformar aniversários, manhãs especiais e
                  todos aqueles “lembrei de você” em experiências afetivas.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-9 items-center">
                  <a href="#menu" className="btn btn-premium btn-lg w-full sm:w-auto">
                    Conheça nossas coleções <ArrowRight size={18} />
                  </a>
                  <a href="#encomendas" className="btn btn-premium-outline btn-lg w-full sm:w-auto">
                    Faça sua encomenda
                  </a>
                </div>
              </div>

              {/* Image column: cols 7-13 on lg, full on mobile */}
              <div className="col-start-7 col-end-13 lg:col-end-13 relative aspect-[4/5] lg:aspect-square lg:max-w-[38rem] lg:justify-self-end">
                <HeroArt />
              </div>
            </div>
          </div>
        </section>

        <section id="menu" className="section-py">
          <div
            ref={colecoesRef}
            className={`section-container transition-all duration-1000 ease-out ${revealClass(colecoesVisible)}`}
          >
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <p className="text-body-xs text-gold-ink tracking-wider uppercase mb-3">
                  01 — Nosso menu
                </p>
                <h2 className="text-display-xl text-foreground">
                  Escolha o seu jeito de <em className="text-[var(--gold-ink)]">celebrar.</em>
                </h2>
                <p className="mt-5 text-body-md leading-relaxed text-muted-foreground">
                  Cestas e tábuas artesanais para presentear, compartilhar e transformar uma pausa
                  em memória.
                </p>
              </div>
              <a href="/cardapio" className="btn btn-premium-outline btn-lg shrink-0">
                Ver menu completo <ArrowRight size={18} />
              </a>
            </div>

            <div className="mt-12 grid grid-12">
              <GsapFlipCard
                items={basketItems}
                title="Coleções Pausa e Paladar"
                meta="Cestas & tábuas artesanais"
                description="Cada cesta e tábua é montada à mão com ingredientes selecionados. Toque para explorar."
                rounded={20}
                stackRotation={3}
                showCounter={true}
                backgroundColor="oklch(0.97 0.005 120)"
                textColor="oklch(0.25 0.05 120)"
                mutedColor="oklch(0.45 0.03 120)"
                thumbWidth={120}
                thumbHeight={135}
                thumbGap={16}
                heroWidth={560}
                heroHeight={700}
                duration={0.8}
                ease="power4.inOut"
                className="col-start-1 col-end-13"
              />
            </div>
          </div>
        </section>

        <section id="personalizacao" className="section-py bg-[var(--surface-elevated)]">
          <div
            ref={marcaRef}
            className={`section-container gap-section-lg transition-all duration-1000 ease-out ${revealClass(marcaVisible)}`}
          >
            <div className="grid grid-12 gap-section-lg items-start">
              {/* Text column: cols 1-7 */}
              <div className="col-start-1 col-end-7 lg:col-end-7 lg:pr-8">
                <p className="text-body-xs text-gold-ink tracking-wider uppercase mb-3">
                  02 — Personalização
                </p>
                <h2 className="text-display-xl text-foreground">
                  Do seu jeito.
                  <br />
                  <em className="text-[var(--terracotta)]">Com intenção.</em>
                </h2>
                <div className="space-y-4 mt-6 text-body-md text-muted-foreground leading-relaxed">
                  <p>
                    Você escolhe a ocasião, o estilo e os sabores. A composição ganha a cara de quem
                    vai receber.
                  </p>
                  <p>
                    Do café da manhã à tábua para compartilhar, cada detalhe é combinado com você.
                  </p>
                </div>
                <a
                  href="/cardapio"
                  className="inline-flex items-center gap-2 text-body-md font-medium text-foreground hover:text-[var(--gold-ink)] transition-colors mt-6"
                >
                  Conheça as opções do menu <ArrowRight size={14} />
                </a>
              </div>

              {/* Stats column: cols 7-13 */}
              <dl className="col-start-7 col-end-13 lg:col-end-13 grid grid-cols-3 gap-4 mt-8 lg:mt-0">
                {stats.map(([n, l]) => (
                  <div
                    key={l}
                    className="text-center p-6 lg:p-8 bg-[var(--surface-subtle)] rounded-xl border border-[var(--border-subtle)]"
                  >
                    <dt className="font-display text-4xl lg:text-5xl text-gold-ink">{n}</dt>
                    <dd className="text-body-sm text-muted-foreground mt-2 tracking-wider">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="historia" className="section-py bg-[var(--surface-subtle)]">
          <div className="section-container">
            <div className="grid grid-12 gap-section-lg items-start">
              <div className="col-start-1 col-end-5">
                <p className="text-body-xs text-gold-ink tracking-wider uppercase mb-3">
                  03 — Nossa história
                </p>
                <h2 className="text-display-xl text-foreground">
                  Pequenos gestos.
                  <br />
                  <em className="text-[var(--terracotta)]">Grandes memórias.</em>
                </h2>
              </div>
              <div className="col-start-5 col-end-13 max-w-2xl space-y-4 text-body-md leading-relaxed text-muted-foreground">
                <p>
                  O Pausa e Paladar nasceu das mãos e do olhar de uma mulher apaixonada por montar
                  presentes que fazem os olhos brilharem.
                </p>
                <p>
                  Cada cesta e cada tábua é pensada como uma história gostosa para abrir: pão
                  quentinho, doce escolhido com cuidado, laço bonito e aquele detalhe inesperado que
                  mostra que alguém pensou em você.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="diferenciais" className="section-py bg-[var(--surface-subtle)]">
          <div
            ref={cuidadoRef}
            className={`section-container gap-section-lg transition-all duration-1000 ease-out ${revealClass(cuidadoVisible)}`}
          >
            <div className="grid grid-12 gap-section-lg items-center">
              {/* Image: cols 1-6 on lg, full on mobile — order-2 on mobile, order-1 on lg */}
              <div className="col-start-1 col-end-7 lg:col-end-7 order-2 lg:order-1 relative aspect-square">
                <PlateArt className="w-full h-full" />
              </div>
              {/* Content: cols 7-13 on lg, full on mobile */}
              <div className="col-start-7 col-end-13 lg:col-end-13 order-1 lg:order-2 text-center lg:text-left">
                <p className="text-body-xs text-gold-ink tracking-wider uppercase mb-3">
                  04 — Diferenciais
                </p>
                <h2 className="text-display-lg text-foreground">
                  O presente fica ainda mais bonito quando é feito com{" "}
                  <em className="text-[var(--gold-ink)]">intenção.</em>
                </h2>
                <ul className="mt-8 space-y-6 text-body-md text-muted-foreground leading-relaxed">
                  {cares.map(({ I, t, d }) => (
                    <li key={t} className="flex gap-4 items-start text-left">
                      <I className="mt-1 shrink-0 text-terracotta text-xl" aria-hidden="true" />
                      <div>
                        <h3 className="font-medium text-lg text-foreground mb-1">{t}</h3>
                        <p className="text-base">{d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-py bg-[var(--surface-subtle)]" aria-label="Depoimentos">
          <div
            ref={depoimentoRef}
            className={`section-container transition-all duration-1000 ease-out ${revealClass(depoimentoVisible)}`}
          >
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="text-body-xs text-gold-ink tracking-wider uppercase">
                05 — Depoimentos
              </p>
              <h2 className="text-display-lg mt-3 text-foreground">Quem recebe, sente.</h2>
            </div>
            <blockquote className="max-w-3xl mx-auto text-center relative fade-in-up">
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-gold-ink text-6xl font-display">
                "
              </span>
              <p className="text-display-md text-foreground italic leading-relaxed pb-8 border-b border-[var(--border-subtle)]">
                "A cesta chegou linda, cheirosa e com tudo que lembrava a minha mãe. Foi o presente
                mais especial."
              </p>
              <figcaption className="mt-6 flex items-center justify-center gap-4">
                <span className="font-medium text-body-lg text-foreground">Camila R.</span>
                <span className="text-body-xs text-muted-foreground">cliente Pausa e Paladar</span>
              </figcaption>
            </blockquote>
          </div>
        </section>

        <section id="encomendas" className="section-py bg-[var(--surface-elevated)]">
          <div
            ref={encomendasRef}
            className={`section-container gap-section-lg transition-all duration-1000 ease-out ${revealClass(encomendasVisible)}`}
          >
            <div className="grid grid-12 gap-section-lg items-start">
              {/* Left column: cols 1-7 */}
              <div className="col-start-1 col-end-7 lg:col-end-7">
                <p className="text-body-xs text-gold-soft tracking-wider uppercase mb-3">
                  07 — Como encomendar
                </p>
                <h2 className="text-display-xl text-foreground">
                  Você conta.
                  <br />
                  <em className="text-[var(--gold-soft)]">A gente cuida.</em>
                </h2>
                <p className="mt-6 text-body-md text-muted-foreground leading-relaxed">
                  Conte para quem é, qual é a ocasião e o que você gostaria de celebrar. A montagem
                  é feita sob medida e combinada com você.
                </p>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-premium btn-lg w-full mt-8"
                >
                  Fazer uma encomenda <MessageCircle size={18} />
                </a>
              </div>
              {/* Right column: cols 7-13 */}
              <div className="col-start-7 col-end-13 lg:col-end-13 space-y-4 pt-4 lg:pt-0">
                <p className="text-body-xs text-gold-ink uppercase tracking-wider mb-4">
                  Como funciona
                </p>
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
                    className="flex gap-4 p-5 bg-[var(--surface-subtle)] rounded-xl border border-[var(--border-subtle)]"
                  >
                    <span className="font-mono text-body-xs text-gold-ink shrink-0">{n}</span>
                    <div>
                      <h3 className="font-medium text-body-md text-foreground">{t}</h3>
                      <p className="text-body-md text-muted-foreground mt-1">{d}</p>
                    </div>
                    <Check className="mt-auto shrink-0 text-gold-ink size={18}" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="cta-final"
          className="bg-[var(--primary)] py-20 text-[var(--primary-foreground)] lg:py-28"
        >
          <div className="section-container text-center">
            <p className="text-body-xs uppercase tracking-wider text-[var(--gold-soft)]">
              08 — Um presente começa aqui
            </p>
            <h2 className="text-display-xl mx-auto mt-4 max-w-3xl text-[var(--primary-foreground)]">
              Quando quiser transformar um momento em presente, fale com a gente.
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/cardapio"
                className="btn btn-lg bg-[var(--gold-ink)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]"
              >
                Ver o menu <ArrowRight size={18} />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn btn-premium-outline btn-lg border-[var(--primary-foreground)]/30 text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)]/10"
              >
                Fazer uma encomenda <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer
        id="contato"
        className="border-t border-[var(--border-subtle)] bg-[var(--surface-subtle)]"
      >
        <div className="section-container py-12 lg:py-16">
          <div className="grid grid-12 gap-8 lg:gap-12">
            <div className="col-start-1 col-end-5 lg:col-end-5">
              <Wordmark className="w-48 mb-4" />
              <p className="text-body-md text-muted-foreground leading-relaxed">
                Um convite para celebrar alguém — inclusive você.
              </p>
            </div>
            <nav
              aria-label="Rodapé"
              className="col-start-5 col-end-9 lg:col-end-9 grid grid-cols-2 gap-4"
            >
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-body-sm font-medium text-foreground hover:text-[var(--gold-ink)] transition-colors"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="col-start-9 col-end-13 lg:col-end-13 flex flex-col gap-2 text-body-md text-muted-foreground">
              <span>© 2026 Pausa e Paladar</span>
              <span>Feito com calma, afeto e coisas gostosas.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
