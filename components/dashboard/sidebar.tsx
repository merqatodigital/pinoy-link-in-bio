"use client";

import type { EditorSection } from "@/types/bayanlink";

type SidebarProps = {
  active: EditorSection;
  onChange: (section: EditorSection) => void;
  username: string;
  onCopy: () => void;
  copyLabel: string;
};

const items: Array<{ id: EditorSection; label: string; mobileLabel: string; icon: string; caption: string }> = [
  { id: "ai", label: "Bayan AI", mobileLabel: "AI", icon: "✦", caption: "Build a first draft" },
  { id: "page", label: "My Page", mobileLabel: "Page", icon: "⌂", caption: "Identity and trust" },
  { id: "blocks", label: "Content", mobileLabel: "Content", icon: "＋", caption: "Links, video, and offers" },
  { id: "appearance", label: "Appearance", mobileLabel: "Style", icon: "◐", caption: "Make it unmistakably yours" },
  { id: "settings", label: "Business Setup", mobileLabel: "Setup", icon: "⚙", caption: "Contact and payment" },
];

function Brand() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-950 text-lg font-black text-white">B</div>
      <div className="min-w-0">
        <p className="truncate text-lg font-black tracking-[-0.03em] text-slate-950">BayanLink</p>
        <p className="truncate text-[9px] font-bold uppercase tracking-[0.14em] text-violet-700 sm:text-[10px]">Sarili mong link</p>
      </div>
    </div>
  );
}

export function Sidebar({ active, onChange, username, onCopy, copyLabel }: SidebarProps) {
  const publicPath = `/${username || "my-store"}`;

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[236px] border-r border-slate-200 bg-white xl:block">
        <div className="flex h-full flex-col">
          <div className="px-5 py-6">
            <Brand />
            <span className="mt-5 inline-flex rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-bold text-violet-800">Creative prototype</span>
          </div>

          <nav className="space-y-1 px-3" aria-label="Dashboard">
            {items.map((item) => {
              const selected = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                    selected ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-xl text-base ${selected ? "bg-white/10" : "bg-slate-100"}`}>{item.icon}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold">{item.label}</span>
                    <span className={`block truncate text-[10px] ${selected ? "text-white/55" : "text-slate-400"}`}>{item.caption}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto p-4">
            <div className="rounded-[22px] bg-violet-50 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-violet-700">Your BayanLink</p>
              <p className="mt-2 truncate text-sm font-bold text-slate-900">bayanlink.ph/{username || "my-store"}</p>
              <button onClick={onCopy} className="mt-3 w-full rounded-full bg-violet-700 px-4 py-2.5 text-xs font-bold text-white">
                {copyLabel}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl xl:hidden">
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-5">
          <Brand />
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={onCopy}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-sm font-black text-slate-700 shadow-sm"
              aria-label={copyLabel}
              title={copyLabel}
            >
              ⧉
            </button>
            <a href={publicPath} target="_blank" rel="noreferrer" className="rounded-full bg-slate-950 px-4 py-2.5 text-xs font-bold text-white shadow-sm">
              View page
            </a>
          </div>
        </div>

        <nav className="hidden grid-cols-5 gap-1 border-t border-slate-100 px-3 py-2 md:grid" aria-label="Dashboard">
          {items.map((item) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(item.id)}
                className={`flex min-w-0 items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-xs font-bold transition ${
                  selected ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="truncate">{item.mobileLabel}</span>
              </button>
            );
          })}
        </nav>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-slate-200 bg-white/95 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_30px_rgba(15,23,42,0.10)] backdrop-blur-xl md:hidden"
        aria-label="Mobile dashboard"
      >
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-0.5 text-[9px] font-bold transition ${
                selected ? "bg-slate-950 text-white" : "text-slate-500"
              }`}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="max-w-full truncate">{item.mobileLabel}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
