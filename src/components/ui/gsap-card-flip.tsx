// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip, SplitText);
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    prefersReducedMotion,
    getServerReducedMotionSnapshot,
  );
}

const CAPTION_FONT_VW = 1;
const CAPTION_LINE_RATIO = 1.3;
const CAPTION_LINE_VW = CAPTION_FONT_VW * CAPTION_LINE_RATIO;
const CAPTION_MOBILE_LINE_RATIO = 1.5;
const CAPTION_MOBILE_LINE = `${3 * CAPTION_MOBILE_LINE_RATIO}vw`;
const CAPTION_MOBILE_LINE_SM = `${3.5 * CAPTION_MOBILE_LINE_RATIO}vw`;

const UNSPLASH = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&h=1000&fit=crop`;

export interface GsapFlipCardItem {
  id?: string | number;
  /** Image URL. Any size works, but a ~4:5 portrait ratio matches the default layout best. */
  image: string;
  alt?: string;
  /** Short line shown next to the opened hero image. */
  caption?: string;
}

export interface GsapFlipCardProps {
  /** Cards to display. Defaults to a curated set of six sample photos. */
  items?: GsapFlipCardItem[];
  /** Heading shown in the info panel once a card is opened. */
  title?: string;
  /** Small meta line under the heading. */
  meta?: string;
  /** One-line description under the meta line. */
  description?: string;
  backgroundColor?: string;
  textColor?: string;
  mutedColor?: string;
  /** Card corner radius in pixels. */
  rounded?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  /** Spacing between desktop rail thumbnails in pixels. */
  thumbGap?: number;
  heroWidth?: number;
  heroHeight?: number;
  /** Flip transition duration in seconds. */
  duration?: number;
  /** GSAP ease string driving the Flip transition. */
  ease?: string;
  stackOffsetX?: number;
  stackOffsetY?: number;
  /** Rotation per card in the collapsed desktop stack, in degrees. */
  stackRotation?: number;
  /** Show the "01 / 06" slot counter. */
  showCounter?: boolean;
  captionLines?: number;
  captionFadeDuration?: number;
  captionRevealDuration?: number;
  captionLineStagger?: number;
  /** Called when the opened preview is dismissed. */
  onClose?: () => void;
  className?: string;
}

const defaultItems: GsapFlipCardItem[] = [
  {
    id: 0,
    image: UNSPLASH("1500534623283-312aade485b7"),
    alt: "Coastal cliffs meeting open water",
    caption: "Late light on the headland, shot from the cliff path.",
  },
  {
    id: 1,
    image: UNSPLASH("1519681393784-d120267933ba"),
    alt: "Mountain range under night sky",
    caption: "The ridge holds its last colour long after the sun goes.",
  },
  {
    id: 2,
    image: UNSPLASH("1470252649378-9c29740c9fa8"),
    alt: "Star field over a dark ridge",
    caption: "Clear enough that night to read the whole sky at once.",
  },
  {
    id: 3,
    image: UNSPLASH("1506905925346-21bda4d32df4"),
    alt: "Mist settling across a valley",
    caption: "Mist gathers in the valley before the morning burns it off.",
  },
  {
    id: 4,
    image: UNSPLASH("1439066615861-d1af74d74000"),
    alt: "Forest ridge in low cloud",
    caption: "Cloud sits low on the treeline and refuses to lift.",
  },
  {
    id: 5,
    image: UNSPLASH("1444927714506-8492d94b4e3d"),
    alt: "Waves breaking along a shoreline",
    caption: "The tide works the same stretch of shore all afternoon.",
  },
];

/**
 * A pile of cards that fans into a hero preview and a thumbnail rail. Tap any
 * frame and the two trade places, same DOM nodes, measured and tweened via
 * GSAP Flip — never re-mounted. Falls back to a stacked mobile layout, and to
 * an instant swap (no Flip travel) under `prefers-reduced-motion`.
 */
export default function GsapFlipCard({
  items = defaultItems,
  title = "GSAP Flip Card",
  meta = "Hyperiux Vault / GSAP Flip / React",
  description = "A pile of cards that fans into a hero and a rail. Tap any frame and the two trade places, same nodes, measured and tweened, never re-mounted.",
  backgroundColor = "#e9e9e7",
  textColor = "#111111",
  mutedColor = "#8a8a86",
  rounded = 20,
  thumbWidth = 108,
  thumbHeight = 120,
  thumbGap = 12,
  heroWidth = 530,
  heroHeight = 670,
  duration = 0.7,
  ease = "power3.inOut",
  stackOffsetX = 3,
  stackOffsetY = 9,
  stackRotation = 0,
  showCounter = true,
  captionLines = 2,
  captionFadeDuration = 0.25,
  captionRevealDuration = 0.55,
  captionLineStagger = 0.07,
  onClose,
  className = "",
}: GsapFlipCardProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i));
  const [opened, setOpened] = useState(false);
  const [stageWidth, setStageWidth] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const isAnimatingRef = useRef(false);
  const [shownCaption, setShownCaption] = useState<string | undefined>(() => items[0]?.caption);
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const captionTweenRef = useRef<gsap.core.Tween | null>(null);
  const captionSplitRef = useRef<SplitText | null>(null);

  const revertCaptionSplit = useCallback(() => {
    captionSplitRef.current?.revert();
    captionSplitRef.current = null;
  }, []);

  useEffect(() => {
    setOrder(items.map((_, i) => i));
  }, [items]);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => setStageWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const registerCard = useCallback((index: number, node: HTMLButtonElement | null) => {
    if (node) cardRefs.current.set(index, node);
    else cardRefs.current.delete(index);
  }, []);

  const orderedCards = useCallback(
    () => order.map((i) => cardRefs.current.get(i)).filter(Boolean) as HTMLButtonElement[],
    [order],
  );

  // Below this the stacked single-column layout takes over; above it, the
  // hero+rail layout scales down (see `isNarrow`/`scale`) rather than switching
  // modes, so real tablets and small laptop windows keep the Flip experience.
  const isMobile = stageWidth > 0 && stageWidth < 768;
  const isNarrow = stageWidth > 0 && stageWidth < 900;
  const railCount = Math.max(items.length - 1, 0);
  const scale = isNarrow ? Math.min(1, stageWidth / 900) : 1;
  const tW = thumbWidth * scale;
  const tH = thumbHeight * scale;
  const gap = thumbGap * scale;
  const hW = Math.min(heroWidth * scale, stageWidth * 0.46);
  const hH = heroHeight * (hW / heroWidth || 1);
  const railX = Math.max(24, stageWidth * 0.045);
  const heroX = stageWidth - hW - railX;
  const stackWidth = Math.min(215 * scale, stageWidth * 0.42);
  const stackHeight = stackWidth * 1.5;

  const slotBox = useCallback(
    (slot: number) => {
      if (slot === 0) {
        return { x: heroX, y: 0, w: hW, h: hH, r: rounded * scale, z: items.length + 1 };
      }
      const railHeight = railCount * tH + (railCount - 1) * gap;
      const top = -railHeight / 2 + (slot - 1) * (tH + gap);
      return {
        x: railX,
        y: top + tH / 2,
        w: tW,
        h: tH,
        r: rounded * 0.6 * scale,
        z: items.length - slot,
      };
    },
    [heroX, hW, hH, railX, tW, tH, gap, railCount, rounded, scale, items.length],
  );

  const select = useCallback(
    (itemIndex: number) => {
      if (itemIndex === order[0] || isAnimatingRef.current) return;
      if (!isMobile) {
        flipStateRef.current = Flip.getState(orderedCards(), { props: "borderRadius" });
      }
      setOrder((prev) => {
        const next = [...prev];
        const from = next.indexOf(itemIndex);
        if (from === -1 || next.length === 0) return prev;
        const first = next[0];
        if (first === undefined) return prev;
        next[from] = first;
        next[0] = itemIndex;
        return next;
      });
    },
    [order, orderedCards, isMobile],
  );

  useLayoutEffect(() => {
    const state = flipStateRef.current;
    if (!state) return;
    flipStateRef.current = null;
    if (reducedMotion || isMobile) return;
    isAnimatingRef.current = true;
    Flip.from(state, {
      duration,
      ease,
      absolute: true,
      props: "borderRadius",
      onEnter: (els) => gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration }),
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  }, [order, duration, ease, reducedMotion, isMobile]);

  const open = useCallback(() => {
    if (opened || isAnimatingRef.current || stageWidth === 0) return;
    if (reducedMotion) {
      setOpened(true);
      return;
    }
    const state = Flip.getState(orderedCards(), { props: "borderRadius" });
    setOpened(true);
    requestAnimationFrame(() => {
      isAnimatingRef.current = true;
      Flip.from(state, {
        duration: duration * 1.0,
        ease,
        absolute: true,
        props: "borderRadius",
        stagger: 0.04,
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    });
  }, [opened, stageWidth, reducedMotion, orderedCards, duration, ease]);

  const close = useCallback(() => {
    if (!opened || isAnimatingRef.current) return;
    if (reducedMotion) {
      setOpened(false);
      onClose?.();
      return;
    }
    const state = Flip.getState(orderedCards(), { props: "borderRadius" });
    setOpened(false);
    requestAnimationFrame(() => {
      isAnimatingRef.current = true;
      Flip.from(state, {
        duration: duration * 0.9,
        ease,
        absolute: true,
        props: "borderRadius",
        stagger: { each: 0.035, from: "end" },
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    });
    onClose?.();
  }, [opened, reducedMotion, orderedCards, duration, ease, onClose]);

  const firstItemIndex = order[0];
  const nextCaption = firstItemIndex !== undefined ? items[firstItemIndex]?.caption : undefined;
  const activeCaption = reducedMotion ? nextCaption : shownCaption;

  useEffect(() => {
    if (reducedMotion || nextCaption === shownCaption) return;
    const el = captionRef.current;
    if (!el) {
      revertCaptionSplit();
      setShownCaption(nextCaption);
      return;
    }
    captionTweenRef.current?.kill();
    captionTweenRef.current = gsap.to(el, {
      opacity: 0,
      y: -8,
      duration: captionFadeDuration,
      ease: "power2.in",
      onComplete: () => {
        revertCaptionSplit();
        setShownCaption(nextCaption);
      },
    });
  }, [nextCaption, shownCaption, reducedMotion, captionFadeDuration, revertCaptionSplit]);

  useLayoutEffect(() => {
    const el = captionRef.current;
    if (!el || !activeCaption) return;
    if (reducedMotion) {
      revertCaptionSplit();
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    captionTweenRef.current?.kill();
    revertCaptionSplit();
    gsap.set(el, { opacity: 1, y: 0 });
    const split = SplitText.create(el, {
      type: "lines",
      linesClass: "hxs-caption-line",
      mask: "lines",
    });
    captionSplitRef.current = split;
    const lines = split.lines;
    if (!lines?.length) {
      revertCaptionSplit();
      return;
    }
    gsap.set(lines, { yPercent: 100 });
    captionTweenRef.current = gsap.to(lines, {
      yPercent: 0,
      duration: captionRevealDuration,
      stagger: captionLineStagger,
      ease: "power3.out",
    });
    return () => {
      captionTweenRef.current?.kill();
      revertCaptionSplit();
    };
  }, [activeCaption, reducedMotion, captionRevealDuration, captionLineStagger, revertCaptionSplit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (!opened || items.length < 2) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        const next = order[1];
        if (next !== undefined) select(next);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        const prev = order[order.length - 1];
        if (prev !== undefined) select(prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [order, select, close, opened, items.length]);

  useEffect(() => {
    if (!isMobile || !opened) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobile, opened]);

  if (items.length === 0) return null;

  const heroItemIndex = order[0] ?? 0;
  const heroItem = items[heroItemIndex];
  const heroSlotLabel = heroItemIndex + 1;

  const cardStyle = (itemIndex: number): CSSProperties => {
    const slot = order.indexOf(itemIndex);
    if (!opened) {
      const w = stackWidth;
      const h = stackHeight;
      return {
        position: "absolute",
        left: stageWidth / 2 - w / 2,
        top: "50%",
        width: w,
        height: h,
        borderRadius: rounded * 0.75 * scale,
        transform: `translateY(-50%) translate(${slot * stackOffsetX}px, ${slot * stackOffsetY}px) rotate(${slot * stackRotation}deg)`,
        zIndex: items.length - slot,
      };
    }
    const box = slotBox(slot);
    return {
      position: "absolute",
      left: box.x,
      top: "50%",
      width: box.w,
      height: box.h,
      borderRadius: box.r,
      transform: `translateY(calc(-50% + ${box.y}px))`,
      zIndex: box.z,
    };
  };

  const chromeStyle: CSSProperties = {
    opacity: opened ? 1 : 0,
    transition: "opacity 0.5s ease 0.25s",
    pointerEvents: opened ? undefined : "none",
  };

  if (isMobile) {
    return (
      <div
        ref={rootRef}
        className={`hxs-gsap-flip-card relative w-full overflow-hidden ${className}`}
        style={{ background: backgroundColor, color: textColor }}
      >
        <div className="relative grid grid-cols-2 gap-3 p-4 sm:p-6">
          {showCounter && (
            <div className="col-span-2 flex items-center justify-between text-xs tracking-[0.08em] uppercase">
              <span className="font-semibold">Coleções</span>
              <span style={{ color: mutedColor }}>
                {String(items.length).padStart(2, "0")} opções
              </span>
            </div>
          )}
          {items.map((item, itemIndex) => (
            <button
              key={item.id ?? itemIndex}
              type="button"
              onClick={() => {
                setOrder((prev) => [itemIndex, ...prev.filter((index) => index !== itemIndex)]);
                open();
              }}
              aria-label={`Abrir ${item.alt ?? item.caption ?? `imagem ${itemIndex + 1}`}`}
              className={`relative aspect-[4/3] overflow-hidden border-none bg-[#d8d8d4] p-0 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] [-webkit-tap-highlight-color:transparent] ${itemIndex === 0 ? "col-span-2 aspect-[16/9]" : ""}`}
              style={{ borderRadius: rounded * 0.7 }}
            >
              <img
                src={item.image}
                alt={item.alt ?? ""}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 active:scale-105"
              />
            </button>
          ))}
          <p className="col-span-2 m-0 text-center text-sm" style={{ color: mutedColor }}>
            Toque em uma imagem para ver detalhes
          </p>
        </div>

        {opened && heroItem && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(25,30,20,0.78)] p-4 backdrop-blur-sm sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-gallery-title"
            onClick={(event) => event.target === event.currentTarget && close()}
          >
            <div
              className="relative flex max-h-[92svh] w-full max-w-lg flex-col overflow-hidden bg-[var(--surface-elevated)] p-4 shadow-2xl sm:p-6"
              style={{ borderRadius: rounded }}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Fechar galeria"
                className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-[rgba(255,255,255,0.88)] text-2xl leading-none text-[var(--primary)] shadow-md"
              >
                ×
              </button>
              <div
                className="relative aspect-[4/5] overflow-hidden bg-[#d8d8d4]"
                style={{ borderRadius: rounded * 0.7 }}
              >
                <img
                  src={heroItem.image}
                  alt={heroItem.alt ?? ""}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="pt-4">
                <p
                  className="m-0 text-xs uppercase tracking-[0.12em]"
                  style={{ color: mutedColor }}
                >
                  {String(heroSlotLabel).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </p>
                <h2 id="mobile-gallery-title" className="mt-2 text-3xl leading-tight">
                  {title}
                </h2>
                <p className="mt-2 mb-0 text-sm leading-relaxed" style={{ color: mutedColor }}>
                  {activeCaption ?? description}
                </p>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {items.map((item, itemIndex) => (
                  <button
                    key={item.id ?? itemIndex}
                    type="button"
                    onClick={() => select(itemIndex)}
                    aria-label={`Ver ${item.alt ?? `imagem ${itemIndex + 1}`}`}
                    aria-current={itemIndex === heroItemIndex}
                    className="relative aspect-square overflow-hidden border-2 border-transparent p-0 opacity-70 aria-[current=true]:border-[var(--gold)] aria-[current=true]:opacity-100"
                    style={{ borderRadius: rounded * 0.35 }}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`hxs-gsap-flip-card relative w-full min-h-svh overflow-hidden ${className}`}
      style={{ background: backgroundColor, color: textColor }}
    >
      {showCounter && (
        <div
          className="absolute top-[2.22vw] left-[2.78vw] text-[0.9vw] tracking-[0.02em] z-60"
          style={chromeStyle}
        >
          <span className="font-semibold">{String(heroSlotLabel).padStart(2, "0")}</span>
          <span style={{ color: mutedColor }}> / {String(items.length).padStart(2, "0")}</span>
        </div>
      )}

      <div
        ref={stageRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className={`relative w-full min-h-svh ${opened ? "cursor-pointer" : "cursor-default"}`}
      >
        <div
          className={`absolute top-1/2 -translate-y-1/2 max-w-[22.22vw] z-30 pointer-events-none ${
            isNarrow ? "hidden" : "block"
          }`}
          style={{ ...chromeStyle, left: railX + tW + Math.max(48, stageWidth * 0.06) }}
        >
          <h2 className="text-[3.2vw] leading-[1.05] font-normal tracking-[-0.02em] m-0">
            {title}
          </h2>
          <p className="text-[0.9vw] mt-[0.97vw] mb-[1.81vw] mx-0" style={{ color: mutedColor }}>
            {meta}
          </p>
          <p className="text-[0.97vw] leading-[1.65] m-0">{description}</p>
          <div className="mt-[1.94vw]" style={{ height: `${CAPTION_LINE_VW * captionLines}vw` }}>
            <p ref={captionRef} className="text-[1vw] w-[80%] text-left leading-[1.3] m-0">
              {activeCaption}
            </p>
          </div>
        </div>

        {items.map((item, itemIndex) => {
          const isHero = itemIndex === heroItemIndex;
          return (
            <button
              key={item.id ?? itemIndex}
              type="button"
              ref={(n) => registerCard(itemIndex, n)}
              data-flip-id={`hxs-card-${item.id ?? itemIndex}`}
              onClick={() => (opened ? select(itemIndex) : open())}
              aria-label={
                opened
                  ? (item.alt ?? item.caption ?? `Image ${itemIndex + 1}`)
                  : `Open gallery — ${items.length} images`
              }
              aria-current={(opened && isHero) || undefined}
              tabIndex={!opened ? (itemIndex === order[0] ? 0 : -1) : isHero ? -1 : 0}
              className={`p-0 border-none bg-[#d8d8d4] overflow-hidden shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] [-webkit-tap-highlight-color:transparent] ${
                !opened || !isHero ? "cursor-pointer" : "cursor-default"
              }`}
              style={cardStyle(itemIndex)}
            >
              <img
                src={item.image}
                alt={item.alt ?? ""}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover rounded-[inherit]"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
