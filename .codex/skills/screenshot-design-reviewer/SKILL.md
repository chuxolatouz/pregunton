---
name: screenshot-design-reviewer
description: Use this skill to visually audit UI screens using screenshots, checking hierarchy, spacing, cognitive load, responsiveness, visual identity, accessibility, and regression risks.
---

# Screenshot Design Reviewer Skill

## Purpose

Use this skill after UI changes or before final approval to review actual rendered screens.

This skill should evaluate what the user sees, not only the code.

## Required workflow

1. Identify screens to review.
2. Run the app locally if possible.
3. Capture screenshots if tooling exists.
4. Review desktop and mobile sizes.
5. Compare against design intent.
6. Identify visual issues.
7. Suggest concrete fixes.
8. Apply fixes if requested.
9. Re-review.

## Screens to prioritize for Pregunton

- Home first viewport
- /mazos
- discovery modes: Momentos, Intensidad, Mesa
- /mazo/[deckId]
- /mis-cartas
- SEO landing page
- mobile home
- mobile deck mode

## Review dimensions

Check:

### First impression

- Can the user understand the purpose in under 5 seconds?
- Is the first action obvious?
- Is there too much visual weight?

### Visual hierarchy

- Is the main headline dominant?
- Is the CTA obvious but not loud?
- Is the question card the hero in deck mode?

### Cognitive load

- Are there too many decisions above the fold?
- Are categories introduced gradually?
- Is the home cleaner than the deck library?

### Brand identity

- Does it feel like paper/cards?
- Does it avoid generic SaaS/shadcn patterns?
- Are shadows, borders and surfaces cohesive?

### Layout

- Is spacing consistent?
- Are components aligned?
- Are cards too dense?
- Is there enough whitespace?

### Mobile

- Is it usable with one hand?
- Are tap targets large?
- Is text readable?
- Does the deck mode avoid scrolling?

### Accessibility

- Contrast
- Focus states
- Semantic headings
- Button labels
- Reduced motion

## Output format

### Screenshot audit summary

Brief summary.

### Pass / Fail

Give pass, partial pass or fail.

### Issues by severity

- Critical
- Important
- Polish

### Concrete fixes

For each issue, include:
- screen
- problem
- why it matters
- code-level recommendation

### Final recommendation

Say whether to ship, iterate, or redesign.
