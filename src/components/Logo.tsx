export function Logo({ size = 48 }: { size?: number }) {
  return (
    <img
      src="/logo-pp.jpeg"
      width={size}
      height={size}
      alt="Logotipo P&P — Pausa & Paladar"
      className="rounded-full"
      style={{ width: size, height: size, objectFit: "cover" }}
    />
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/logo-wordmark.jpeg"
      width={1080}
      height={1080}
      loading="lazy"
      alt="Pausa & Paladar — Celebre o agora"
      className={`object-contain ${className}`}
    />
  );
}
