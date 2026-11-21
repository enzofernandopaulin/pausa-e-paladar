import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Instagram, MessageCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Wordmark } from "@/components/Logo";
import { MenuProductCard } from "@/components/MenuProductCard";
import { getWhatsAppUrl, instagramUrl, menuSections, sizeGuide } from "@/data/menu";

const title = "Nosso Cardápio — Pausa & Paladar";
const description =
  "Uma seleção especial de sabores, preparada para transformar momentos em memórias. Tábuas, cestas e experiências artesanais sob encomenda.";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cardapio,
});

function Cardapio() {
  return (
    <div id="topo">
      <Header />
      <main>
        <section className="section-py overflow-hidden" aria-labelledby="menu-title">
          <div className="section-container">
            <div className="grid grid-12 gap-section-lg items-end">
              <div className="col-start-1 col-end-9">
                <p className="text-body-xs text-gold tracking-wider uppercase mb-5">
                  Pausa & Paladar / 01
                </p>
                <h1 id="menu-title" className="text-display-2xl text-foreground max-w-[10ch]">
                  Nosso <em className="text-[var(--gold)] not-italic">Cardápio.</em>
                </h1>
                <p className="text-body-lg text-muted-foreground mt-7 max-w-2xl leading-relaxed">
                  Uma seleção especial de sabores, preparada para transformar momentos em memórias.
                </p>
              </div>
              <div className="col-start-9 col-end-13 hidden lg:block justify-self-end max-w-xs pb-2">
                <p className="tag text-gold">Feito para celebrar</p>
                <p className="mt-4 text-body-sm leading-relaxed text-muted-foreground">
                  Escolha a composição, o tamanho e os detalhes. Para reservar, fale com a gente
                  pelo WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </section>

        <nav
          aria-label="Categorias do cardápio"
          className="sticky top-20 z-30 border-y border-[var(--border-subtle)] bg-[var(--background)]/95 backdrop-blur-md"
        >
          <div className="section-container overflow-x-auto">
            <div className="flex min-w-max items-center gap-7 py-4 text-body-sm">
              {menuSections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group inline-flex items-center gap-2 text-foreground/75 transition-colors hover:text-[var(--gold)]"
                >
                  <span className="font-mono text-[0.68rem] text-gold">0{index + 1}</span>
                  <span>{section.label}</span>
                </a>
              ))}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn btn-premium btn-sm ml-auto"
              >
                Encomendar <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </nav>

        <div className="section-container">
          {menuSections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-36 border-b border-[var(--border-subtle)] py-20 lg:py-28"
              aria-labelledby={`${section.id}-title`}
            >
              <div className="grid grid-12 gap-section-lg items-start">
                <div className="col-start-1 col-end-4 lg:sticky lg:top-40">
                  <p className="text-body-xs text-gold tracking-wider uppercase">
                    0{index + 1} / Cardápio
                  </p>
                  <h2 id={`${section.id}-title`} className="text-display-xl mt-4 text-foreground">
                    {section.label}
                  </h2>
                  <p className="mt-5 text-body-sm leading-relaxed text-muted-foreground">
                    {section.intro}
                  </p>
                </div>
                <div className="col-start-4 col-end-13 grid gap-6 md:grid-cols-2">
                  {section.products.map((product) => (
                    <MenuProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          ))}

          <section className="py-20 lg:py-28" aria-labelledby="size-guide-title">
            <div className="grid grid-12 gap-section-lg items-start">
              <div className="col-start-1 col-end-5">
                <p className="text-body-xs text-gold tracking-wider uppercase">Guia de tamanhos</p>
                <h2 id="size-guide-title" className="text-display-lg mt-4 text-foreground">
                  Escolha o tamanho do momento.
                </h2>
              </div>
              <div className="col-start-5 col-end-13 grid gap-4 md:grid-cols-3">
                {sizeGuide.map((size) => (
                  <div key={size.label} className="border-t border-[var(--border-emphasis)] pt-5">
                    <span className="font-display text-5xl text-[var(--gold)]">{size.label}</span>
                    <p className="mt-3 text-body-sm font-medium text-foreground">{size.weight}</p>
                    <p className="mt-2 text-body-sm leading-relaxed text-muted-foreground">
                      {size.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section
          className="bg-[var(--primary)] py-20 text-[var(--primary-foreground)] lg:py-28"
          aria-labelledby="order-title"
        >
          <div className="section-container">
            <div className="grid grid-12 gap-section-lg items-end">
              <div className="col-start-1 col-end-8">
                <p className="text-body-xs uppercase tracking-wider text-[var(--gold-soft)]">
                  Pedidos e reservas
                </p>
                <h2
                  id="order-title"
                  className="text-display-xl mt-4 text-[var(--primary-foreground)]"
                >
                  Conte a ocasião. <em className="text-[var(--gold-soft)]">A gente monta.</em>
                </h2>
                <p className="mt-6 max-w-xl text-body-md leading-relaxed text-[var(--primary-foreground)]/75">
                  Taxa de entrega: a consultar. Fale com a gente para confirmar disponibilidade,
                  detalhes e reserva.
                </p>
              </div>
              <div className="col-start-8 col-end-13 flex flex-col items-start gap-4 lg:items-end">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-lg bg-[var(--gold)] text-[var(--primary)] shadow-[var(--elevation-2)] hover:bg-[var(--gold-soft)]"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Pedir pelo WhatsApp
                </a>
                <span className="font-mono text-xs tracking-[0.12em] text-[var(--primary-foreground)]/70">
                  (13) 99654-2775
                </span>
              </div>
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
            <div className="col-start-1 col-end-5">
              <Wordmark className="w-48 mb-4" />
              <p className="text-body-sm leading-relaxed text-muted-foreground">
                Um convite para celebrar alguém — inclusive você.
              </p>
            </div>
            <nav aria-label="Rodapé" className="col-start-5 col-end-9 grid grid-cols-2 gap-4">
              <a
                href="/"
                className="text-body-sm font-medium text-foreground hover:text-[var(--gold)]"
              >
                Início
              </a>
              <a
                href="#tabuas"
                className="text-body-sm font-medium text-foreground hover:text-[var(--gold)]"
              >
                Tábuas
              </a>
              <a
                href="#cestas"
                className="text-body-sm font-medium text-foreground hover:text-[var(--gold)]"
              >
                Cestas
              </a>
              <a
                href="#adicionais"
                className="text-body-sm font-medium text-foreground hover:text-[var(--gold)]"
              >
                Adicionais
              </a>
            </nav>
            <div className="col-start-9 col-end-13 flex flex-col gap-3 text-body-sm text-muted-foreground">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-[var(--gold)]"
              >
                <MessageCircle size={16} aria-hidden="true" /> (13) 99654-2775
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-[var(--gold)]"
              >
                <Instagram size={16} aria-hidden="true" /> @pausaepaladar
              </a>
              <span>Taxa de entrega: a consultar.</span>
            </div>
          </div>
          <div className="mt-10 border-t border-[var(--border-subtle)] pt-5 text-body-xs text-muted-foreground">
            © 2026 Pausa e Paladar · Feito com calma, afeto e coisas gostosas.
          </div>
        </div>
      </footer>
    </div>
  );
}
