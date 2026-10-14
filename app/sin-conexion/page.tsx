import type { Metadata } from "next";
import { OfflineClient } from "@/components/OfflineClient";
import { decks } from "@/data/decks";
export const metadata: Metadata = {
  title: "Mazos sin conexión",
  robots: { index: false, follow: false },
  alternates: { canonical: "/sin-conexion" },
};
export default function OfflinePage() {
  return (
    <main>
      <OfflineClient decks={decks} />
    </main>
  );
}
