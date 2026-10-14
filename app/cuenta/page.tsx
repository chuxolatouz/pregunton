import type { Metadata } from "next";
import { AccountClient } from "@/components/AccountClient";
export const metadata: Metadata = {
  title: "Mi cuenta",
  robots: { index: false, follow: false },
  alternates: { canonical: "/cuenta" },
};
export default function AccountPage() {
  return (
    <main>
      <AccountClient />
    </main>
  );
}
