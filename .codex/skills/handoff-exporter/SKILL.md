---
name: handoff-exporter
description: Use this skill when the user wants to export the current project, page, implementation, or design context into a compact prompt that another AI conversation or Codex session can continue from.
---

# Handoff Exporter

## Purpose

Use this skill when the user wants to export the current project or page context into a compact prompt that another AI conversation or Codex session can continue from.

## Required Handoff Sections

Generate a copy-paste-ready handoff summary with:

- Product concept
- Current page purpose
- UX direction
- UI direction
- SEO strategy
- Tech stack
- Components created
- Files changed
- Data structures used
- Routes created
- Known issues
- Remaining improvements
- Suggested next prompt
- Recommended Skills to invoke next

Use [handoff-template.md](handoff-template.md) when the user asks for a direct handoff prompt.

## Handoff Rules

- Be compact but specific.
- Include exact file paths when known.
- State what has not been built yet.
- Include constraints that should not be lost, especially product tone, SEO intent, and mobile-first requirements.
- Recommend the next Skills by name.
- Do not invent completed work.

## Recommended Skill Order For This Project

For building a public question page:

1. `ux-page-builder`
2. `seo-content-architect`
3. `question-content-curator`
4. Implementation using the existing stack
5. `ux-polish-reviewer`
6. `handoff-exporter` if another session will continue
