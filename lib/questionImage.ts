import type { Question } from "@/data/decks";
import { getDeckTheme } from "@/lib/deckTheme";

export type QuestionImage = {
  question: Pick<Question, "id" | "text" | "deckId">;
  deckTitle: string;
};

function wrapText(context: CanvasRenderingContext2D, text: string, width: number) {
  const lines: string[] = [];
  let line = "";

  for (const word of text.trim().split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width <= width) {
      line = candidate;
      continue;
    }
    if (line) lines.push(line);
    line = "";
    // Also handle a long unbroken word without clipping it.
    for (const character of word) {
      if (line && context.measureText(line + character).width > width) {
        lines.push(line);
        line = "";
      }
      line += character;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function roundedRectangle(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

export async function createQuestionImage({ question, deckTitle }: QuestionImage): Promise<Blob> {
  const style = getComputedStyle(document.body);
  const editorial = style.getPropertyValue("--font-editorial").trim() || "Georgia, serif";
  const sans = style.getPropertyValue("--font-interface").trim() || "system-ui, sans-serif";
  const ink = style.getPropertyValue("--paper-ink").trim() || "#282219";
  const theme = getDeckTheme(question.deckId);

  // Canvas does not automatically wait for web fonts to finish loading.
  await Promise.all([
    document.fonts.load(`600 72px ${editorial}`, question.text),
    document.fonts.load(`700 30px ${sans}`, deckTitle)
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("No se pudo crear la imagen");

  let size = 76;
  const quote = `“${question.text}”`;
  context.font = `600 ${size}px ${editorial}`;
  let lines = wrapText(context, quote, 800);
  while (size > 32 && lines.length * size * 1.16 > 740) {
    size -= 2;
    context.font = `600 ${size}px ${editorial}`;
    lines = wrapText(context, quote, 800);
  }
  // Future unusually long prompts can grow vertically instead of being truncated.
  const textHeight = lines.length * size * 1.16;
  canvas.height = Math.max(1350, Math.ceil(textHeight + 610));
  const height = canvas.height;

  context.fillStyle = style.getPropertyValue("--paper-warm").trim() || "#f6efe4";
  context.fillRect(0, 0, canvas.width, height);

  roundedRectangle(context, 78, 98, 924, height - 176, 52);
  context.fillStyle = theme.paperColor;
  context.fill();

  context.save();
  context.shadowColor = "rgba(74, 57, 35, 0.13)";
  context.shadowBlur = 44;
  context.shadowOffsetY = 20;
  roundedRectangle(context, 60, 60, 960, height - 160, 52);
  context.fillStyle = style.getPropertyValue("--paper-note").trim() || "#fff8e8";
  context.fill();
  context.restore();
  context.strokeStyle = `${theme.accentColor}33`;
  context.lineWidth = 2;
  context.stroke();

  // A restrained paper texture, kept separate from the question itself.
  context.fillStyle = "rgba(77, 62, 42, 0.035)";
  for (let y = 86; y < height - 125; y += 24) {
    for (let x = 85; x < 995; x += 26) {
      context.fillRect(x + (y % 5), y, 1, 1);
    }
  }

  let titleSize = 30;
  context.font = `700 ${titleSize}px ${sans}`;
  while (context.measureText(deckTitle).width > 800 && titleSize > 16) {
    titleSize -= 1;
    context.font = `700 ${titleSize}px ${sans}`;
  }
  context.fillStyle = theme.accentInk;
  context.textBaseline = "top";
  context.textAlign = "left";
  context.fillText(deckTitle, 140, 142);
  context.fillStyle = theme.accentColor;
  context.fillRect(140, 204, 56, 4);

  context.font = `600 ${size}px ${editorial}`;
  context.fillStyle = ink;
  context.textAlign = "center";
  const top = 290 + (height - 610 - textHeight) / 2;
  lines.forEach((line, index) => context.fillText(line, 540, top + index * size * 1.16));

  context.beginPath();
  context.setLineDash([7, 8]);
  context.moveTo(140, height - 315);
  context.lineTo(940, height - 315);
  context.strokeStyle = "rgba(77, 62, 42, 0.18)";
  context.stroke();
  context.setLineDash([]);

  context.textAlign = "left";
  context.fillStyle = ink;
  context.font = `600 38px ${editorial}`;
  context.fillText("Pregunton", 140, height - 270);
  context.font = `500 24px ${sans}`;
  context.fillStyle = "#746a5a";
  context.fillText("Una pregunta basta.", 140, height - 217);
  context.textAlign = "right";
  context.font = `700 24px ${sans}`;
  context.fillStyle = theme.accentInk;
  context.fillText("pregunton.app", 940, height - 254);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("No se pudo exportar la imagen"));
    }, "image/png");
  });
}

export async function downloadQuestionImage(card: QuestionImage) {
  const blob = await createQuestionImage(card);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `pregunton-${card.question.id.replace(/[^a-z0-9_-]/gi, "-")}.png`;
  document.body.appendChild(link);
  try {
    link.click();
  } finally {
    link.remove();
    // Give mobile browsers time to consume the file before releasing its URL.
    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
  }
}
