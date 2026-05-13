---
name: question-content-curator
description: Use this skill when generating, reviewing, categorizing, or improving conversational question prompts for decks, categories, SEO pages, or interactive card flows.
---

# Question Content Curator

## Purpose

Use this skill to create and review high-quality conversational questions.

## Core Rules

- Questions should be open-ended.
- Avoid yes/no questions unless intentionally used as a lightweight warm-up.
- Avoid manipulative, invasive, or overly therapeutic questions.
- Avoid cringe.
- Avoid repetitive question formats.
- Use natural Spanish-first copy.
- Keep tone warm, human, simple, and slightly playful.
- Make questions fit the category context.
- Create conversation, do not close it.
- Make every question work when read out loud.
- Keep questions short enough to fit comfortably on a mobile card.

Use [question-patterns.md](question-patterns.md) for drafting and review patterns.

## Intensity Levels

| Intensity | Use for |
| --- | --- |
| `casual` | Easy everyday questions with low emotional pressure |
| `fun` | Playful, silly, surprising, group-friendly prompts |
| `reflective` | Thoughtful prompts without heavy vulnerability |
| `deep` | Meaningful prompts about values, memory, identity, or change |
| `romantic` | Warm couple/date prompts focused on affection and closeness |
| `spicy-soft` | Lightly flirty prompts that avoid explicit or pressuring content |
| `icebreaker` | Safe prompts for new people or socially delicate settings |

## Recommended Data Structure

```ts
type Question = {
  id: string;
  text: string;
  category: string;
  deckId: string;
  intensity: "casual" | "fun" | "reflective" | "deep" | "romantic" | "spicy-soft" | "icebreaker";
  tags: string[];
  locale: "es" | "en";
  shareText?: string;
};

type Deck = {
  id: string;
  title: string;
  description: string;
  category: string;
  tone: string;
  seoSlug: string;
  questions: Question[];
};
```

## Category Guidance

- Travel questions should feel exploratory, spontaneous, nostalgic, or adventurous.
- Bored questions should be quick, fun, weird, or random.
- Couples questions should feel intimate but not invasive.
- Friends questions should feel playful and social.
- Deep questions should invite reflection without forcing vulnerability.
- Icebreakers should be safe for new people.
- Date questions should reduce awkwardness and invite curiosity.

## Review Rubric

For each question, check:

- Would a real person say this out loud?
- Does it invite more than a one-word answer?
- Is the emotional intensity appropriate for the deck?
- Is it short enough for mobile?
- Is it distinct from nearby questions?
- Is it safe, respectful, and non-manipulative?
- Does it avoid sounding like therapy homework?

Rewrite any question that fails one or more checks.
