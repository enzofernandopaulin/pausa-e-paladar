import { useMemo, useState } from "react";
import { ArrowUpRight, ImageOff, X } from "lucide-react";
import { type MenuProduct, getWhatsAppUrl } from "@/data/menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProductSelectionFieldsProps = {
  product: MenuProduct;
  selectedSizeLabel?: string;
  selectedOptionLabels: string[];
  onSizeChange: (label: string) => void;
  onOptionToggle: (label: string) => void;
  inputIdSuffix: string;
};

function ProductSelectionFields({
  product,
  selectedSizeLabel,
  selectedOptionLabels,
  onSizeChange,
  onOptionToggle,
  inputIdSuffix,
}: ProductSelectionFieldsProps) {
  return (
    <>
      {product.composition && product.composition.length > 0 && (
        <div className="mt-6 border-t border-[var(--border-subtle)] pt-5">
          <p className="tag text-gold-ink">Composição</p>
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
          <legend className="tag text-gold-ink">Escolha o tamanho</legend>
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
                    name={`${product.id}-size-${inputIdSuffix}`}
                    value={size.label}
                    checked={selected}
                    onChange={() => onSizeChange(size.label)}
                    className="sr-only"
                  />
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-2xl text-foreground">{size.label}</span>
                    <span className="text-right text-[0.72rem] font-semibold text-[var(--gold-ink)]">
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
          <legend className="tag text-gold-ink">
            {product.optionMode === "single" ? "Escolha a embalagem" : "Selecione os adicionais"}
          </legend>
          <div className="mt-3 divide-y divide-[var(--border-subtle)]">
            {product.options.map((option) => {
              const selected = selectedOptionLabels.includes(option.label);
              return (
                <label
                  key={option.label}
                  className="flex min-h-12 cursor-pointer items-center gap-3 py-3 text-body-sm"
                >
                  <input
                    type={product.optionMode === "single" ? "radio" : "checkbox"}
                    name={`${product.id}-options-${inputIdSuffix}`}
                    value={option.label}
                    checked={selected}
                    onChange={() => onOptionToggle(option.label)}
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
    </>
  );
}

function ProductImage({ product, trigger = false }: { product: MenuProduct; trigger?: boolean }) {
  const content = (
    <>
      {product.image ? (
        <img
          src={product.image}
          alt={product.imageAlt ?? product.name}
          loading="lazy"
          className="block h-full w-full object-contain transition-opacity duration-500 group-hover:opacity-90"
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
      <span className="absolute bottom-4 left-5 rounded-full bg-[var(--background)]/90 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--gold-ink)] shadow-sm">
        Pausa & Paladar
      </span>
    </>
  );

  if (trigger) {
    return (
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Ver detalhes de ${product.name}`}
          className="relative block h-full w-full cursor-zoom-in text-left focus-visible:outline-none"
        >
          {content}
        </button>
      </DialogTrigger>
    );
  }

  return content;
}

export function MenuProductCard({ product, category }: { product: MenuProduct; category: string }) {
  const [selectedSizeLabel, setSelectedSizeLabel] = useState<string>();
  const [selectedOptionLabels, setSelectedOptionLabels] = useState<string[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const selectedSize = product.sizes?.find((size) => size.label === selectedSizeLabel);
  const selectedOptions = useMemo(
    () => product.options?.filter((option) => selectedOptionLabels.includes(option.label)) ?? [],
    [product.options, selectedOptionLabels],
  );
  const referencePrice =
    product.sizes?.[0]?.price ??
    (product.options?.length === 1 ? product.options[0]?.price : undefined);
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
    <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
      <article className="group overflow-hidden rounded-[var(--image-radius)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[var(--elevation-1)] transition-shadow duration-300 hover:shadow-[var(--elevation-3)]">
        <div className="relative aspect-[4/5] overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-4 sm:p-6">
          <ProductImage product={product} trigger />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <h3 className="text-display-md text-foreground">{product.name}</h3>
            {referencePrice && (
              <span className="shrink-0 pt-1 text-right font-display text-lg leading-tight text-[var(--gold-ink)]">
                {referencePrice}
              </span>
            )}
          </div>
          <p className="mt-3 text-body-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <ProductSelectionFields
            product={product}
            selectedSizeLabel={selectedSizeLabel}
            selectedOptionLabels={selectedOptionLabels}
            onSizeChange={setSelectedSizeLabel}
            onOptionToggle={toggleOption}
            inputIdSuffix="card"
          />

          <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn-premium w-full"
            >
              Encomendar <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <DialogTrigger asChild>
              <button type="button" className="btn btn-premium-outline w-full sm:w-auto">
                Ver detalhes <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </DialogTrigger>
          </div>
        </div>
      </article>

      <DialogContent className="w-[calc(100%-2rem)] max-w-5xl max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[var(--image-radius)] border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-0 text-foreground shadow-[var(--elevation-5)] sm:w-[calc(100%-3rem)]">
        <div className="grid min-h-0 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="relative flex min-h-[18rem] items-center justify-center border-b border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-6 md:min-h-[34rem] md:border-b-0 md:border-r md:p-10">
            <div className="relative h-full max-h-[52dvh] min-h-[16rem] w-full md:max-h-[70dvh]">
              <ProductImage product={product} />
            </div>
          </div>

          <div className="min-w-0 p-6 sm:p-10">
            <div className="pr-10">
              <p className="tag text-gold-ink">{category}</p>
              <DialogTitle className="mt-3 text-display-lg font-medium text-foreground">
                {product.name}
              </DialogTitle>
              <DialogDescription className="mt-4 text-body-md leading-relaxed text-muted-foreground">
                {product.description}
              </DialogDescription>
            </div>

            <ProductSelectionFields
              product={product}
              selectedSizeLabel={selectedSizeLabel}
              selectedOptionLabels={selectedOptionLabels}
              onSizeChange={setSelectedSizeLabel}
              onOptionToggle={toggleOption}
              inputIdSuffix="dialog"
            />

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn-premium btn-lg mt-8 w-full"
            >
              Encomendar já <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <DialogClose asChild>
              <button type="button" className="btn btn-premium-ghost mt-3 w-full">
                <X size={16} aria-hidden="true" /> Fechar detalhes
              </button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
