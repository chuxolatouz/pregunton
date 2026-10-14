import { decks, seoPages } from '../data/decks.ts';
const ids = new Set(); const issues = [];
for (const deck of decks) {
  if (deck.questions.length < 30) issues.push(`${deck.id}: menos de 30 preguntas`);
  const texts = new Set();
  for (const question of deck.questions) {
    if (ids.has(question.id)) issues.push(`ID duplicado: ${question.id}`);
    ids.add(question.id);
    if (texts.has(question.text)) issues.push(`Texto duplicado en ${deck.id}: ${question.text}`);
    texts.add(question.text);
    if (question.text.length > 145 || !question.text.trim()) issues.push(`Texto inválido: ${question.id}`);
    if (question.text.startsWith('¿') && !question.text.endsWith('?')) issues.push(`Signos incompletos: ${question.id}`);
    if (/confiesa|trauma|nunca le has dicho a nadie|por qué eres así/i.test(question.text)) issues.push(`Texto invasivo: ${question.id}`);
    if (question.deckId !== deck.id || question.locale !== 'es') issues.push(`Datos incoherentes: ${question.id}`);
  }
}
for (const page of seoPages) {
  if (!decks.some(deck => deck.id === page.deckId)) issues.push(`Mazo inexistente: ${page.slug}`);
  for (const slug of page.related) if (!seoPages.some(item => item.slug === slug)) issues.push(`Enlace inexistente: ${slug}`);
}
if (issues.length) { console.error(issues.join('\n')); process.exit(1); }
console.log(`Contenido válido: ${decks.length} mazos, ${ids.size} preguntas y ${seoPages.length} páginas SEO.`);
