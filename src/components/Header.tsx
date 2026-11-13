import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Wordmark } from "@/components/Logo";

const nav = [
  { href: "/cardapio", label: "Cardápio" },
  { href: "#a-marca", label: "A marca" },
  { href: "#colecoes", label: "Cestas & tábuas" },
  { href: "#encomendas", label: "Encomendas" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md transition-colors">
      <div className="section-container flex h-20 items-center justify-between py-3">
        <a
          href="#topo"
          className="flex items-center gap-3"
          aria-label="Pausa e Paladar — início"
          onClick={() => setOpen(false)}
        >
          <Wordmark className="h-14 w-auto max-w-[200px] object-contain" />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-body-sm font-medium text-foreground/80 hover:text-[var(--gold)] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gold after:transition-width after:duration-300 hover:after:w-full"
            >
              {n.label}
            </a>
          ))}
          <a href="#encomendas" className="btn btn-premium btn-sm hidden md:flex">
            <span>Fazer encomenda</span>
            <ArrowRight size={14} />
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
      </div>
      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu mobile"
          className="absolute left-0 top-20 z-40 w-full border-b bg-background/95 backdrop-blur-md md:hidden"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        >
          <div className="section-container flex flex-col py-8">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-4 border-b font-display text-2xl text-foreground transition-colors hover:text-[var(--gold)]"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#encomendas"
              onClick={() => setOpen(false)}
              className="btn btn-premium btn-lg mt-6 w-full justify-center"
            >
              Fazer encomenda <ArrowRight size={18} />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
