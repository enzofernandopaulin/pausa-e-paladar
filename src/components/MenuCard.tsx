import { type MenuItem } from "@/data/menu";

export function MenuCard({ item }: { item: MenuItem }) {
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(item.price);

  return (
    <article className="group relative overflow-hidden rounded-[var(--radius)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[var(--elevation-1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--elevation-3)]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-body-xs font-medium text-foreground">
          {formatted}
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-display text-display-sm text-foreground">{item.name}</h3>
        <p className="mt-2 text-body-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
        <a
          href="#encomendas"
          className="inline-flex items-center gap-1.5 mt-4 text-body-sm font-medium text-[var(--gold)] transition-colors hover:text-[var(--gold-soft)]"
        >
          Quero esse
        </a>
      </div>
    </article>
  );
}
