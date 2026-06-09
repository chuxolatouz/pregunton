---
name: ui-component-craftsperson
description: Use this skill when creating or refining reusable UI components, visual primitives, layout primitives, and component variants for a consistent interface.
---

# UI Component Craftsperson Skill

## Purpose

Use this skill to create polished, reusable, accessible UI components that preserve the Pregunton visual identity.

Do not redesign pages by scattering one-off styles.
Create a small design system.

## Required component workflow

For each component, define:

1. Purpose
2. States
3. Variants
4. Anatomy
5. Accessibility requirements
6. Responsive behavior
7. Visual style
8. Reuse locations

## Pregunton components to prefer

Create or improve:

- PaperSurface
- PaperCard
- QuestionPaperCard
- DeckStackCard
- PaperButton
- PaperLink
- PaperTabs
- PaperBadge
- MomentCard
- ToneCard
- CategoryShelf
- CardStack
- MinimalHeader
- HeroQuestionCard
- EmptySavedCardsState
- Toast

## Component quality rules

Every component must:
- use semantic HTML where possible
- be keyboard accessible
- include focus states
- have responsive behavior
- avoid fixed widths unless justified
- use design tokens
- avoid hardcoded random colors
- avoid visual drift
- use real content in examples

## Pregunton-specific behavior

Question cards:
- the question is the hero
- metadata is secondary
- controls are quiet
- text must be readable on mobile
- card should feel physical but not childish

Deck cards:
- should feel like small stacks of paper
- show title, description, count, tone
- support click/tap
- have accessible labels

Tabs:
- should feel like paper tabs or folder tabs
- must not look like default segmented controls

Buttons:
- should feel tactile and calm
- avoid glossy SaaS buttons
- primary CTA must be visually clear

## Output format

### Component inventory

List existing components and whether to reuse, refactor or create.

### Component plan

List components to implement.

### State plan

List hover, focus, active, loading, disabled and empty states.

### Accessibility notes

List requirements.

### Implementation steps

List exact files to update.
