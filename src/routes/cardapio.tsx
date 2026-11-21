import { createFileRoute } from "@tanstack/react-router";
import { useLayoutEffect, useRef } from "react";
import { ArrowDown, ArrowRight, Instagram, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/Header";
import { Wordmark } from "@/components/Logo";
import { MenuProductCard } from "@/components/MenuProductCard";
import { basketItems } from "@/data/basket-images";
import { getWhatsAppUrl, instagramUrl, menuSections, sizeGuide } from "@/data/menu";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const title = "Nosso Menu — Pausa & Paladar";
const description =
  "Uma seleção especial de sabores, preparada para transformar momentos em memórias. Tábuas, cestas e experiências artesanais sob encomenda.";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:url", content: "https://pausa-e-paladar.vercel.app/cardapio" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://pausa-e-paladar.vercel.app/cardapio" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-gsap-menu-hero='copy']", { autoAlpha: 0, y: 24, duration: 0.7 })
        .from(
          "[data-gsap-menu-hero='gallery']",
          { autoAlpha: 0, y: 20, scale: 0.98, duration: 0.85 },
          "-=0.45",
        );

      gsap.utils.toArray<HTMLElement>("[data-gsap-menu-section]").forEach((section) => {
        const items = section.querySelectorAll<HTMLElement>("[data-gsap-menu-item], article");
        if (!items.length) return;
        gsap.from(items, {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 82%", once: true },
        });
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div id="topo" ref={pageRef}>
      <Header />
      <main>
        <section className="section-py overflow-hidden" aria-labelledby="menu-title">
          <div className="section-container">
            <div className="grid grid-12 items-start gap-section-lg lg:items-center">
              <div data-gsap-menu-hero="copy" className="col-start-1 col-end-7 lg:pr-8">
                <p className="text-body-xs text-gold-ink tracking-wider uppercase mb-5">
                  Pausa & Paladar / 01
                </p>
                <h1 id="menu-title" className="text-display-2xl text-foreground max-w-[10ch]">
                  Nosso <em className="text-[var(--gold-ink)] not-italic">Menu.</em>
                </h1>
                <p className="text-body-lg text-muted-foreground mt-7 max-w-2xl leading-relaxed">
                  Uma seleção especial de sabores, preparada para transformar momentos em memórias.
                </p>
                <div className="mt-8 max-w-sm border-t border-[var(--border-subtle)] pt-5">
                  <p className="tag text-gold-ink">Feito para celebrar</p>
                  <p className="mt-4 text-body-md leading-relaxed text-muted-foreground">
                    Escolha a composição, o tamanho e os detalhes. Para reservar, fale com a gente
                    pelo WhatsApp.
                  </p>
                </div>
                <a
                  href="#tabuas"
                  className="mt-10 inline-flex items-center gap-3 font-mono text-body-xs uppercase tracking-[0.14em] text-[var(--gold-ink)] transition-colors hover:text-[var(--primary)]"
                >
                  Explore nossas coleções <ArrowDown size={15} aria-hidden="true" />
                </a>
              </div>

              <div data-gsap-menu-hero="gallery" className="col-start-7 col-end-13 min-w-0">
                <div className="grid grid-cols-5 items-start gap-4 sm:gap-6 lg:gap-7">
                  <figure className="col-span-3 row-span-2">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surface-subtle)] p-3 sm:p-4">
                      <img
                        src={basketItems[1].image}
                        alt={basketItems[1].alt}
                        className="h-full w-full object-contain"
                        loading="eager"
                      />
                    </div>
                    <figcaption className="mt-3 flex items-center justify-between gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--gold-ink)]">
                      <span>01 — Tábuas artesanais</span>
                      <span aria-hidden="true">↗</span>
                    </figcaption>
                  </figure>

                  <figure className="col-span-2 mt-10 sm:mt-14">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface-subtle)] p-2.5 sm:p-3">
                      <img
                        src={basketItems[0].image}
                        alt={basketItems[0].alt}
                        className="h-full w-full object-contain"
                        loading="eager"
                      />
                    </div>
                    <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--gold-ink)]">
                      02 — Cestas especiais
                    </figcaption>
                  </figure>

                  <figure className="col-span-2 mt-2 sm:mt-4">
                    <div className="relative aspect-square overflow-hidden bg-[var(--surface-subtle)] p-2.5 sm:p-3">
                      <img
                        src={basketItems[3].image}
                        alt={basketItems[3].alt}
                        className="h-full w-full object-contain"
                        loading="eager"
                      />
                    </div>
                    <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--gold-ink)]">
                      03 — Presentes gastronômicos
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <nav
          aria-label="Categorias do menu"
          className="sticky top-20 z-30 border-y border-[var(--border-subtle)] bg-[var(--background)]/95 backdrop-blur-md"
        >
          <div className="section-container overflow-x-auto overscroll-x-contain">
            <div className="flex w-max min-w-full items-center gap-7 py-3.5 text-body-md sm:py-4">
              {menuSections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group inline-flex items-center gap-2 text-foreground/75 transition-colors hover:text-[var(--gold-ink)]"
                >
                  <span className="font-mono text-[0.68rem] text-gold-ink">0{index + 1}</span>
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
              data-gsap-menu-section
              id={section.id}
              className="scroll-mt-36 border-b border-[var(--border-subtle)] py-24 lg:py-32"
              aria-labelledby={`${section.id}-title`}
            >
              <div className="grid grid-12 gap-section-lg items-start">
                <div data-gsap-menu-item className="col-start-1 col-end-4 lg:sticky lg:top-40">
                  <p className="text-body-xs text-gold-ink tracking-wider uppercase">
                    0{index + 1} / Menu
                  </p>
                  <h2 id={`${section.id}-title`} className="text-display-xl mt-4 text-foreground">
                    {section.label}
                  </h2>
                  <p className="mt-5 text-body-md leading-relaxed text-muted-foreground">
                    {section.intro}
                  </p>
                </div>
                <div className="col-start-4 col-end-13 grid gap-8 xl:gap-10 md:grid-cols-2">
                  {section.products.map((product) => (
                    <MenuProductCard key={product.id} product={product} category={section.label} />
                  ))}
                </div>
              </div>
            </section>
          ))}

          <section className="py-20 lg:py-28" aria-labelledby="size-guide-title">
            <div className="grid grid-12 gap-section-lg items-start">
              <div className="col-start-1 col-end-5">
                <p className="text-body-xs text-gold-ink tracking-wider uppercase">
                  Guia de tamanhos
                </p>
                <h2 id="size-guide-title" className="text-display-lg mt-4 text-foreground">
                  Escolha o tamanho do momento.
                </h2>
              </div>
              <div className="col-start-5 col-end-13 grid gap-4 md:grid-cols-3">
                {sizeGuide.map((size) => (
                  <div key={size.label} className="border-t border-[var(--border-emphasis)] pt-5">
                    <span className="font-display text-5xl text-[var(--gold-ink)]">
                      {size.label}
                    </span>
                    <p className="mt-3 text-body-md font-medium text-foreground">{size.weight}</p>
                    <p className="mt-2 text-body-md leading-relaxed text-muted-foreground">
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
                  className="btn btn-lg bg-[var(--gold-ink)] text-[var(--primary-foreground)] shadow-[var(--elevation-2)] hover:bg-[var(--primary)]"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Pedir pelo WhatsApp
                </a>
                <span className="font-mono text-body-sm tracking-[0.12em] text-[var(--primary-foreground)]/70">
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
              <p className="text-body-md leading-relaxed text-muted-foreground">
                Um convite para celebrar alguém — inclusive você.
              </p>
            </div>
            <nav aria-label="Rodapé" className="col-start-5 col-end-9 grid grid-cols-2 gap-4">
              <a
                href="/"
                className="text-body-md font-medium text-foreground hover:text-[var(--gold-ink)]"
              >
                Início
              </a>
              <a
                href="#tabuas"
                className="text-body-md font-medium text-foreground hover:text-[var(--gold-ink)]"
              >
                Tábuas
              </a>
              <a
                href="#cestas"
                className="text-body-md font-medium text-foreground hover:text-[var(--gold-ink)]"
              >
                Cestas
              </a>
              <a
                href="#adicionais"
                className="text-body-md font-medium text-foreground hover:text-[var(--gold-ink)]"
              >
                Adicionais
              </a>
            </nav>
            <div className="col-start-9 col-end-13 flex flex-col gap-3 text-body-md text-muted-foreground">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-[var(--gold-ink)]"
              >
                <MessageCircle size={16} aria-hidden="true" /> (13) 99654-2775
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-[var(--gold-ink)]"
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
