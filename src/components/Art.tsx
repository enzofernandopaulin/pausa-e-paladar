import basket from "@/assets/gift_basket.jpg";
const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
};

export function HeroArt() {
  return (
    <div className="relative w-full h-full overflow-visible text-primary" aria-hidden="true">
      <div className="absolute inset-0 rounded-[var(--radius)] bg-[var(--surface-subtle)]/60 border border-border-subtle/60 shadow-lg -rotate-1 scale-95 transition-transform duration-500 hover:rotate-0 hover:scale-100" />
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full spin-slow opacity-60">
        <circle cx="200" cy="200" r="185" {...s} strokeWidth={0.8} strokeDasharray="2 8" />
        <ellipse
          cx="200"
          cy="200"
          rx="175"
          ry="110"
          {...s}
          strokeWidth={0.8}
          transform="rotate(-20 200 200)"
        />
        <circle cx="375" cy="140" r="6" className="fill-gold" />
      </svg>
      <div className="absolute inset-0 rounded-[var(--radius)] overflow-hidden bg-[var(--surface-elevated)]/80 backdrop-blur-sm shadow-xl border border-border-subtle">
        <img
          src={basket}
          width={1024}
          height={1024}
          alt=""
          className="h-full w-full object-cover rounded-[var(--radius)] transition-transform duration-700 hover:scale-105"
        />
      </div>
      <div className="absolute -left-2 top-6 sm:left-4 sm:top-8 grid h-24 w-24 -rotate-12 place-items-center rounded-full border-2 border-gold bg-background/95 backdrop-blur-md text-center tag text-[0.650rem] text-gold shadow-md font-medium">
        feito
        <br />à mão
      </div>
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-6 rotate-[-4deg] bg-background/90 backdrop-blur-md px-4 py-2 rounded-full border border-border-subtle shadow-md">
        <p
          className="text-xl sm:text-2xl text-terracotta font-normal m-0"
          style={{ fontFamily: "Caveat, cursive" }}
        >
          um carinho bem vivido ↶
        </p>
      </div>
    </div>
  );
}

export function CupArt() {
  return (
    <svg viewBox="0 0 120 90" className="h-24 w-auto" aria-hidden="true">
      <ellipse
        cx="60"
        cy="74"
        rx="46"
        ry="9"
        className="fill-background/40"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M28 30h64l-6 36a8 8 0 0 1-8 6H42a8 8 0 0 1-8-6z" fill="currentColor" />
      <path d="M92 38c16 0 16 22 0 22" {...s} strokeWidth={5} />
      <path d="M52 22c-5-7 5-11 0-18M66 22c-5-7 5-11 0-18" {...s} />
    </svg>
  );
}

export function BrunchArt() {
  return (
    <svg viewBox="0 0 120 90" className="h-24 w-auto" aria-hidden="true">
      <ellipse
        cx="60"
        cy="50"
        rx="52"
        ry="30"
        className="fill-paper"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="26"
        y="34"
        width="30"
        height="24"
        rx="6"
        className="fill-gold"
        transform="rotate(-10 41 46)"
      />
      <rect
        x="40"
        y="40"
        width="30"
        height="24"
        rx="6"
        className="fill-gold-soft"
        stroke="currentColor"
        strokeWidth="1"
        transform="rotate(8 55 52)"
      />
      <circle cx="84" cy="40" r="8" className="fill-terracotta" />
      <circle cx="92" cy="56" r="6" className="fill-terracotta" opacity=".7" />
      <circle cx="78" cy="60" r="5" className="fill-sage" />
    </svg>
  );
}

export function CakeArt() {
  return (
    <svg viewBox="0 0 120 90" className="h-24 w-auto" aria-hidden="true">
      <path
        d="M20 70 L95 70 L95 40 L20 55z"
        className="fill-paper"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M20 55 L95 40 L95 34 L20 49z" className="fill-terracotta" />
      <path d="M20 63 L95 55" {...s} className="text-gold" strokeWidth={3} />
      <circle cx="80" cy="28" r="5" className="fill-terracotta" />
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse
          key={r}
          cx="105"
          cy="18"
          rx="3"
          ry="6"
          className="fill-gold"
          transform={`rotate(${r} 105 24)`}
        />
      ))}
    </svg>
  );
}

export function PlateArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 300"
      className={`w-full max-w-sm text-primary ${className ?? ""}`}
      aria-hidden="true"
    >
      <circle cx="150" cy="150" r="120" {...s} />
      <circle
        cx="150"
        cy="150"
        r="90"
        className="fill-background"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M110 180c10-50 50-80 90-70-5 45-45 75-90 70z" className="fill-sage" />
      <path d="M110 180c25-25 50-45 90-70" {...s} />
      <text
        x="60"
        y="95"
        className="fill-gold"
        style={{ font: "italic 110px 'Cormorant Garamond', serif" }}
      >
        “
      </text>
    </svg>
  );
}

export function MapArt() {
  return (
    <svg viewBox="0 0 300 160" className="h-40 w-full text-primary" aria-hidden="true">
      <rect width="300" height="160" className="fill-paper" />
      <path d="M0 110 Q80 90 150 115 T300 95" {...s} strokeWidth={10} className="text-sage" />
      <path d="M90 0 L120 160 M210 0 L180 160 M0 50 L300 40" {...s} strokeWidth={1} opacity=".4" />
      <circle cx="150" cy="70" r="22" className="fill-gold" opacity=".25" />
      <path
        d="M150 50a12 12 0 0 1 12 12c0 10-12 22-12 22s-12-12-12-22a12 12 0 0 1 12-12z"
        className="fill-primary"
      />
      <circle cx="150" cy="62" r="4" className="fill-gold" />
    </svg>
  );
}
