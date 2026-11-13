import { createFileRoute } from "@tanstack/react-router";
import { MenuCard } from "@/components/MenuCard";
import { menuItems } from "@/data/menu";

export const Route = createFileRoute("/cardapio")({
  component: Cardapio,
});

function Cardapio() {
  const cestas = menuItems.filter((m) => m.category === "cestas");
  const tabuas = menuItems.filter((m) => m.category === "tabuas");

  return (
    <div id="topo">
      <section className="section-py">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
            <p className="text-body-xs text-gold tracking-wider uppercase mb-3">Cardápio</p>
            <h1 className="text-display-2xl text-foreground">
              Escolha o seu jeito de
              <br />
              <em className="text-[var(--gold)] not-italic">celebrar.</em>
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-xl mx-auto">
              Cada item é montado à mão com ingredientes selecionados. Conte a sua ocasião e a gente
              prepara sob medida.
            </p>
          </div>

          <div className="space-y-20">
            <div>
              <h2 className="text-display-lg text-foreground mb-8 text-center lg:text-left">
                Cestas &amp; presentes
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cestas.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-display-lg text-foreground mb-8 text-center lg:text-left">
                Tábuas &amp; frios
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tabuas.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <a href="#encomendas" className="btn btn-premium btn-lg inline-flex">
              Fazer uma encomenda
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
