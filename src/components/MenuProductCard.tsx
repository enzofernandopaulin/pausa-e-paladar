import { ArrowUpRight, ImageOff } from "lucide-react";
import { type MenuProduct, getWhatsAppUrl } from "@/data/menu";

export function MenuProductCard({ product }: { product: MenuProduct }) {
  return (
    <article className="group overflow-hidden rounded-[var(--image-radius)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[var(--elevation-1)] transition-shadow duration-300 hover:shadow-[var(--elevation-3)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-subtle)]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.imageAlt ?? product.name}
            loading="lazy"
            className="block h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-3 px-8 text-center text-muted-foreground"
            role="img"
            aria-label={product.imageAlt ?? `Fotografia de ${product.name} não disponível`}
          >
            <ImageOff size={28} strokeWidth={1.2} aria-hidden="true" />
            <span className="max-w-[18rem] font-mono text-[0.68rem] uppercase tracking-[0.14em]">
              Fotografia específica não disponível no acervo atual
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/35 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/90">
          Pausa & Paladar
        </span>
      </div>

      <div className="p-6 sm:p-8">
        <h3 className="text-display-md text-foreground">{product.name}</h3>
        <p className="mt-3 text-body-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        {product.composition && product.composition.length > 0 && (
          <div className="mt-6 border-t border-[var(--border-subtle)] pt-5">
            <p className="tag text-gold">Composição</p>
            <ul className="mt-3 space-y-2 text-body-sm leading-relaxed text-muted-foreground">
              {product.composition.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[var(--gold)]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-6 border-t border-[var(--border-subtle)] pt-5">
            <p className="tag text-gold">Tamanhos</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {product.sizes.map((size) => (
                <div key={size.label} className="rounded-lg bg-[var(--surface-subtle)] p-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-2xl text-foreground">{size.label}</span>
                    <span className="text-right text-[0.72rem] font-semibold text-[var(--gold)]">
                      {size.price}
                    </span>
                  </div>
                  <p className="mt-1 text-[0.72rem] leading-relaxed text-muted-foreground">
                    {size.serve}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.options && product.options.length > 0 && (
          <div className="mt-6 border-t border-[var(--border-subtle)] pt-5">
            <p className="tag text-gold">Opções</p>
            <div className="mt-3 divide-y divide-[var(--border-subtle)]">
              {product.options.map((option) => (
                <div
                  key={option.label}
                  className="flex items-center justify-between gap-4 py-2 text-body-sm"
                >
                  <span className="text-muted-foreground">{option.label}</span>
                  <span className="shrink-0 font-medium text-foreground">{option.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <a
          href={getWhatsAppUrl(product.name)}
          target="_blank"
          rel="noreferrer"
          className="btn btn-premium mt-7 w-full"
        >
          Encomendar <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
