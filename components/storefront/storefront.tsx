"use client";

import type { StoreBlock, StorefrontConfig } from "@/types/bayanlink";
import { themes } from "@/data/demo-store";

type StorefrontProps = {
  store: StorefrontConfig;
  compact?: boolean;
};

function safeHref(value: string) {
  return value && value !== "#" ? value : undefined;
}

function ProductCard({ block, compact }: { block: StoreBlock; compact: boolean }) {
  return (
    <article className="overflow-hidden rounded-[24px] bg-white text-slate-950 shadow-[0_12px_32px_rgba(15,23,42,0.10)]">
      {block.image ? (
        <div
          className={`${compact ? "h-32" : "h-48 sm:h-56"} relative bg-cover bg-center`}
          style={{
            backgroundImage: `linear-gradient(180deg, transparent 45%, rgba(0,0,0,.34)), url(${block.image})`,
          }}
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
            <h3 className={`${compact ? "text-sm" : "text-lg"} font-bold leading-tight`}>{block.title}</h3>
            <p className={`${compact ? "mt-1 text-[11px]" : "mt-1.5 text-sm"} text-slate-500`}>{block.subtitle}</p>
          </div>
          {typeof block.price === "number" ? (
            <strong className={`${compact ? "text-sm" : "text-lg"} shrink-0`}>
              ₱{block.price.toLocaleString("en-PH")}
            </strong>
          ) : null}
        </div>
        <a
          href={safeHref(block.url)}
          onClick={(event) => {
            if (!safeHref(block.url)) event.preventDefault();
          }}
          className={`${compact ? "mt-3 py-2.5 text-xs" : "mt-4 py-3 text-sm"} block rounded-full text-center font-bold transition hover:brightness-95`}
          style={{ background: "var(--store-primary)", color: "var(--store-button-text)" }}
        >
          {block.cta}
        </a>
      </div>
    </article>
  );
}

function LinkCard({ block, compact }: { block: StoreBlock; compact: boolean }) {
  return (
    <a
      href={safeHref(block.url)}
      onClick={(event) => {
        if (!safeHref(block.url)) event.preventDefault();
      }}
      className={`${compact ? "min-h-14 px-4 py-3" : "min-h-16 px-5 py-4"} flex items-center justify-between gap-4 rounded-[20px] border border-white/30 bg-white/85 font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white`}
    >
      <span className="min-w-0">
        <span className={`${compact ? "text-xs" : "text-sm"} block truncate font-bold`}>{block.title}</span>
        {block.subtitle ? <span className={`${compact ? "text-[10px]" : "text-xs"} mt-0.5 block truncate text-slate-500`}>{block.subtitle}</span> : null}
      </span>
      <span aria-hidden="true" className="text-lg">↗</span>
    </a>
  );
}

export function Storefront({ store, compact = false }: StorefrontProps) {
  const { profile } = store;
  const theme = themes[profile.themeId];
  const visibleBlocks = store.blocks.filter((block) => block.visible);
  const featured = visibleBlocks.filter((block) => block.kind === "product" && block.featured);
  const remaining = visibleBlocks.filter((block) => !featured.some((item) => item.id === block.id));

  return (
    <div
      className={`${compact ? "min-h-[710px] p-4" : "min-h-screen px-4 py-8 sm:px-6 sm:py-12"}`}
      style={
        {
          background: `radial-gradient(circle at 12% 0%, ${theme.accent}2e, transparent 28%), ${theme.background}`,
          color: theme.text,
          "--store-primary": theme.primary,
          "--store-button-text": theme.buttonText,
        } as React.CSSProperties
      }
    >
      <div className={`mx-auto ${compact ? "max-w-[330px]" : "max-w-[560px]"}`}>
        <header className="text-center">
          <div className="relative mx-auto w-fit">
            <div
              className={`${compact ? "h-20 w-20" : "h-28 w-28"} rounded-full border-4 border-white bg-cover bg-center shadow-xl`}
              style={{ backgroundImage: `url(${profile.avatarUrl})` }}
              role="img"
              aria-label={`${profile.businessName} profile`}
            />
            {profile.verified ? (
              <span
                className={`${compact ? "h-6 w-6 text-[11px]" : "h-8 w-8 text-sm"} absolute -bottom-1 -right-1 grid place-items-center rounded-full border-2 border-white bg-sky-500 font-black text-white`}
                title="Verified BayanLink business"
              >
                ✓
              </span>
            ) : null}
          </div>
          <h1 className={`${compact ? "mt-4 text-xl" : "mt-5 text-3xl"} font-black tracking-[-0.03em]`}>{profile.businessName}</h1>
          <p className={`${compact ? "mt-1 text-[11px]" : "mt-1.5 text-sm"}`} style={{ color: theme.muted }}>
            @{profile.username} · {profile.location}
          </p>
          <p className={`${compact ? "mt-3 text-xs leading-5" : "mx-auto mt-4 max-w-md text-base leading-7"}`} style={{ color: theme.muted }}>
            {profile.bio}
          </p>
        </header>

        <div className={`${compact ? "mt-5 gap-2" : "mt-7 gap-3"} grid grid-cols-2`}>
          <a
            href={profile.messengerUrl}
            className={`${compact ? "py-2.5 text-xs" : "py-3.5 text-sm"} rounded-full bg-[#0866ff] text-center font-bold text-white shadow-sm`}
          >
            Messenger
          </a>
          <a
            href={profile.whatsappUrl}
            className={`${compact ? "py-2.5 text-xs" : "py-3.5 text-sm"} rounded-full bg-[#25d366] text-center font-bold text-white shadow-sm`}
          >
            WhatsApp
          </a>
        </div>

        <main className={compact ? "mt-5 space-y-3" : "mt-8 space-y-4"}>
          {[...featured, ...remaining].map((block) =>
            block.kind === "product" ? (
              <ProductCard key={block.id} block={block} compact={compact} />
            ) : (
              <LinkCard key={block.id} block={block} compact={compact} />
            )
          )}
        </main>

        <section
          className={`${compact ? "mt-4 p-3" : "mt-6 p-5"} rounded-[20px] border border-white/30 bg-white/65 text-slate-800 shadow-sm backdrop-blur`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={`${compact ? "text-[9px]" : "text-[11px]"} font-bold uppercase tracking-[0.18em] text-slate-500`}>Pay your way</p>
              <p className={`${compact ? "mt-1 text-[11px]" : "mt-1.5 text-sm"} font-semibold`}>{profile.payments.join(" · ")}</p>
            </div>
            <span className={compact ? "text-xl" : "text-2xl"} aria-hidden="true">🇵🇭</span>
          </div>
        </section>

        <footer className={`${compact ? "pb-2 pt-5 text-[9px]" : "pb-3 pt-8 text-[11px]"} text-center font-semibold uppercase tracking-[0.18em]`} style={{ color: theme.muted }}>
          Made with BayanLink
        </footer>
      </div>
    </div>
  );
}
