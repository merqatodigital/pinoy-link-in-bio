export type ThemeId = "island" | "fiesta" | "midnight";

export type EditorSection = "page" | "blocks" | "appearance" | "settings";

export type BlockKind = "product" | "link";

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
  visible: boolean;
  featured: boolean;
};

export type StoreProfile = {
  businessName: string;
  username: string;
  bio: string;
  location: string;
  avatarUrl: string;
  verified: boolean;
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
};
