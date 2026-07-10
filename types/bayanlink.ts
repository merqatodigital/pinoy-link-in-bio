export type ThemeId = "ube" | "jeepney" | "boracay" | "barong";

export type EditorSection = "ai" | "page" | "blocks" | "appearance" | "settings";

export type MagicPreset = "creator" | "food" | "beauty" | "stay" | "shop";

export type BlockKind = "product" | "link" | "video" | "review";

export type StoreBlock = {
  id: string;
  kind: BlockKind;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  url: string;
  price?: number;
  badge?: string;
  rating?: number;
  visible: boolean;
  featured: boolean;
};

export type StoreProfile = {
  businessName: string;
  username: string;
  bio: string;
  location: string;
  avatarUrl: string;
  coverUrl: string;
  verified: boolean;
  trustEnabled: boolean;
  sukiScore: number;
  reviewCount: number;
  soundEnabled: boolean;
  themeId: ThemeId;
  messengerUrl: string;
  whatsappUrl: string;
  payments: string[];
};

export type StorefrontConfig = {
  profile: StoreProfile;
  blocks: StoreBlock[];
};

export type BayanTheme = {
  id: ThemeId;
  label: string;
  description: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  primary: string;
  accent: string;
  buttonText: string;
  heroOverlay: string;
};
