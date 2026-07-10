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

type WorkspaceView = "edit" | "preview";

export function BayanLinkDashboard() {
  const [active, setActive] = useState<EditorSection>("blocks");
  const [workspaceView, setWorkspaceView] = useState<WorkspaceView>("edit");
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

  function selectSection(section: EditorSection) {
    setActive(section);
    setWorkspaceView("edit");
  }

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
    <main className="min-h-screen overflow-x-hidden bg-[#f5f6f3] pb-24 text-slate-950 md:pb-0">
      <Sidebar active={active} onChange={selectSection} username={store.profile.username} onCopy={copyLink} copyLabel={copyLabel} />

      <div className="xl:pl-[230px]">
        <div className="min-w-0 p-3 sm:p-5 lg:p-6 xl:p-7">
          <div className="mx-auto mb-4 grid w-full max-w-[1500px] grid-cols-2 rounded-2xl bg-slate-200/75 p-1 xl:hidden">
            <button
              type="button"
              onClick={() => setWorkspaceView("edit")}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                workspaceView === "edit" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
              }`}
            >
              Edit storefront
            </button>
            <button
              type="button"
              onClick={() => setWorkspaceView("preview")}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                workspaceView === "preview" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
              }`}
            >
              Live preview
            </button>
          </div>

          <div className="mx-auto grid w-full max-w-[1500px] gap-5 xl:grid-cols-[minmax(560px,1fr)_390px]">
            <div className={workspaceView === "edit" ? "block" : "hidden xl:block"}>
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
            </div>

            <aside className={`${workspaceView === "preview" ? "block" : "hidden"} min-w-0 xl:sticky xl:top-7 xl:block xl:self-start`}>
              <div className="mb-3 flex items-center justify-between gap-3 px-1">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Customer view</p>
                  <p className="mt-0.5 truncate text-sm font-bold text-slate-800">bayanlink.ph/{store.profile.username || "my-store"}</p>
                </div>
                <a href={publicPath} target="_blank" rel="noreferrer" className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">Open page ↗</a>
              </div>

              <div className="phone-frame mx-auto w-full max-w-[430px] overflow-hidden rounded-[30px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:rounded-[46px] sm:border-[10px] sm:border-slate-950 sm:bg-slate-950 sm:p-1 xl:max-w-[390px]">
                <div className="overflow-visible rounded-[30px] bg-white sm:max-h-[790px] sm:overflow-y-auto sm:overflow-x-hidden sm:rounded-[33px]">
                  <div className="sticky top-0 z-10 mx-auto -mb-7 mt-2 hidden h-6 w-28 rounded-full bg-slate-950 sm:block" />
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
