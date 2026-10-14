import { ImageResponse } from "next/og";
import { getDeckBySlug } from "@/data/decks";
export const alt = "Mazo de preguntas de Pregunton";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deck = getDeckBySlug(slug);
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 70,
        width: "100%",
        height: "100%",
        background: "#f6efe4",
        color: "#282219",
      }}
    >
      <div style={{ fontSize: 28, color: "#803019" }}>
        Pregunton · Cartas para conversar
      </div>
      <div style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 700 }}>
        {deck?.title ?? "Una pregunta basta"}
      </div>
      <div
        style={{ fontSize: 30, paddingTop: 30, borderTop: "1px solid #ccbfa8" }}
      >
        {deck?.questions[0].text ??
          "Saca una carta y empieza una conversación."}
      </div>
    </div>,
    { ...size },
  );
}
