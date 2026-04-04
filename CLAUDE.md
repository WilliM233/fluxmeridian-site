# CLAUDE.md — fluxmeridian-site
### Project Flux Meridian · Public Website · L Melton

---

## What This Project Is

`fluxmeridian-site` is the public website for Project Flux Meridian — a nonprofit mission providing free technology tools and tech support to underserved communities. The site serves three audiences:

1. **Primary:** People seeking tech help (FluxHelp) — zero barriers, plain language
2. **Secondary:** ADHD/neurodivergent users interested in BRAIN 3.0
3. **Tertiary:** Technical community interested in AI-assisted development methodology

**The relationship:**
```
fluxmeridian.com (this repo)
├── / ............... Home — mission, two pathway cards, story
├── /fluxhelp ....... FluxHelp — community tech services + contact form
├── /about .......... About — L's story, the why
├── /brain .......... BRAIN 3.0 product page (Phase 2)
└── /how-we-build ... Knowledge base / case study (Phase 3)
```

fluxhelp.org redirects to fluxmeridian.com/fluxhelp.

---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| Framework | Astro (static output) |
| Styling | Vanilla CSS with custom properties |
| Content | Markdown (for Phase 3 knowledge base) |
| Hosting | Hostinger (static deploy) |
| Domain | fluxmeridian.com |

No UI frameworks. No Tailwind. No pre-built component libraries. Every component is hand-written HTML/CSS.

---

## Design Language

### Color Palette (Dark Galaxy Purple)
All colors defined as CSS custom properties in `src/styles/tokens.css`.

- **Backgrounds:** Deep space darks (#0a0a1a, #0f0f2a, #1a1a3a)
- **Primary accent:** Nebula purple (#7c3aed)
- **Secondary accent:** Lighter purple (#a855f7)
- **Text:** White (#ffffff) and soft gray (#d1d5db)
- **Highlight/CTA:** Warm accent (TBD — to complement purples)
- **Success/error states:** Standard green/red adapted to dark theme

### Typography
- Display/headings: distinctive, characterful — NOT generic (no Inter, Roboto, Arial)
- Body: clean, readable at small sizes on dark backgrounds
- Loaded via Google Fonts or self-hosted in public/fonts/

### Visual Principles
- Dark, elegant, cosmic — not flashy or cartoonish
- Subtle gradient and texture effects for depth
- Generous whitespace
- Mobile-first responsive
- WCAG AA contrast compliance on all text

---

## Content Principles

- **FluxHelp content:** 8th grade reading level. Zero jargon. Must feel safe and welcoming.
- **BRAIN content:** "Built for ADHD, useful for everyone." ADHD is the origin story, not the gatekeep.
- **Overall tone:** Witty, whimsical, academic. Direct and warm, not corporate.

---

## Git Workflow

Same standards as BRAIN 3.0:

```
main          ← production deploys only
  └── develop ← integration branch
        └── feat/ws-XX-description ← one branch per ticket
```

- Never commit directly to main or develop
- Branch naming: `feat/ws-XX-description`, `fix/ws-XX-description`, `docs/short-description`
- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`
- PR targets develop with full template
- One ticket per PR

### PR Description Template

```markdown
## Summary
[What was built, in plain language.]

## Changes
[Files created or modified and why.]

## How to Verify
[Steps to confirm changes work — npm run dev, check routes, etc.]

## Deviations
[Anything that differs from the ticket spec. "None" if fully aligned.]

## Acceptance Checklist
- [ ] Criteria 1
- [ ] Criteria 2
```

---

## Astro Conventions

- One page file per route in `src/pages/`
- Reusable pieces in `src/components/` as `.astro` files
- Layouts in `src/layouts/` — all pages use BaseLayout
- Styles: global CSS imported in BaseLayout, component-scoped styles via `<style>` blocks in .astro files
- No client-side JavaScript unless explicitly needed (progressive enhancement)
- Images and static assets in `public/`
- Markdown content in `src/content/` (Phase 3)

---

## What To Do When Stuck

- Re-read this file
- Check the ticket description in BRAIN (task IDs in the prompt)
- If the spec is ambiguous, document the ambiguity and your chosen approach in the PR under "Deviations"
- If a dependency is missing, flag it — don't work around it silently

---

*CLAUDE.md · fluxmeridian-site · Project Flux Meridian · April 2026*
