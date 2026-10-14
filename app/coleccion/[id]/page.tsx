import type { Metadata } from "next";
import { CollectionClient } from "@/components/CollectionClient";
import { decks } from "@/data/decks";
export const metadata: Metadata = {
  title: "Mi colección",
  robots: { index: false, follow: false },
};
export default async function CollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CollectionClient key={id} id={id} decks={decks} />;
}
