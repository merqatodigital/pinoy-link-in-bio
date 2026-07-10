"use client";

import { useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import type { StoreBlock, StorefrontConfig } from "@/types/bayanlink";
import { themes } from "@/data/demo-store";

type StorefrontProps = {
  store: StorefrontConfig;
  compact?: boolean;
};

function safeHref(value: string) {
  return value && value !== "#" ? value : undefined;
}

function getYouTubeEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : undefined;
    }
    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop();
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : undefined;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

function playTing(enabled: boolean) {
  if (!enabled || typeof window === "undefined") return;
  const AudioContextClass =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const gain = context.createGain();
  const high = context.createOscillator();
  const low = context.createOscillator();
  const now = context.currentTime;

  high.type = "sine";
  high.frequency.setValueAtTime(1320, now);
  high.frequency.exponentialRampToValueAtTime(880, now + 0.16);
  low.type = "sine";
  low.frequency.setValueAtTime(660, now);
  low.frequency.exponentialRampToValueAtTime(440, now + 0.19);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.11, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

  high.connect(gain);
  low.connect(gain);
  gain.connect(context.destination);
  high.start(now);
  low.start(now + 0.018);
  high.stop(now + 0.23);
  low.stop(now + 0.24);

  window.setTimeout(() => void context.close(), 320);
}

function ProductCard({ block, compact, soundEnabled }: { block: StoreBlock; compact: boolean; soundEnabled: boolean }) {
  const href = safeHref(block.url);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    playTing(soundEnabled);
    if (!href) event.preventDefault();
  }

  return (
    <article className="overflow-hidden rounded-[24px] shadow-[0_12px_32px_rgba(15,23,42,0.10)]" style={{ background: "var(--store-surface)", color: "var(--store-text)" }}>
      {block.image ? (
        <div
          className={`${compact ? "h-36" : "h-52 sm:h-60"} relative bg-cover bg-center`}
          style={{ backgroundImage: `linear-gradient(180deg, transparent 42%, rgba(0,0,0,.42)), url(${block.image})` }}
          role="img"
          aria-label={block.title}
        >
          {block.badge ? (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-800 backdrop-blur">
              {block.badge}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className={compact ? "p-4" : "p-5"}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className={`${compact ? "text-sm" : "text-lg"} font-black leading-tight`}>{block.title}</h3>
            <p className={`${compact ? "mt-1 text-[11px]" : "mt-1.5 text-sm"}`} style={{ color: "var(--store-muted)" }}>
              {block.subtitle}
            </p>
          </div>
          {typeof block.price === "number" ? (
            <strong className={`${compact ? "text-sm" : "text-lg"} shrink-0`}>₱{block.price.toLocaleString("en-PH")}</strong>
          ) : null}
        </div>
        <a
          href={href}
          onClick={handleClick}
          className={`${compact ? "mt-3 py-2.5 text-xs" : "mt-4 py-3 text-sm"} block rounded-full text-center font-black transition hover:brightness-95`}
          style={{ background: "var(--store-primary)", color: "var(--store-button-text)" }}
        >
          {block.cta || "Open"}
        </a>
      </div>
    </article>
  );
}

function VideoCard({ block, compact, soundEnabled }: { block: StoreBlock; compact: boolean; soundEnabled: boolean }) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(block.url);
  const directVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(block.url);

  function startVideo() {
    playTing(soundEnabled);
    setPlaying(true);
  }

  return (
    <article className="overflow-hidden rounded-[24px] shadow-[0_12px_32px_rgba(15,23,42,0.12)]" style={{ background: "var(--store-surface)", color: "var(--store-text)" }}>
      {playing && embedUrl ? (
        <div className="aspect-video bg-black">
          <iframe
            className="h-full w-full"
            src={embedUrl}
            title={block.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : playing && directVideo ? (
        <video className="aspect-video w-full bg-black object-cover" src={block.url} controls autoPlay playsInline poster={block.image} />
      ) : (
        <button
          type="button"
          onClick={startVideo}
          className={`${compact ? "h-44" : "h-56 sm:h-64"} relative block w-full bg-cover bg-center text-left`}
          style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.50)), url(${block.image})` }}
          aria-label={`Play ${block.title}`}
        >
          {block.badge ? (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-800 backdrop-blur">
              {block.badge}
            </span>
          ) : null}
          <span className="absolute inset-0 grid place-items-center">
            <span className={`${compact ? "h-14 w-14" : "h-16 w-16"} grid place-items-center rounded-full bg-white/92 text-xl text-slate-950 shadow-xl backdrop-blur`}>▶</span>
          </span>
          <span className="absolute bottom-4 left-4 right-4 text-white">
            <span className={`${compact ? "text-sm" : "text-xl"} block font-black`}>{block.title}</span>
            <span className={`${compact ? "mt-1 text-[11px]" : "mt-1 text-sm"} block text-white/75`}>{block.subtitle}</span>
          </span>
        </button>
      )}
      <div className={`${compact ? "p-3" : "p-4"} flex items-center justify-between gap-3`}>
        <div className="min-w-0">
          <p className={`${compact ? "text-[10px]" : "text-xs"} font-bold uppercase tracking-[0.16em]`} style={{ color: "var(--store-muted)" }}>Video story</p>
          <p className={`${compact ? "text-xs" : "text-sm"} mt-1 truncate font-bold`}>{playing ? "Now playing" : block.cta || "Watch video"}</p>
        </div>
        {!playing ? (
          <button type="button" onClick={startVideo} className="shrink-0 rounded-full px-4 py-2 text-xs font-black" style={{ background: "var(--store-primary)", color: "var(--store-button-text)" }}>
            Play
          </button>
        ) : null}
      </div>
    </article>
  );
}

function ReviewCard({ block, compact }: { block: StoreBlock; compact: boolean }) {
  const rating = Math.min(5, Math.max(1, block.rating ?? 5));
  return (
    <article className={`${compact ? "p-4" : "p-5"} rounded-[24px] border border-white/35 shadow-sm backdrop-blur`} style={{ background: "color-mix(in srgb, var(--store-surface) 88%, transparent)", color: "var(--store-text)" }}>
      <div className="flex items-center justify-between gap-3">
        <span className={`${compact ? "text-sm" : "text-base"} tracking-[0.08em] text-amber-500`}>{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>
        <span className="rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em]" style={{ background: "var(--store-primary)", color: "var(--store-button-text)" }}>
          Suki says
        </span>
      </div>
      <blockquote className={`${compact ? "mt-3 text-xs leading-5" : "mt-4 text-base leading-7"} font-semibold`}>&ldquo;{block.subtitle}&rdquo;</blockquote>
      <p className={`${compact ? "mt-3 text-[10px]" : "mt-4 text-xs"} font-bold`} style={{ color: "var(--store-muted)" }}>— {block.title}</p>
    </article>
  );
}

function LinkCard({ block, compact, soundEnabled }: { block: StoreBlock; compact: boolean; soundEnabled: boolean }) {
  const href = safeHref(block.url);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    playTing(soundEnabled);
    if (!href) event.preventDefault();
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${compact ? "min-h-14 px-4 py-3" : "min-h-16 px-5 py-4"} flex items-center justify-between gap-4 rounded-[20px] border border-white/30 font-semibold shadow-sm backdrop-blur transition hover:-translate-y-0.5`}
      style={{ background: "color-mix(in srgb, var(--store-surface) 90%, transparent)", color: "var(--store-text)" }}
    >
      <span className="min-w-0">
        <span className={`${compact ? "text-xs" : "text-sm"} block truncate font-black`}>{block.title}</span>
        {block.subtitle ? (
          <span className={`${compact ? "text-[10px]" : "text-xs"} mt-0.5 block truncate`} style={{ color: "var(--store-muted)" }}>{block.subtitle}</span>
        ) : null}
      </span>
      <span aria-hidden="true" className="text-lg">↗</span>
    </a>
  );
}

export function Storefront({ store, compact = false }: StorefrontProps) {
  const { profile } = store;
  const theme = themes[profile.themeId] ?? themes.barong;
  const visibleBlocks = store.blocks.filter((block) => block.visible);
  const featured = visibleBlocks.filter((block) => (block.kind === "product" || block.kind === "video") && block.featured);
  const remaining = visibleBlocks.filter((block) => !featured.some((item) => item.id === block.id));
  const ordered = [...featured, ...remaining];

  return (
    <div
      className={`${compact ? "min-h-[730px]" : "min-h-screen"}`}
      style={
        {
          background: `radial-gradient(circle at 12% 0%, ${theme.accent}3d, transparent 30%), ${theme.background}`,
          color: theme.text,
          "--store-primary": theme.primary,
          "--store-button-text": theme.buttonText,
          "--store-surface": theme.surface,
          "--store-text": theme.text,
          "--store-muted": theme.muted,
        } as CSSProperties
      }
    >
      <div className={`mx-auto ${compact ? "max-w-[360px]" : "max-w-[600px]"}`}>
        <div
          className={`${compact ? "h-32" : "h-48 sm:h-56"} relative bg-cover bg-center`}
          style={{ backgroundImage: `${theme.heroOverlay}, url(${profile.coverUrl})` }}
          role="img"
          aria-label={`${profile.businessName} cover`}
        >
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-white">
            <span className="rounded-full bg-black/25 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] backdrop-blur">BayanLink</span>
            <button type="button" className="grid h-9 w-9 place-items-center rounded-full bg-black/25 text-sm backdrop-blur" aria-label="Share page">↗</button>
          </div>
        </div>

        <div className={`${compact ? "px-4 pb-5" : "px-4 pb-8 sm:px-6"}`}>
          <header className={`${compact ? "-mt-10" : "-mt-14"} relative text-center`}>
            <div className="relative mx-auto w-fit">
              <div
                className={`${compact ? "h-20 w-20" : "h-28 w-28"} rounded-full border-4 border-white bg-cover bg-center shadow-xl`}
                style={{ backgroundImage: `url(${profile.avatarUrl})` }}
                role="img"
                aria-label={`${profile.businessName} profile`}
              />
              {profile.verified ? (
                <span className={`${compact ? "h-6 w-6 text-[11px]" : "h-8 w-8 text-sm"} absolute -bottom-1 -right-1 grid place-items-center rounded-full border-2 border-white bg-sky-500 font-black text-white`} title="Verified BayanLink business">
                  ✓
                </span>
              ) : null}
            </div>
            <h1 className={`${compact ? "mt-4 text-xl" : "mt-5 text-3xl"} font-black tracking-[-0.04em]`}>{profile.businessName}</h1>
            <p className={`${compact ? "mt-1 text-[11px]" : "mt-1.5 text-sm"}`} style={{ color: theme.muted }}>
              @{profile.username} · {profile.location}
            </p>
            <p className={`${compact ? "mt-3 text-xs leading-5" : "mx-auto mt-4 max-w-md text-base leading-7"}`} style={{ color: theme.muted }}>
              {profile.bio}
            </p>

            {profile.trustEnabled ? (
              <div className={`${compact ? "mt-3" : "mt-4"} inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-50 px-3 py-2 text-[10px] font-black text-amber-900 shadow-sm`}>
                <span className="text-amber-500">★</span>
                {profile.sukiScore.toFixed(1)} Suki Trust · {profile.reviewCount.toLocaleString("en-PH")} reviews
              </div>
            ) : null}
          </header>

          <div className={`${compact ? "mt-5 gap-2" : "mt-7 gap-3"} grid grid-cols-2`}>
            <a href={profile.messengerUrl} onClick={() => playTing(profile.soundEnabled)} className={`${compact ? "py-2.5 text-xs" : "py-3.5 text-sm"} rounded-full bg-[#0866ff] text-center font-black text-white shadow-sm`}>
              PM is key
            </a>
            <a href={profile.whatsappUrl} onClick={() => playTing(profile.soundEnabled)} className={`${compact ? "py-2.5 text-xs" : "py-3.5 text-sm"} rounded-full bg-[#25d366] text-center font-black text-white shadow-sm`}>
              WhatsApp
            </a>
          </div>

          <main className={compact ? "mt-5 space-y-3" : "mt-8 space-y-4"}>
            {ordered.map((block) => {
              if (block.kind === "product") return <ProductCard key={block.id} block={block} compact={compact} soundEnabled={profile.soundEnabled} />;
              if (block.kind === "video") return <VideoCard key={block.id} block={block} compact={compact} soundEnabled={profile.soundEnabled} />;
              if (block.kind === "review") return <ReviewCard key={block.id} block={block} compact={compact} />;
              return <LinkCard key={block.id} block={block} compact={compact} soundEnabled={profile.soundEnabled} />;
            })}
          </main>

          <section className={`${compact ? "mt-4 p-3" : "mt-6 p-5"} rounded-[20px] border border-white/30 shadow-sm backdrop-blur`} style={{ background: "color-mix(in srgb, var(--store-surface) 82%, transparent)", color: "var(--store-text)" }}>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className={`${compact ? "text-[9px]" : "text-[11px]"} font-bold uppercase tracking-[0.18em]`} style={{ color: "var(--store-muted)" }}>Pay your way</p>
                <p className={`${compact ? "mt-1 text-[11px]" : "mt-1.5 text-sm"} truncate font-semibold`}>{profile.payments.join(" · ") || "Ask the seller"}</p>
              </div>
              <span className={compact ? "text-xl" : "text-2xl"} aria-hidden="true">🇵🇭</span>
            </div>
          </section>

          <footer className={`${compact ? "pb-2 pt-5 text-[9px]" : "pb-3 pt-8 text-[11px]"} text-center font-semibold uppercase tracking-[0.18em]`} style={{ color: theme.muted }}>
            Sarili mong link · Made with BayanLink
          </footer>
        </div>
      </div>
    </div>
  );
}
