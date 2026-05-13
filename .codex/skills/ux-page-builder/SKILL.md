---
name: ux-page-builder
description: Use this skill when creating or redesigning a web page where UX/UI must match the page purpose, user context, SEO intent, emotional tone, and interaction goal.
---

# UX Page Builder

## Purpose

Use this skill when creating or redesigning a web page where UX/UI must match the page purpose, user context, SEO intent, and interaction goal.

Do not start coding until the page has a clear UX brief. If the user already supplied a detailed brief, turn it into the required outputs before implementation.

## Required Workflow Before Coding

1. Understand page purpose.
2. Identify the primary user.
3. Identify emotional context.
4. Identify first user action.
5. Identify secondary actions.
6. Define above-the-fold requirements.
7. Define the interaction model.
8. Define content structure.
9. Define UX risks.
10. Define UI direction.
11. Define component plan.
12. Define mobile behavior.
13. Define accessibility requirements.
14. Define empty, loading, and error states.
15. Only then implement.

## Required Output Before Coding

Return or write a compact pre-implementation brief with:

- UX brief
- First action
- Above-the-fold plan
- Component plan
- Mobile plan
- Accessibility plan
- SEO/content considerations
- Implementation plan

Use [page-patterns.md](page-patterns.md) for general page planning and [question-page-patterns.md](question-page-patterns.md) for conversational question pages when helpful.

## Conversational-Question Page Guidance

- Help the user start quickly.
- Make category selection obvious.
- For conversational-question products, prefer tactile card and paper metaphors over generic SaaS cards. Design the question as a physical-feeling object: a prompt card, note, postcard, index card, or small paper sheet. The UI should support the emotional act of reading a question aloud.
- Make question cards tactile, readable, and shareable.
- Support copy, share, and random-question flows.
- Support a one-question-at-a-time mode.
- Adapt visual tone to category context when appropriate:
  - Couples: warm and intimate.
  - Friends: playful and casual.
  - Travel: exploratory and spontaneous.
  - Boredom: quick, fun, and low-friction.
  - Deep questions: calm and reflective.
  - Icebreakers: safe and approachable.
- Do not make the page feel like a generic dashboard, SaaS landing page, quiz, or mobile game.

## Implementation Guardrails

- Put the actual user task above generic marketing content.
- Prefer semantic sections and visible question content.
- Keep the first screen focused: title, short promise, category/deck control, and immediate question access.
- Use cards for individual questions, not for every page section.
- Use plain, friendly Spanish copy unless the route intentionally targets English.
- Keep interactions simple enough for mobile use in a real conversation.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Starting with a hero and vague value props | Start with the deck/category and the first useful action |
| Making the UI feel like SaaS | Use question-deck metaphors, social context, and warm copy |
| Hiding questions behind JavaScript only | Render useful question content in HTML where SEO matters |
| Treating all categories alike | Match tone and interaction details to emotional context |
| Adding onboarding | Let users draw, copy, share, or browse questions immediately |
