"use client";

import { useState } from "react";
import { magicDrafts } from "@/data/magic-presets";
import { themes } from "@/data/demo-store";
import type {
  BlockKind,
  EditorSection,
  MagicPreset,
  StoreBlock,
  StoreProfile,
  StorefrontConfig,
  ThemeId,
} from "@/types/bayanlink";

type EditorPanelProps = {
  active: EditorSection;
  store: StorefrontConfig;
  onProfileChange: <K extends keyof StoreProfile>(key: K, value: StoreProfile[K]) => void;
  onBlockChange: <K extends keyof StoreBlock>(id: string, key: K, value: StoreBlock[K]) => void;
  onAddBlock: (kind: BlockKind) => void;
  onRemoveBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: -1 | 1) => void;
  onApplyMagicDraft: (preset: MagicPreset, businessName: string, location: string) => void;
  onReset: () => void;
};

const fieldClass =
  "mt-2 min-w-0 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 sm:text-sm";
const labelClass = "block text-sm font-bold text-slate-800";

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="mb-5 sm:mb-7">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-700">{eyebrow}</p>
      <h1 className="mt-2 text-xl font-black tracking-[-0.035em] text-slate-950 sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
    </header>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="inline-flex min-h-10 items-center gap-2 text-xs font-bold text-slate-600" aria-pressed={checked}>
      <span className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-violet-600" : "bg-slate-300"}`}>
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${checked ? "left-6" : "left-1"}`} />
      </span>
      {label}
    </button>
  );
}

function AiStudio({ store, onApplyMagicDraft }: Pick<EditorPanelProps, "store" | "onApplyMagicDraft">) {
  const [preset, setPreset] = useState<MagicPreset>("stay");
  const [businessName, setBusinessName] = useState(store.profile.businessName);
  const [location, setLocation] = useState(store.profile.location);

  return (
    <>
      <SectionHeading
        eyebrow="Bayan AI Studio"
        title="Start with a page that already understands your business"
        description="Choose what you sell. BayanLink creates the theme, visual blocks, calls to action, and page order—then you make it yours."
      />

      <div className="rounded-[26px] bg-slate-950 p-4 text-white sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-300">Magic first draft</p>
            <h2 className="mt-2 text-xl font-black tracking-tight sm:text-2xl">What kind of BayanLink are we building?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">This prototype uses smart Filipino business presets. The production version will connect the same flow to a real AI model.</p>
          </div>
          <span className="w-fit rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">AI-ready</span>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {(Object.entries(magicDrafts) as Array<[MagicPreset, (typeof magicDrafts)[MagicPreset]]>).map(([id, draft]) => {
            const selected = id === preset;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setPreset(id)}
                className={`rounded-2xl border p-3 text-left transition ${
                  selected ? "border-violet-300 bg-violet-400/20" : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <span className="text-xl">{draft.icon}</span>
                <span className="mt-2 block text-sm font-black">{draft.label}</span>
                <span className="mt-1 block text-[10px] leading-4 text-white/50">{draft.description}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <label className="text-xs font-bold text-white/70">
            Business or creator name
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white outline-none placeholder:text-white/35 focus:border-violet-300 sm:text-sm"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              placeholder={magicDrafts[preset].exampleName}
            />
          </label>
          <label className="text-xs font-bold text-white/70">
            Location or community
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white outline-none placeholder:text-white/35 focus:border-violet-300 sm:text-sm"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Quezon City, Cebu, Palawan…"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={() => onApplyMagicDraft(preset, businessName, location)}
          className="mt-4 min-h-12 w-full rounded-2xl bg-violet-400 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-violet-500/20 transition hover:bg-violet-300"
        >
          ✦ Create my BayanLink draft
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          ["01", "AI chooses the flow", "The best first block changes for a creator, food seller, resort, or shop."],
          ["02", "You keep control", "Every word, image, price, link, and color remains editable."],
          ["03", "Built to sell visually", "Video, products, suki reviews, messaging, and local payments work together."],
        ].map(([number, title, text]) => (
          <div key={number} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[10px] font-black text-violet-700">{number}</p>
            <p className="mt-2 text-sm font-black text-slate-900">{title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function MyPage({ store, onProfileChange }: Pick<EditorPanelProps, "store" | "onProfileChange">) {
  const { profile } = store;
  return (
    <>
      <SectionHeading
        eyebrow="Your identity"
        title="Make it feel proudly yours"
        description="Lead with a strong cover, a recognizable face or logo, and the trust signals customers already look for."
      />
      <div className="grid gap-5 md:grid-cols-2">
        <label className={labelClass}>
          Business name
          <input className={fieldClass} value={profile.businessName} onChange={(event) => onProfileChange("businessName", event.target.value)} />
        </label>
        <label className={labelClass}>
          BayanLink username
          <div className="mt-2 flex overflow-hidden rounded-2xl border border-slate-200 bg-white focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/10">
            <span className="grid place-items-center bg-slate-50 px-3 text-xs font-semibold text-slate-400">/</span>
            <input
              className="min-w-0 flex-1 px-3 py-3 text-base outline-none sm:text-sm"
              value={profile.username}
              onChange={(event) => onProfileChange("username", event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            />
          </div>
        </label>
      </div>
      <label className={`${labelClass} mt-5`}>
        One-line story
        <textarea className={`${fieldClass} resize-none`} rows={3} value={profile.bio} onChange={(event) => onProfileChange("bio", event.target.value)} />
      </label>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className={labelClass}>
          Location
          <input className={fieldClass} value={profile.location} onChange={(event) => onProfileChange("location", event.target.value)} />
        </label>
        <label className={labelClass}>
          Profile photo URL
          <input className={fieldClass} value={profile.avatarUrl} onChange={(event) => onProfileChange("avatarUrl", event.target.value)} />
        </label>
      </div>
      <label className={`${labelClass} mt-5`}>
        Cover photo URL
        <input className={fieldClass} value={profile.coverUrl} onChange={(event) => onProfileChange("coverUrl", event.target.value)} />
      </label>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900">Verified business badge</p>
              <p className="mt-1 text-xs text-slate-500">A platform verification signal beside the profile.</p>
            </div>
            <Toggle checked={profile.verified} onChange={(value) => onProfileChange("verified", value)} label={profile.verified ? "On" : "Off"} />
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-amber-950">Suki Trust Badge</p>
              <p className="mt-1 text-xs text-amber-800/70">Show a familiar rating and repeat-customer signal.</p>
            </div>
            <Toggle checked={profile.trustEnabled} onChange={(value) => onProfileChange("trustEnabled", value)} label={profile.trustEnabled ? "On" : "Off"} />
          </div>
        </div>
      </div>

      {profile.trustEnabled ? (
        <div className="mt-3 grid gap-3 rounded-2xl border border-amber-200 bg-white p-4 sm:grid-cols-2">
          <label className="text-xs font-bold text-slate-600">
            Suki score
            <input type="number" min="1" max="5" step="0.1" className={fieldClass} value={profile.sukiScore} onChange={(event) => onProfileChange("sukiScore", Math.min(5, Math.max(1, Number(event.target.value) || 1)))} />
          </label>
          <label className="text-xs font-bold text-slate-600">
            Review count
            <input type="number" min="0" className={fieldClass} value={profile.reviewCount} onChange={(event) => onProfileChange("reviewCount", Math.max(0, Number(event.target.value) || 0))} />
          </label>
        </div>
      ) : null}
    </>
  );
}

const blockMeta: Record<BlockKind, { icon: string; label: string }> = {
  product: { icon: "🛍️", label: "Visual offer" },
  video: { icon: "▶", label: "Video story" },
  review: { icon: "★", label: "Suki review" },
  link: { icon: "↗", label: "Simple link" },
};

function Blocks({ store, onBlockChange, onAddBlock, onRemoveBlock, onMoveBlock }: Pick<EditorPanelProps, "store" | "onBlockChange" | "onAddBlock" | "onRemoveBlock" | "onMoveBlock">) {
  return (
    <>
      <SectionHeading
        eyebrow="Visual content"
        title="Give every tap a reason"
        description="Mix products, video, social proof, and simple links. Put your strongest visual story first."
      />

      <div className="mb-5 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {([
          ["product", "🛍️", "Product or service"],
          ["video", "▶", "Video or reel"],
          ["review", "★", "Suki review"],
          ["link", "↗", "Simple link"],
        ] as Array<[BlockKind, string, string]>).map(([kind, icon, label]) => (
          <button
            key={kind}
            type="button"
            onClick={() => onAddBlock(kind)}
            className={`min-h-20 rounded-2xl border p-3 text-left transition ${kind === "product" ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/10" : "border-slate-200 bg-white text-slate-800 hover:border-violet-300 hover:bg-violet-50"}`}
          >
            <span className="text-lg">{icon}</span>
            <span className="mt-2 block text-xs font-black sm:text-sm">{label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {store.blocks.map((block, index) => {
          const meta = blockMeta[block.kind];
          return (
            <article key={block.id} className={`rounded-[22px] border bg-white p-3 shadow-sm transition sm:rounded-[24px] sm:p-4 ${block.visible ? "border-slate-200" : "border-dashed border-slate-300 opacity-65"}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-lg">{meta.icon}</div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-slate-950">{block.title || "Untitled block"}</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{meta.label}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 self-end sm:self-auto">
                  <button type="button" disabled={index === 0} onClick={() => onMoveBlock(block.id, -1)} className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-xs disabled:opacity-30" aria-label="Move up">↑</button>
                  <button type="button" disabled={index === store.blocks.length - 1} onClick={() => onMoveBlock(block.id, 1)} className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-xs disabled:opacity-30" aria-label="Move down">↓</button>
                  <button type="button" onClick={() => onRemoveBlock(block.id)} className="grid h-9 w-9 place-items-center rounded-lg text-xs text-rose-600 hover:bg-rose-50" aria-label="Delete">×</button>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <label className="text-xs font-bold text-slate-600">
                  {block.kind === "review" ? "Customer name" : "Title"}
                  <input className={fieldClass} value={block.title} onChange={(event) => onBlockChange(block.id, "title", event.target.value)} />
                </label>
                <label className="text-xs font-bold text-slate-600">
                  {block.kind === "review" ? "Review quote" : "Supporting text"}
                  <input className={fieldClass} value={block.subtitle} onChange={(event) => onBlockChange(block.id, "subtitle", event.target.value)} />
                </label>

                {block.kind === "product" ? (
                  <>
                    <label className="text-xs font-bold text-slate-600">
                      Price in pesos
                      <input type="number" min="0" className={fieldClass} value={block.price ?? 0} onChange={(event) => onBlockChange(block.id, "price", Number(event.target.value) || 0)} />
                    </label>
                    <label className="text-xs font-bold text-slate-600">
                      Photo URL
                      <input className={fieldClass} value={block.image} onChange={(event) => onBlockChange(block.id, "image", event.target.value)} />
                    </label>
                    <label className="text-xs font-bold text-slate-600">
                      Button label
                      <input className={fieldClass} value={block.cta} onChange={(event) => onBlockChange(block.id, "cta", event.target.value)} />
                    </label>
                    <label className="text-xs font-bold text-slate-600">
                      Order or booking destination
                      <input className={fieldClass} value={block.url} onChange={(event) => onBlockChange(block.id, "url", event.target.value)} />
                    </label>
                    <label className="text-xs font-bold text-slate-600 md:col-span-2">
                      Badge text
                      <input className={fieldClass} value={block.badge ?? ""} onChange={(event) => onBlockChange(block.id, "badge", event.target.value)} placeholder="Best seller, New, Direct rate…" />
                    </label>
                  </>
                ) : null}

                {block.kind === "video" ? (
                  <>
                    <label className="text-xs font-bold text-slate-600">
                      YouTube or video URL
                      <input className={fieldClass} value={block.url} onChange={(event) => onBlockChange(block.id, "url", event.target.value)} />
                    </label>
                    <label className="text-xs font-bold text-slate-600">
                      Poster image URL
                      <input className={fieldClass} value={block.image} onChange={(event) => onBlockChange(block.id, "image", event.target.value)} />
                    </label>
                    <label className="text-xs font-bold text-slate-600">
                      Button label
                      <input className={fieldClass} value={block.cta} onChange={(event) => onBlockChange(block.id, "cta", event.target.value)} />
                    </label>
                    <label className="text-xs font-bold text-slate-600">
                      Badge text
                      <input className={fieldClass} value={block.badge ?? ""} onChange={(event) => onBlockChange(block.id, "badge", event.target.value)} />
                    </label>
                  </>
                ) : null}

                {block.kind === "link" ? (
                  <>
                    <label className="text-xs font-bold text-slate-600">
                      Button label
                      <input className={fieldClass} value={block.cta} onChange={(event) => onBlockChange(block.id, "cta", event.target.value)} />
                    </label>
                    <label className="text-xs font-bold text-slate-600">
                      Destination URL
                      <input className={fieldClass} value={block.url} onChange={(event) => onBlockChange(block.id, "url", event.target.value)} />
                    </label>
                  </>
                ) : null}

                {block.kind === "review" ? (
                  <label className="text-xs font-bold text-slate-600 md:col-span-2">
                    Star rating
                    <input type="range" min="1" max="5" step="1" className="mt-3 w-full accent-violet-600" value={block.rating ?? 5} onChange={(event) => onBlockChange(block.id, "rating", Number(event.target.value))} />
                    <span className="mt-2 block text-sm text-amber-500">{"★".repeat(block.rating ?? 5)}{"☆".repeat(5 - (block.rating ?? 5))}</span>
                  </label>
                ) : null}
              </div>

              <div className="mt-4 flex flex-col items-start gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <Toggle checked={block.visible} onChange={(value) => onBlockChange(block.id, "visible", value)} label={block.visible ? "Visible" : "Hidden"} />
                {block.kind === "product" || block.kind === "video" ? (
                  <Toggle checked={block.featured} onChange={(value) => onBlockChange(block.id, "featured", value)} label={block.featured ? "Featured first" : "Feature this"} />
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

function Appearance({ store, onProfileChange }: Pick<EditorPanelProps, "store" | "onProfileChange">) {
  return (
    <>
      <SectionHeading
        eyebrow="Filipino theme studio"
        title="Familiar enough to use. Original enough to claim."
        description="Every palette is inspired by a Filipino mood—not a generic template with a flag added later."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Object.values(themes).map((theme) => {
          const selected = store.profile.themeId === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onProfileChange("themeId", theme.id as ThemeId)}
              className={`overflow-hidden rounded-[24px] border-2 text-left transition ${selected ? "border-slate-950 shadow-xl shadow-slate-950/10" : "border-transparent bg-slate-100 hover:border-slate-300"}`}
            >
              <div className="h-32 p-3" style={{ background: `radial-gradient(circle at 80% 0%, ${theme.accent}66, transparent 45%), ${theme.background}` }}>
                <div className="h-5 w-14 rounded-full" style={{ background: theme.primary }} />
                <div className="mt-3 h-16 rounded-2xl border border-white/30" style={{ background: theme.surface }}>
                  <div className="mx-3 mt-3 h-2 w-2/3 rounded-full" style={{ background: theme.text, opacity: 0.7 }} />
                  <div className="mx-3 mt-2 h-5 rounded-full" style={{ background: theme.primary }} />
                </div>
              </div>
              <div className="bg-white p-4">
                <p className="text-sm font-black text-slate-950">{theme.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{theme.description}</p>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-7 grid gap-3 lg:grid-cols-3">
        <div className="rounded-[24px] bg-slate-950 p-5 text-white lg:col-span-2">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-300">Design principle</p>
          <p className="mt-2 text-lg font-bold">BayanLink provides the system. The merchant owns the personality.</p>
          <p className="mt-2 text-sm leading-6 text-white/60">Large visual stories, clear peso prices, familiar messaging, strong trust, and one obvious action at a time.</p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Coming next</p>
          <p className="mt-2 text-sm font-black text-slate-900">Custom fonts, textures, stickers, animation, and AI-generated cover art.</p>
        </div>
      </div>
    </>
  );
}

function Settings({ store, onProfileChange, onReset }: Pick<EditorPanelProps, "store" | "onProfileChange" | "onReset">) {
  const { profile } = store;
  return (
    <>
      <SectionHeading
        eyebrow="Business setup"
        title="Connect the channels customers already trust"
        description="BayanLink brings messaging, local payments, trust, and a little personality into one shareable page."
      />
      <div className="grid gap-5 md:grid-cols-2">
        <label className={labelClass}>
          Messenger link
          <input className={fieldClass} value={profile.messengerUrl} onChange={(event) => onProfileChange("messengerUrl", event.target.value)} />
        </label>
        <label className={labelClass}>
          WhatsApp link
          <input className={fieldClass} value={profile.whatsappUrl} onChange={(event) => onProfileChange("whatsappUrl", event.target.value)} />
        </label>
      </div>

      <div className="mt-6">
        <p className="text-sm font-bold text-slate-800">Payment methods shown to customers</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["GCash", "Maya", "QR Ph", "COD", "Bank transfer"].map((method) => {
            const enabled = profile.payments.includes(method);
            return (
              <button
                key={method}
                type="button"
                onClick={() => onProfileChange("payments", enabled ? profile.payments.filter((item) => item !== method) : [...profile.payments, method])}
                className={`min-h-11 rounded-full border px-4 py-2 text-xs font-bold transition ${enabled ? "border-violet-700 bg-violet-700 text-white" : "border-slate-200 bg-white text-slate-600"}`}
              >
                {enabled ? "✓ " : "+ "}
                {method}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-amber-200 bg-amber-50 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-amber-950">Barya “ting!” interaction sound</p>
            <p className="mt-1 text-xs leading-5 text-amber-800/70">A soft sound plays when a customer taps an offer. It only runs after a real tap and can always be turned off.</p>
          </div>
          <Toggle checked={profile.soundEnabled} onChange={(value) => onProfileChange("soundEnabled", value)} label={profile.soundEnabled ? "Sound on" : "Sound off"} />
        </div>
      </div>

      <div className="mt-8 rounded-[24px] border border-rose-200 bg-rose-50 p-5">
        <p className="text-sm font-black text-rose-900">Reset this prototype</p>
        <p className="mt-1 text-xs leading-5 text-rose-700">This clears browser changes and restores the BayanLink demo merchant.</p>
        <button type="button" onClick={onReset} className="mt-4 w-full rounded-full bg-rose-700 px-4 py-3 text-xs font-bold text-white sm:w-auto sm:py-2.5">
          Restore demo data
        </button>
      </div>
    </>
  );
}

export function EditorPanel(props: EditorPanelProps) {
  return (
    <section className="min-w-0 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[28px] sm:p-6 lg:p-7">
      {props.active === "ai" ? <AiStudio store={props.store} onApplyMagicDraft={props.onApplyMagicDraft} /> : null}
      {props.active === "page" ? <MyPage store={props.store} onProfileChange={props.onProfileChange} /> : null}
      {props.active === "blocks" ? (
        <Blocks
          store={props.store}
          onBlockChange={props.onBlockChange}
          onAddBlock={props.onAddBlock}
          onRemoveBlock={props.onRemoveBlock}
          onMoveBlock={props.onMoveBlock}
        />
      ) : null}
      {props.active === "appearance" ? <Appearance store={props.store} onProfileChange={props.onProfileChange} /> : null}
      {props.active === "settings" ? <Settings store={props.store} onProfileChange={props.onProfileChange} onReset={props.onReset} /> : null}
    </section>
  );
}
