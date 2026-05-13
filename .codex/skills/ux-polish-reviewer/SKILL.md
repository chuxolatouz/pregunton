---
name: ux-polish-reviewer
description: Use this skill to audit whether a page's UX, UI, copy, accessibility, SEO, mobile behavior, and interaction model match its actual purpose.
---

# UX Polish Reviewer

## Purpose

Use this skill to review whether a page's UX, UI, copy, accessibility, SEO, and mobile behavior match its actual purpose.

## Review Questions

- Is the first action obvious in under 5 seconds?
- Does the visual style match the page purpose?
- Does the page feel generic?
- Does the copy invite the user to continue?
- Is the mobile experience strong?
- Are buttons accessible?
- Are components semantic?
- Are loading, empty, and error states handled?
- Is SEO metadata present?
- Are Open Graph tags present?
- Is the page useful before scrolling too much?
- Are CTAs clear?
- Is there unnecessary UI complexity?
- Are the questions visible where SEO requires them?
- Does the interactive mode improve the experience?
- Is the page shareable?
- Does the page avoid keyword stuffing?

Use [review-checklist.md](review-checklist.md) for a practical pass.

## Required Output

Return a review with:

- What works
- What feels generic
- What should be improved
- Concrete code-level recommendations
- SEO issues
- Accessibility issues
- Mobile issues
- Final pass/fail recommendation

## Rating Guidance

- Pass only when the page is purposeful, usable, accessible, indexable, and emotionally aligned.
- Soft pass when issues are small polish items that do not block launch.
- Fail when the first action is unclear, the mobile experience is weak, the page feels generic, or SEO content is hidden behind interactions.

## Project-Specific Risks

- Page looks like a SaaS landing page instead of a question deck.
- Questions are buried below vague marketing copy.
- Interactive card mode replaces all indexable content.
- Category tone is visually or verbally generic.
- Spanish copy sounds translated or corporate.
- Share/copy controls are present but inaccessible.
