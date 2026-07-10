import type { BayanTheme, StorefrontConfig, ThemeId } from "@/types/bayanlink";

export const themes: Record<ThemeId, BayanTheme> = {
  island: {
    id: "island",
    label: "Island Market",
    description: "Fresh greens and warm sand",
    background: "#eef8f2",
    surface: "#ffffff",
    text: "#153c2d",
    muted: "#61746c",
    primary: "#087f5b",
    accent: "#f2b84b",
    buttonText: "#ffffff",
  },
  fiesta: {
    id: "fiesta",
    label: "Fiesta Pop",
    description: "Bright, playful and social",
    background: "#fff4f5",
    surface: "#ffffff",
    text: "#4f1848",
    muted: "#806477",
    primary: "#e33667",
    accent: "#ffb02e",
    buttonText: "#ffffff",
  },
  midnight: {
    id: "midnight",
    label: "Manila After Dark",
    description: "Premium charcoal and electric lime",
    background: "#111318",
    surface: "#1d2027",
    text: "#f7f7f2",
    muted: "#a8adb8",
    primary: "#d5f45c",
    accent: "#7dd3fc",
    buttonText: "#172016",
  },
};

export const defaultStore: StorefrontConfig = {
  profile: {
    businessName: "Palawan Pantry Co.",
    username: "palawan-pantry",
    bio: "Fresh island flavors, local finds, and unforgettable Palawan experiences.",
    location: "San Vicente, Palawan",
    avatarUrl:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=400&q=80",
    verified: true,
    themeId: "island",
    messengerUrl: "https://m.me/",
    whatsappUrl: "https://wa.me/",
    payments: ["GCash", "Maya", "QR Ph", "COD"],
  },
  blocks: [
    {
      id: "stay",
      kind: "product",
      title: "Beachfront Cottage Stay",
      subtitle: "2 nights · breakfast included",
      price: 4500,
      cta: "Book now",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
      url: "#",
      badge: "Best seller",
      visible: true,
      featured: true,
    },
    {
      id: "tour",
      kind: "product",
      title: "Island Hopping Adventure",
      subtitle: "Full-day tour · lunch included",
      price: 1850,
      cta: "Reserve",
      image:
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=80",
      url: "#",
      badge: "Popular",
      visible: true,
      featured: false,
    },
    {
      id: "bag",
      kind: "product",
      title: "Handwoven Abaca Bag",
      subtitle: "Made by a local Palawan artisan",
      price: 650,
      cta: "Order",
      image:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
      url: "#",
      visible: true,
      featured: false,
    },
    {
      id: "facebook",
      kind: "link",
      title: "See what is new on Facebook",
      subtitle: "Promos, arrivals, and island stories",
      cta: "Visit page",
      image: "",
      url: "https://facebook.com/",
      visible: true,
      featured: false,
    },
  ],
};

export const STORE_STORAGE_KEY = "bayanlink:merchant-demo";
