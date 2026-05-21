import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PageShell } from "@/components/PageShell";
import { absoluteUrl } from "@/lib/utils";
import { JsonLd } from "@/lib/JsonLd";
import { defaultOgImage, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  applicationName: "Pregunton",
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: "Pregunton: preguntas para conversar",
    template: "%s | Pregunton"
  },
  description: "Mazos de preguntas para charlar, viajar, romper el hielo y pasar el rato sin que parezca un quiz.",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    title: "Pregunton: una excusa para conversar",
    description: "Elige un mazo, saca una pregunta y escucha algo nuevo.",
    url: "/",
    siteName: "Pregunton",
    locale: "es",
    type: "website",
    images: [defaultOgImage]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pregunton: una excusa para conversar",
    description: "Elige un mazo, saca una pregunta y escucha algo nuevo.",
    images: [defaultOgImage.url]
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
