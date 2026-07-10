"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultStore, STORE_STORAGE_KEY } from "@/data/demo-store";
import type { EditorSection, StoreBlock, StoreProfile, StorefrontConfig } from "@/types/bayanlink";
import { Sidebar } from "./sidebar";
import { EditorPanel } from "./editor-panel";
import { Storefront } from "@/components/storefront/storefront";

function cloneDefaultStore(): StorefrontConfig {
  return JSON.parse(JSON.stringify(defaultStore)) as StorefrontConfig;
}

export function BayanLinkDashboard() {
  const [active, setActive] = useState<EditorSection>("blocks");
  const [store, setStore] = useState<StorefrontConfig>(cloneDefaultStore);
  const [hydrated, setHydrated] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy my link");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORE_STORAGE_KEY);
    const timer = window.setTimeout(() => {
      if (saved) {
        try {
          setStore(JSON.parse(saved) as StorefrontConfig);
        } catch {
          // Keep the safe demo data when browser storage is invalid.
        }
      }
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORE_STORAGE_KEY, JSON.stringify(store));
  }, [hydrated, store]);

  const publicPath = useMemo(() => `/${store.profile.username || "my-store"}`, [store.profile.username]);

  function updateProfile<K extends keyof StoreProfile>(key: K, value: StoreProfile[K]) {
    setStore((current) => ({ ...current, profile: { ...current.profile, [key]: value } }));
  }

  function updateBlock<K extends keyof StoreBlock>(id: string, key: K, value: StoreBlock[K]) {
    setStore((current) => ({
      ...current,
      blocks: current.blocks.map((block) => (block.id === id ? { ...block, [key]: value } : block)),
    }));
  }

  function addBlock(kind: "product" | "link") {
    const id = `${kind}-${Date.now()}`;
    const block: StoreBlock =
      kind === "product"
        ? {
            id,
            kind,
            title: "New visual offer",
            subtitle: "Tell customers why they will love it",
            price: 0,
            cta: "Order now",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
            url: "#",
            badge: "New",
            visible: true,
            featured: false,
          }
        : {
            id,
            kind,
            title: "New link",
            subtitle: "Add a helpful description",
            cta: "Open",
            image: "",
            url: "#",
            visible: true,
            featured: false,
          };
    setStore((current) => ({ ...current, blocks: [...current.blocks, block] }));
  }

  function removeBlock(id: string) {
    setStore((current) => ({ ...current, blocks: current.blocks.filter((block) => block.id !== id) }));
  }

  function moveBlock(id: string, direction: -1 | 1) {
    setStore((current) => {
      const index = current.blocks.findIndex((block) => block.id === id);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.blocks.length) return current;
      const blocks = [...current.blocks];
      [blocks[index], blocks[nextIndex]] = [blocks[nextIndex], blocks[index]];
      return { ...current, blocks };
    });
  }

  function resetStore() {
    window.localStorage.removeItem(STORE_STORAGE_KEY);
    setStore(cloneDefaultStore());
  }

  async function copyLink() {
    const url = `${window.location.origin}${publicPath}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopyLabel("Copied!");
      window.setTimeout(() => setCopyLabel("Copy my link"), 1600);
    } catch {
      setCopyLabel("Open preview →");
      window.location.href = publicPath;
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f6f3] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[230px_minmax(0,1fr)]">
        <Sidebar active={active} onChange={setActive} username={store.profile.username} onCopy={copyLink} copyLabel={copyLabel} />

        <div className="min-w-0 p-3 sm:p-5 xl:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm lg:hidden">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-700">Live address</p>
              <p className="truncate text-sm font-bold">bayanlink.ph/{store.profile.username}</p>
            </div>
            <button onClick={copyLink} className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white">{copyLabel}</button>
          </div>

          <div className="mx-auto grid w-full max-w-[1500px] gap-5 xl:grid-cols-[minmax(560px,1fr)_390px]">
            <EditorPanel
              active={active}
              store={store}
              onProfileChange={updateProfile}
              onBlockChange={updateBlock}
              onAddBlock={addBlock}
              onRemoveBlock={removeBlock}
              onMoveBlock={moveBlock}
              onReset={resetStore}
            />

            <aside className="min-w-0 xl:sticky xl:top-7 xl:self-start">
              <div className="mb-3 flex items-center justify-between px-1">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Customer view</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-800">Live mobile preview</p>
                </div>
                <a href={publicPath} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">Open page ↗</a>
              </div>
              <div className="phone-frame mx-auto w-full max-w-[390px] rounded-[46px] border-[10px] border-slate-950 bg-slate-950 p-1 shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
                <div className="max-h-[790px] overflow-y-auto overflow-x-hidden rounded-[33px] bg-white">
                  <div className="sticky top-0 z-10 mx-auto -mb-7 mt-2 h-6 w-28 rounded-full bg-slate-950" />
                  <Storefront store={store} compact />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
