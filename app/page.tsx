"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  title: string;
  subtitle: string;
  price: number;
};

const themes = {
  tropical: {
    label: "Tropical Eco",
    primary: "#0f8a63",
    background: "#eaf8f1",
    text: "#123c2f",
  },
  pastel: {
    label: "Pasay Pastel",
    primary: "#e11d48",
    background: "#fff1f2",
    text: "#4c1d95",
  },
  dark: {
    label: "Manila Dark",
    primary: "#334155",
    background: "#0f172a",
    text: "#f8fafc",
  },
};

export default function Home() {
  const [businessName, setBusinessName] = useState("Palawan Pantry Co.");
  const [bio, setBio] = useState(
    "Fresh island flavors and handcrafted goods from San Vicente."
  );
  const [location, setLocation] = useState("San Vicente, Palawan");
  const [themeKey, setThemeKey] = useState<keyof typeof themes>("tropical");
  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: "Beachfront Cottage Stay", subtitle: "2 nights", price: 4500 },
    { id: 2, title: "Island Hopping Adventure", subtitle: "Full-day tour", price: 1850 },
    { id: 3, title: "Handwoven Abaca Bag", subtitle: "Local artisan", price: 650 },
  ]);

  const theme = themes[themeKey];
  const total = useMemo(
    () => products.reduce((sum, product) => sum + product.price, 0),
    [products]
  );

  function updateProduct(id: number, field: keyof Product, value: string) {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? {
              ...product,
              [field]: field === "price" ? Number(value) || 0 : value,
            }
          : product
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-4 text-slate-900 md:p-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_420px]">
        <section className="rounded-[28px] bg-white p-5 shadow-2xl md:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Merchant workspace
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">BayanLink</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Build a Philippine-first link-in-bio storefront with local payment,
                messaging, and ordering options.
              </p>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
              Prototype
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium">
              Business name
              <input
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </label>
            <label className="text-sm font-medium">
              Location
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </label>
          </div>

          <label className="mt-5 block text-sm font-medium">
            Business bio
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={3}
              className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </label>

          <div className="mt-6">
            <p className="text-sm font-medium">Theme</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {Object.entries(themes).map(([key, option]) => (
                <button
                  key={key}
                  onClick={() => setThemeKey(key as keyof typeof themes)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    themeKey === key
                      ? "border-slate-950 ring-2 ring-slate-950/10"
                      : "border-slate-200"
                  }`}
                >
                  <span
                    className="mb-3 block h-7 rounded-full"
                    style={{ background: option.primary }}
                  />
                  <span className="text-sm font-semibold">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Products and offers</p>
              <p className="mt-1 text-xs text-slate-500">
                Demo catalog value: ₱{total.toLocaleString("en-PH")}
              </p>
            </div>
            <button
              onClick={() =>
                setProducts((current) => [
                  ...current,
                  {
                    id: Date.now(),
                    title: "New offer",
                    subtitle: "Add details",
                    price: 0,
                  },
                ])
              }
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white"
            >
              Add product
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {products.map((product) => (
              <div key={product.id} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1fr_1fr_130px_auto]">
                <input
                  value={product.title}
                  onChange={(event) => updateProduct(product.id, "title", event.target.value)}
                  className="rounded-xl bg-slate-50 px-3 py-2 text-sm outline-none"
                />
                <input
                  value={product.subtitle}
                  onChange={(event) => updateProduct(product.id, "subtitle", event.target.value)}
                  className="rounded-xl bg-slate-50 px-3 py-2 text-sm outline-none"
                />
                <input
                  type="number"
                  value={product.price}
                  onChange={(event) => updateProduct(product.id, "price", event.target.value)}
                  className="rounded-xl bg-slate-50 px-3 py-2 text-sm outline-none"
                />
                <button
                  onClick={() => setProducts((current) => current.filter((item) => item.id !== product.id))}
                  className="rounded-xl px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="phone-frame mx-auto w-full max-w-[380px] rounded-[42px] border-[10px] border-black bg-black p-1">
            <div
              className="phone-content min-h-[720px] overflow-hidden rounded-[30px] p-5"
              style={{ background: theme.background, color: theme.text }}
            >
              <div className="mx-auto mb-6 h-6 w-28 rounded-full bg-black" />
              <div className="text-center">
                <div
                  className="mx-auto grid h-20 w-20 place-items-center rounded-full text-3xl font-semibold text-white"
                  style={{ background: theme.primary }}
                >
                  {businessName.slice(0, 1).toUpperCase() || "B"}
                </div>
                <h2 className="mt-4 text-2xl font-semibold">{businessName}</h2>
                <p className="mt-1 text-xs opacity-70">{location}</p>
                <p className="mx-auto mt-3 max-w-[280px] text-sm leading-5 opacity-80">{bio}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="rounded-2xl bg-[#0084ff] px-4 py-3 text-sm font-semibold text-white">
                  Messenger
                </button>
                <button className="rounded-2xl bg-[#25d366] px-4 py-3 text-sm font-semibold text-white">
                  WhatsApp
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {products.map((product) => (
                  <article key={product.id} className="rounded-3xl bg-white p-4 text-slate-900 shadow-sm">
                    <p className="text-xs uppercase tracking-wider text-slate-400">Featured offer</p>
                    <h3 className="mt-1 font-semibold">{product.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">{product.subtitle}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <strong>₱{product.price.toLocaleString("en-PH")}</strong>
                      <button
                        className="rounded-full px-4 py-2 text-xs font-semibold text-white"
                        style={{ background: theme.primary }}
                      >
                        Order now
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-white/70 p-4 text-slate-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Payment options</p>
                <p className="mt-2 text-sm">GCash · Maya · QR Ph · COD</p>
              </div>

              <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] opacity-50">
                Powered by BayanLink
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
