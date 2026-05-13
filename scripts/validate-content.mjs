import { readFileSync } from "node:fs";
import { join } from "node:path";

const source = readFileSync(join(process.cwd(), "data", "decks.ts"), "utf8");

const deckBlocks = source.match(/questions: \[[\s\S]*?\n    \]/g) ?? [];
const issues = [];

if (deckBlocks.length < 10) {
  issues.push(`Expected at least 10 question decks, found ${deckBlocks.length}.`);
}

for (const [deckIndex, block] of deckBlocks.entries()) {
  const questions = [...block.matchAll(/"([^"]+\?)"/g)].map((match) => match[1]);
  const unique = new Set(questions);

  if (questions.length < 20) {
    issues.push(`Deck ${deckIndex + 1} has ${questions.length} questions; expected at least 20.`);
  }

  if (unique.size !== questions.length) {
    issues.push(`Deck ${deckIndex + 1} contains duplicate question text.`);
  }

  for (const question of questions) {
    if (!question.startsWith("¿")) {
      issues.push(`Question should start with inverted question mark: ${question}`);
    }

    if (question.length > 145) {
      issues.push(`Question is too long for a mobile card (${question.length} chars): ${question}`);
    }

    if (/confiesa|trauma|nunca le has dicho a nadie|por qué eres así/i.test(question)) {
      issues.push(`Question uses discouraged invasive wording: ${question}`);
    }
  }
}

if (issues.length > 0) {
  console.error(issues.join("\n"));
  process.exit(1);
}

console.log(`Content validation passed for ${deckBlocks.length} decks.`);
