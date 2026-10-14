export function questionHref(slug: string, id: string) {
  return `/mazo/${encodeURIComponent(slug)}?q=${encodeURIComponent(id)}`;
}
export async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  try {
    textarea.select();
    if (!document.execCommand("copy")) throw new Error("No se pudo copiar.");
  } finally {
    textarea.remove();
  }
}
export async function shareCard(
  title: string,
  text: string,
  path: string | null,
): Promise<string> {
  const url = path ? new URL(path, window.location.origin).href : undefined;
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return "Carta compartida";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError")
        return "";
      throw error;
    }
  }
  await copyText(url ? `${text}\n${url}` : text);
  return url ? "Pregunta y enlace copiados" : "Pregunta copiada para compartir";
}
