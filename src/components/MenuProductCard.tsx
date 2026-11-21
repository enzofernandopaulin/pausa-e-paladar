import { useMemo, useState } from "react";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { type MenuProduct, getWhatsAppUrl } from "@/data/menu";

export function MenuProductCard({ product, category }: { product: MenuProduct; category: string }) {
  const [selectedSizeLabel, setSelectedSizeLabel] = useState<string>();
  const [selectedOptionLabels, setSelectedOptionLabels] = useState<string[]>([]);

  const selectedSize = product.sizes?.find((size) => size.label === selectedSizeLabel);
  const selectedOptions = useMemo(
    () => product.options?.filter((option) => selectedOptionLabels.includes(option.label)) ?? [],
    [product.options, selectedOptionLabels],
  );
  const whatsappHref = getWhatsAppUrl(product.name, {
    category,
    size: selectedSize,
    options: selectedOptions,
  });

  const toggleOption = (label: string) => {
    if (product.optionMode === "single") {
      setSelectedOptionLabels([label]);
      return;
    }

    setSelectedOptionLabels((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );
  };

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
          <fieldset className="mt-6 border-t border-[var(--border-subtle)] pt-5">
            <legend className="tag text-gold">Escolha o tamanho</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {product.sizes.map((size) => {
                const selected = selectedSizeLabel === size.label;
                return (
                  <label
                    key={size.label}
                    className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                      selected
                        ? "border-[var(--gold)] bg-[var(--gold)]/10"
                        : "border-transparent bg-[var(--surface-subtle)] hover:border-[var(--gold)]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${product.id}-size`}
                      value={size.label}
                      checked={selected}
                      onChange={() => setSelectedSizeLabel(size.label)}
                      className="sr-only"
                    />
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="font-display text-2xl text-foreground">{size.label}</span>
                      <span className="text-right text-[0.72rem] font-semibold text-[var(--gold)]">
                        {size.price}
                      </span>
                    </span>
                    <span className="mt-1 block text-[0.72rem] leading-relaxed text-muted-foreground">
                      {size.serve}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        {product.options && product.options.length > 0 && (
          <fieldset className="mt-6 border-t border-[var(--border-subtle)] pt-5">
            <legend className="tag text-gold">
              {product.optionMode === "single" ? "Escolha a embalagem" : "Selecione os adicionais"}
            </legend>
            <div className="mt-3 divide-y divide-[var(--border-subtle)]">
              {product.options.map((option) => {
                const selected = selectedOptionLabels.includes(option.label);
                return (
                  <label
                    key={option.label}
                    className="flex cursor-pointer items-center gap-3 py-3 text-body-sm"
                  >
                    <input
                      type={product.optionMode === "single" ? "radio" : "checkbox"}
                      name={`${product.id}-options`}
                      value={option.label}
                      checked={selected}
                      onChange={() => toggleOption(option.label)}
                      className="h-4 w-4 accent-[var(--gold)]"
                    />
                    <span className="flex flex-1 items-center justify-between gap-4">
                      <span className="text-muted-foreground">{option.label}</span>
                      <span className="shrink-0 font-medium text-foreground">{option.price}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        <a
          href={whatsappHref}
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
