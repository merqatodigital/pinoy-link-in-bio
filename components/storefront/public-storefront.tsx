"use client";

import { useEffect, useState } from "react";
import { defaultStore, STORE_STORAGE_KEY } from "@/data/demo-store";
import type { StorefrontConfig } from "@/types/bayanlink";
import { Storefront } from "./storefront";

export function PublicStorefront({ username }: { username: string }) {
  const [store, setStore] = useState<StorefrontConfig>({
    ...defaultStore,
    profile: { ...defaultStore.profile, username },
  });

  useEffect(() => {
    const saved = window.localStorage.getItem(STORE_STORAGE_KEY);
    if (!saved) return;

    const timer = window.setTimeout(() => {
      try {
        const parsed = JSON.parse(saved) as StorefrontConfig;
        if (parsed.profile.username === username) setStore(parsed);
      } catch {
        // Public demo remains available if local storage is invalid.
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [username]);

  return <Storefront store={store} />;
}
