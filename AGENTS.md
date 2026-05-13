# Pregunton Project Instructions

## Product Philosophy

Pregunton is a warm, mobile-first question-deck experience for real social moments. It helps people quickly find conversational prompts for friends, couples, travel, dates, boredom, icebreakers, and deeper reflection.

The product is not a quiz with correct answers. It is not a corporate dashboard. It is not a mobile game. It should feel lightweight, human, playful, conversational, and useful while someone is sitting with another person.

Visual identity rule:
This product should not look like a default component-library interface. It should feel like a tactile deck of paper conversation cards: warm, readable, human, slightly imperfect, and intentionally designed around the act of drawing, reading, saving, and sharing questions.

Design every page around:

- Purpose
- Audience
- Emotional context
- First user action
- Secondary user actions
- SEO intent
- Mobile-first usability
- Content structure
- Accessibility
- Shareability
- Indexability
- Performance

Avoid generic startup landing pages, corporate SaaS layouts, meaningless gradients, random glassmorphism, overcomplicated onboarding, and hiding actual questions too far down the page.

## Experience Layers

- SEO landing pages are the discovery layer.
- Interactive card mode is the experience layer.
- Questions should be visible in HTML on SEO pages when useful.
- The app must be useful before JavaScript-only interactions.
- Spanish is the primary content language.
- English expansion should remain possible through locale-aware data and routes.

## UX/UI Principles

- A user should understand what to do in under 5 seconds.
- The first action should usually be selecting a category, drawing a question, copying a question, sharing a question, or starting one-question-at-a-time mode.
- The interface should feel like a tactile question deck, not a SaaS product.
- Keep flows short. Do not add login, onboarding, accounts, dashboards, gamification, or backend features unless explicitly requested.
- Match the emotional context of the category:
  - Couples: warm, intimate, affectionate, never invasive.
  - Friends: playful, casual, social, a little surprising.
  - Travel: exploratory, spontaneous, nostalgic, open-ended.
  - Boredom: quick, fun, low-friction, random.
  - Deep questions: reflective, calm, respectful.
  - Icebreakers: approachable, socially safe, low pressure.
  - Dates: curious, warm, awkwardness-reducing.
- Use familiar controls: icon buttons for copy/share/next, tabs or segmented controls for modes, simple filters for intensity, and cards for individual questions.
- Do not use cards inside cards. Do not style whole sections as floating cards unless the section is an actual tool surface.
- Keep layouts mobile-first and comfortable for one-handed use.

## SEO Principles

- Target Spanish-first search intent while keeping future English expansion possible.
- Use natural language. Never keyword-stuff.
- Match titles and headings to how people search.
- Important target intents include:
  - preguntas para charlar
  - preguntas para cuando estas aburrido
  - preguntas para parejas
  - preguntas para viajar
  - preguntas para amigos
  - preguntas para conocer a alguien
  - preguntas para romper el hielo
  - preguntas profundas
  - preguntas random
  - preguntas para roadtrip
  - preguntas para una cita
  - preguntas divertidas para amigos
- Each public SEO page should define:
  - Primary keyword
  - Secondary keywords
  - Search intent
  - SEO title
  - Meta description
  - H1 and H2 structure
  - Canonical URL
  - Open Graph metadata
  - Internal links
  - Indexable question content when useful
- Structured data must match visible content. Add FAQ schema only if the FAQ is visible and genuinely useful.

## Accessibility Principles

- Use semantic HTML before custom widgets.
- Every interactive element must be keyboard reachable and have a visible focus state.
- Icon-only controls need accessible names.
- Do not rely on color alone to communicate category, state, or intensity.
- Maintain readable contrast and comfortable tap targets on mobile.
- Avoid motion that is required to understand the product. Respect reduced-motion preferences.
- Copy/share/random interactions should provide accessible feedback.
- Questions should be readable aloud and readable on small screens without truncating important words.

## Mobile-First Rules

- Design for mobile first, then enhance for larger screens.
- The primary question card should fit comfortably above the fold on common mobile screens.
- Avoid dense sidebars, hover-only interactions, and desktop-first navigation.
- Keep tap targets stable and predictable.
- Keep category and deck navigation visible or easy to return to.
- Do not make users scroll past generic marketing content before seeing questions.

## Component Rules

- Prefer existing project components and patterns when present.
- If the project uses shadcn/ui, use it for accessible primitives and adapt styling to the product tone.
- Use component names that reflect product concepts: `QuestionCard`, `DeckSelector`, `CategoryTabs`, `ShareQuestionButton`, `QuestionList`, `SeoQuestionSection`.
- Components should separate content data from presentation.
- Do not introduce a backend, authentication, database, analytics, payment, or account system for the MVP unless explicitly requested.
- Local JSON or TypeScript data is expected for MVP decks and questions.
- Components should render useful content without requiring client-side-only fetches.

## Copywriting Rules

- Write in natural Spanish by default.
- Keep copy warm, direct, and human.
- Prefer short sentences and familiar words.
- Avoid corporate product language such as "optimiza tu experiencia", "solucion integral", or "potencia tus conversaciones".
- Avoid cringe, forced slang, manipulative intimacy, and overly therapeutic framing.
- CTAs should say what happens next: "Sacar pregunta", "Copiar", "Compartir", "Ver preguntas", "Otra pregunta".
- English copy should be possible later, but do not mix languages casually on Spanish pages unless the page intentionally targets bilingual intent.

## Question Content Rules

- Questions should be open-ended.
- Avoid yes/no questions unless they are intentional warm-ups.
- Avoid manipulative, invasive, shaming, or overly therapeutic questions.
- Avoid repetitive formats.
- Questions should fit the category context and create conversation rather than close it.
- Questions should work when read out loud.
- Questions should be short enough to fit comfortably on a mobile card.
- Use intensity levels consistently:
  - `casual`
  - `fun`
  - `reflective`
  - `deep`
  - `romantic`
  - `spicy-soft`
  - `icebreaker`

## Data Structure Expectations

Use simple local data for MVP content. Prefer TypeScript data when type safety helps.

Expected `Question` shape:

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
```

Expected `Deck` shape:

```ts
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

## Review Checklist

Before finishing a page or feature, verify:

- The page purpose is clear.
- The audience and emotional context are reflected in UI and copy.
- The first action is obvious in under 5 seconds.
- Secondary actions are useful but not distracting.
- The mobile layout is strong.
- Questions are visible where SEO requires them.
- Interactive card mode improves the experience.
- Metadata, Open Graph tags, and canonical URL are present on public pages.
- Internal links help users and search engines discover related decks.
- Buttons and controls are accessible.
- The page works without hiding all value behind JavaScript.
- Copy is natural Spanish and not keyword-stuffed.
- Performance is protected by simple layouts, local content, and minimal dependencies.

## Done When

A page or feature is done only when:

- It satisfies its purpose, audience, emotional context, first action, SEO intent, mobile usability, content structure, accessibility, shareability, indexability, and performance requirements.
- The interactive experience is usable and the indexable content is useful.
- It avoids generic SaaS layout patterns unless the product genuinely requires them.
- It has been reviewed with the project Skills: `ux-page-builder`, `seo-content-architect`, `question-content-curator`, and `ux-polish-reviewer` where relevant.
- It has been verified in the browser on mobile and desktop viewports when UI is implemented.
