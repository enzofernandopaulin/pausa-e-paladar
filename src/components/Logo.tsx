import mono from "@/assets/logo_pp.jpg.asset.json";
import word from "@/assets/logo_pausa_paladar.jpg.asset.json";

export function Logo({ size = 48 }: { size?: number }) {
  return (
    <img
      src={mono.url}
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
      src={word.url}
      width={1080}
      height={1080}
      loading="lazy"
      alt="Pausa & Paladar — Celebre o agora"
      className={`aspect-[2/1] object-cover ${className}`}
    />
  );
}
