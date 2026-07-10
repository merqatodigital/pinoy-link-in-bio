"use client";

import { themes } from "@/data/demo-store";
import type { EditorSection, StoreBlock, StoreProfile, StorefrontConfig, ThemeId } from "@/types/bayanlink";

type EditorPanelProps = {
  active: EditorSection;
  store: StorefrontConfig;
  onProfileChange: <K extends keyof StoreProfile>(key: K, value: StoreProfile[K]) => void;
  onBlockChange: <K extends keyof StoreBlock>(id: string, key: K, value: StoreBlock[K]) => void;
  onAddBlock: (kind: "product" | "link") => void;
  onRemoveBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: -1 | 1) => void;
  onReset: () => void;
};

const fieldClass = "mt-2 min-w-0 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";
const labelClass = "block text-sm font-bold text-slate-800";

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="mb-5 sm:mb-7">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">{eyebrow}</p>
      <h1 className="mt-2 text-xl font-black tracking-[-0.035em] text-slate-950 sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
    </header>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="inline-flex items-center gap-2 text-xs font-bold text-slate-600" aria-pressed={checked}>
      <span className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-emerald-600" : "bg-slate-300"}`}>
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${checked ? "left-6" : "left-1"}`} />
      </span>
      {label}
    </button>
  );
}

function MyPage({ store, onProfileChange }: Pick<EditorPanelProps, "store" | "onProfileChange">) {
  const { profile } = store;
  return (
    <>
      <SectionHeading eyebrow="Your identity" title="Make it feel unmistakably yours" description="Start with the details customers already look for before they message, order, or book." />
      <div className="grid gap-5 md:grid-cols-2">
        <label className={labelClass}>
          Business name
          <input className={fieldClass} value={profile.businessName} onChange={(event) => onProfileChange("businessName", event.target.value)} />
        </label>
        <label className={labelClass}>
          BayanLink username
          <div className="mt-2 flex overflow-hidden rounded-2xl border border-slate-200 bg-white focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
            <span className="grid place-items-center bg-slate-50 px-3 text-xs font-semibold text-slate-400">/</span>
            <input
              className="min-w-0 flex-1 px-3 py-3 text-sm outline-none"
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
      <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-slate-900">Verified business badge</p>
          <p className="mt-1 text-xs text-slate-500">Build trust beside your profile photo.</p>
        </div>
        <Toggle checked={profile.verified} onChange={(value) => onProfileChange("verified", value)} label={profile.verified ? "On" : "Off"} />
      </div>
    </>
  );
}

function Blocks({ store, onBlockChange, onAddBlock, onRemoveBlock, onMoveBlock }: Pick<EditorPanelProps, "store" | "onBlockChange" | "onAddBlock" | "onRemoveBlock" | "onMoveBlock">) {
  return (
    <>
      <SectionHeading eyebrow="Your storefront" title="Lead with what looks irresistible" description="Add visual offers and familiar links. Put the item you most want to sell at the top." />
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => onAddBlock("product")} className="min-h-12 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/10">＋ Add product or service</button>
        <button type="button" onClick={() => onAddBlock("link")} className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50">＋ Add simple link</button>
      </div>
      <div className="space-y-4">
        {store.blocks.map((block, index) => (
          <article key={block.id} className={`rounded-[22px] border bg-white p-3 shadow-sm transition sm:rounded-[24px] sm:p-4 ${block.visible ? "border-slate-200" : "border-dashed border-slate-300 opacity-65"}`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-lg">{block.kind === "product" ? "🛍️" : "🔗"}</div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-slate-950">{block.title || "Untitled block"}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{block.kind === "product" ? "Visual offer" : "Link button"}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 self-end sm:self-auto">
                <button type="button" disabled={index === 0} onClick={() => onMoveBlock(block.id, -1)} className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-xs disabled:opacity-30" aria-label="Move up">↑</button>
                <button type="button" disabled={index === store.blocks.length - 1} onClick={() => onMoveBlock(block.id, 1)} className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-xs disabled:opacity-30" aria-label="Move down">↓</button>
                <button type="button" onClick={() => onRemoveBlock(block.id)} className="grid h-8 w-8 place-items-center rounded-lg text-xs text-rose-600 hover:bg-rose-50" aria-label="Delete">×</button>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="text-xs font-bold text-slate-600">
                Title
                <input className={fieldClass} value={block.title} onChange={(event) => onBlockChange(block.id, "title", event.target.value)} />
              </label>
              <label className="text-xs font-bold text-slate-600">
                Supporting text
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
                </>
              ) : null}
              <label className="text-xs font-bold text-slate-600">
                Button label
                <input className={fieldClass} value={block.cta} onChange={(event) => onBlockChange(block.id, "cta", event.target.value)} />
              </label>
              <label className="text-xs font-bold text-slate-600">
                Destination
                <input className={fieldClass} value={block.url} onChange={(event) => onBlockChange(block.id, "url", event.target.value)} />
              </label>
            </div>

            <div className="mt-4 flex flex-col items-start gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <Toggle checked={block.visible} onChange={(value) => onBlockChange(block.id, "visible", value)} label={block.visible ? "Visible" : "Hidden"} />
              {block.kind === "product" ? (
                <Toggle checked={block.featured} onChange={(value) => onBlockChange(block.id, "featured", value)} label={block.featured ? "Featured first" : "Feature this"} />
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Appearance({ store, onProfileChange }: Pick<EditorPanelProps, "store" | "onProfileChange">) {
  return (
    <>
      <SectionHeading eyebrow="Own the look" title="Familiar to use, impossible to mistake" description="Choose a visual direction made for colorful, mobile-first Filipino storefronts." />
      <div className="grid gap-4 md:grid-cols-3">
        {Object.values(themes).map((theme) => {
          const selected = store.profile.themeId === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onProfileChange("themeId", theme.id as ThemeId)}
              className={`overflow-hidden rounded-[24px] border-2 text-left transition ${selected ? "border-slate-950 shadow-xl shadow-slate-950/10" : "border-transparent bg-slate-100 hover:border-slate-300"}`}
            >
              <div className="h-28 p-3" style={{ background: theme.background }}>
                <div className="h-5 w-14 rounded-full" style={{ background: theme.primary }} />
                <div className="mt-3 h-12 rounded-xl" style={{ background: theme.surface }} />
              </div>
              <div className="bg-white p-4">
                <p className="text-sm font-black text-slate-950">{theme.label}</p>
                <p className="mt-1 text-xs text-slate-500">{theme.description}</p>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-7 rounded-[24px] bg-slate-950 p-5 text-white">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">Design principle</p>
        <p className="mt-2 text-lg font-bold">Your products get the attention. BayanLink stays out of the way.</p>
        <p className="mt-2 text-sm leading-6 text-white/60">Large photos, clear peso prices, familiar message buttons, and one obvious next action.</p>
      </div>
    </>
  );
}

function Settings({ store, onProfileChange, onReset }: Pick<EditorPanelProps, "store" | "onProfileChange" | "onReset">) {
  const { profile } = store;
  return (
    <>
      <SectionHeading eyebrow="Business setup" title="Connect the channels customers already trust" description="BayanLink brings your messaging and Philippine payment options into one shareable page." />
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
                className={`rounded-full border px-4 py-2 text-xs font-bold transition ${enabled ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-200 bg-white text-slate-600"}`}
              >
                {enabled ? "✓ " : "+ "}{method}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-8 rounded-[24px] border border-rose-200 bg-rose-50 p-5">
        <p className="text-sm font-black text-rose-900">Reset this prototype</p>
        <p className="mt-1 text-xs leading-5 text-rose-700">This clears browser changes and restores the demo merchant.</p>
        <button type="button" onClick={onReset} className="mt-4 w-full rounded-full bg-rose-700 px-4 py-3 text-xs font-bold text-white sm:w-auto sm:py-2.5">Restore demo data</button>
      </div>
    </>
  );
}

export function EditorPanel(props: EditorPanelProps) {
  return (
    <section className="min-w-0 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[28px] sm:p-6 lg:p-7">
      {props.active === "page" ? <MyPage store={props.store} onProfileChange={props.onProfileChange} /> : null}
      {props.active === "blocks" ? <Blocks store={props.store} onBlockChange={props.onBlockChange} onAddBlock={props.onAddBlock} onRemoveBlock={props.onRemoveBlock} onMoveBlock={props.onMoveBlock} /> : null}
      {props.active === "appearance" ? <Appearance store={props.store} onProfileChange={props.onProfileChange} /> : null}
      {props.active === "settings" ? <Settings store={props.store} onProfileChange={props.onProfileChange} onReset={props.onReset} /> : null}
    </section>
  );
}
