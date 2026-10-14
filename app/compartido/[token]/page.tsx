import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { QuestionDeckClient } from "@/components/QuestionDeckClient";
import type { Deck } from "@/data/decks";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Colección compartida",
  robots: { index: false, follow: false },
};
export default async function SharedPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { token } = await params;
  const { q } = await searchParams;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key || !/^[a-f0-9-]{36}$/i.test(token)) notFound();
  const sdk = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  const { data, error } = await sdk.rpc("read_shared_deck", {
    share_token: token,
  });
  if (
    error ||
    !data ||
    typeof data.title !== "string" ||
    !Array.isArray(data.questions) ||
    !data.questions.length
  )
    notFound();
  const valid = data.questions.every(
    (item: { id?: unknown; text?: unknown }) =>
      typeof item.id === "string" &&
      /^[a-z0-9-]{1,90}$/i.test(item.id) &&
      typeof item.text === "string" &&
      item.text.trim().length > 0 &&
      item.text.length <= 145,
  );
  if (!valid || data.questions.length > 1000) notFound();
  const deck: Deck = {
    id: `shared-${token}`,
    title: data.title.slice(0, 60),
    category: "Colección compartida",
    description: "",
    intensity: "casual",
    tags: [],
    tone: "cercano",
    seoSlug: "",
    questionCount: data.questions.length,
    questions: data.questions.map((item: { id: string; text: string }) => ({
      id: `shared-${token}-${item.id}`,
      text: item.text,
      deckId: "custom",
      category: "Colección compartida",
      intensity: "casual",
      tags: [],
      locale: "es",
    })),
  };
  const paths = Object.fromEntries(
    deck.questions.map((item) => [
      item.id,
      `/compartido/${token}?q=${encodeURIComponent(item.id)}`,
    ]),
  );
  return (
    <main>
      <QuestionDeckClient
        key={`${token}:${q ?? "resume"}`}
        deck={deck}
        questionPaths={paths}
        collection
        initialQuestionId={q}
        backHref="/mazos"
      />
    </main>
  );
}
