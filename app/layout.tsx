import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PageShell } from "@/components/PageShell";
import { absoluteUrl } from "@/lib/utils";
import { JsonLd } from "@/lib/JsonLd";
import { websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: "Pregunton: preguntas para conversar",
    template: "%s | Pregunton"
  },
  description: "Mazos de preguntas para charlar, viajar, romper el hielo y pasar el rato sin que parezca un quiz.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Pregunton: una excusa para conversar",
    description: "Elige un mazo, saca una pregunta y escucha algo nuevo.",
    url: "/",
    siteName: "Pregunton",
    locale: "es",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfbf8"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <JsonLd data={websiteJsonLd()} />
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
