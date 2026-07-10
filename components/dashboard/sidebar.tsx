"use client";

import type { EditorSection } from "@/types/bayanlink";

type SidebarProps = {
  active: EditorSection;
  onChange: (section: EditorSection) => void;
  username: string;
  onCopy: () => void;
  copyLabel: string;
};

const items: Array<{ id: EditorSection; label: string; icon: string; caption: string }> = [
  { id: "page", label: "My Page", icon: "⌂", caption: "Profile and contact" },
  { id: "blocks", label: "Links & Offers", icon: "＋", caption: "What customers see" },
  { id: "appearance", label: "Appearance", icon: "◐", caption: "Make it yours" },
  { id: "settings", label: "Settings", icon: "⚙", caption: "Address and payments" },
];

export function Sidebar({ active, onChange, username, onCopy, copyLabel }: SidebarProps) {
  return (
    <aside className="border-b border-slate-200 bg-white lg:min-h-screen lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col lg:sticky lg:top-0 lg:h-screen">
        <div className="flex items-center justify-between px-4 py-4 lg:block lg:px-5 lg:py-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-lg font-black text-white">B</div>
            <div>
              <p className="text-lg font-black tracking-[-0.03em] text-slate-950">BayanLink</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">Made for Pinoy business</p>
            </div>
          </div>
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-800 lg:mt-5 lg:inline-flex">Prototype</span>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-1 lg:overflow-visible lg:px-3 lg:pb-0" aria-label="Dashboard">
          {items.map((item) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(item.id)}
                className={`flex shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition lg:w-full lg:px-4 lg:py-3 ${
                  selected ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                <span className={`grid h-8 w-8 place-items-center rounded-xl text-base ${selected ? "bg-white/10" : "bg-slate-100"}`}>{item.icon}</span>
                <span>
                  <span className="block text-sm font-bold">{item.label}</span>
                  <span className={`hidden text-[10px] lg:block ${selected ? "text-white/55" : "text-slate-400"}`}>{item.caption}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto hidden p-4 lg:block">
          <div className="rounded-[22px] bg-emerald-50 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700">Your BayanLink</p>
            <p className="mt-2 truncate text-sm font-bold text-slate-900">bayanlink.ph/{username}</p>
            <button onClick={onCopy} className="mt-3 w-full rounded-full bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white">
              {copyLabel}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
