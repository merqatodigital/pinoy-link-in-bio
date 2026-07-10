import type { Metadata } from "next";
import { PublicStorefront } from "@/components/storefront/public-storefront";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `@${username} on BayanLink`,
    description: "Shop, book, and connect with a Filipino business on BayanLink.",
  };
}

export default async function MerchantPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return <PublicStorefront username={username} />;
}
