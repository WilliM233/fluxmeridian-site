# Project Flux Meridian — Website

The public website for [Project Flux Meridian](https://fluxmeridian.com) — a nonprofit mission providing free technology tools and tech support to underserved communities.

## What This Is

This is the source for fluxmeridian.com, built with [Astro](https://astro.build/) and vanilla CSS. It serves as the public face of Flux Meridian, housing:

- **FluxHelp** — connecting underserved communities with free tech support
- **BRAIN 3.0** — a free, open-source personal operating system built for ADHD
- **Blog** — build logs, case studies, and lessons from the workshop
- **How We Build** — documenting our AI-assisted development methodology *(Phase 3)*

## Tech Stack

- **Framework:** [Astro](https://astro.build/) (static output, Node >= 22.12.0)
- **Styling:** Vanilla CSS with custom properties (no frameworks)
- **Blog:** Astro [Content Collections](https://docs.astro.build/en/guides/content-collections/) with Markdown
- **RSS:** [@astrojs/rss](https://docs.astro.build/en/guides/rss/) + [marked](https://marked.js.org/) for full-content HTML in feeds
- **Syntax Highlighting:** [Shiki](https://shiki.style/) with `tokyo-night` theme (built into Astro)
- **Hosting:** Hostinger (static deploy via GitHub Actions → FTPS)
- **License:** AGPL-3.0

## Project Structure

```
src/
├── components/         # Reusable Astro components
│   ├── Footer.astro
│   ├── Nav.astro
│   ├── PostCard.astro      # Blog index card (title, date, tags, reading time)
│   ├── PostHeader.astro    # Single post header with metadata
│   ├── PostNav.astro       # Previous / next post navigation
│   └── ShareLinks.astro    # Social sharing (LinkedIn, Twitter, Facebook)
├── content/
│   └── blog/               # Blog posts as .md files (content collection)
│       └── hello-world.md  # Placeholder post (draft: true — won't appear on site)
├── content.config.ts       # Content collection schema definition
├── layouts/
│   └── BaseLayout.astro    # Shared HTML shell, meta tags, OG data
├── pages/
│   ├── index.astro         # Home
│   ├── about.astro         # About
│   ├── fluxhelp.astro      # FluxHelp
│   ├── blog/
│   │   ├── index.astro     # Blog listing (published posts, newest first)
│   │   ├── [id].astro      # Individual post template
│   │   └── tags/
│   │       └── [tag].astro # Posts filtered by tag
│   └── rss.xml.ts          # RSS feed endpoint
├── styles/
│   ├── tokens.css          # Design tokens (colors, spacing, typography)
│   ├── reset.css           # CSS reset
│   ├── global.css          # Global styles
│   └── prose.css           # Blog post body typography
└── utils/
    ├── reading-time.ts     # Estimated reading time (200 wpm, manual calc)
    └── slugify.ts          # Tag → URL-safe slug conversion
```

## Development

```bash
npm install
```

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build static output to dist/
npm run preview   # Preview built site locally
```

### Previewing Blog Posts

Posts with `draft: true` in their frontmatter are excluded from the build. To see a draft post locally, temporarily set `draft: false` in the post's frontmatter, then run `npm run dev`. Remember to set it back before committing.

Published posts appear at `/blog`, individual posts at `/blog/{post-id}`, tag pages at `/blog/tags/{tag-slug}`, and the RSS feed at `/rss.xml`.

## Blog System

The blog uses Astro's [Content Collections](https://docs.astro.build/en/guides/content-collections/) — a type-safe way to manage Markdown content with validated frontmatter.

### Writing a New Post

1. Create a `.md` file in `src/content/blog/`:

```bash
touch src/content/blog/my-post-slug.md
```

2. Add the required frontmatter:

```yaml
---
title: "Your Post Title"
date: 2026-04-15
description: "A concise summary for cards and meta tags."
tags: ["topic-one", "topic-two"]
---
```

3. Write your post content in Markdown below the frontmatter. Code blocks get syntax highlighting automatically (Shiki, `tokyo-night` theme).

4. Run `npm run dev` and visit `localhost:4321/blog` to preview.

### Frontmatter Schema

Defined in `src/content.config.ts`. Astro validates every post against this schema at build time — a missing required field will fail the build.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `title` | string | yes | — | Post title |
| `date` | date | yes | — | Publication date (YYYY-MM-DD) |
| `description` | string | yes | — | Summary for cards, RSS, and meta tags |
| `author` | string | no | `"L Melton"` | Post author |
| `tags` | string[] | no | `[]` | Topic tags (used for tag pages and RSS categories) |
| `draft` | boolean | no | `false` | If `true`, excluded from build, index, RSS, and tag pages |
| `series` | string | no | — | Series name (for future grouping) |
| `coverImage` | string | no | — | Path to cover image (used in OG meta tags) |
| `canonicalUrl` | URL | no | — | Canonical URL for cross-posted content (e.g., Dev.to) |

### How Draft Filtering Works

Every page that queries the collection filters on `!data.draft`:

- **Blog index** (`/blog`) — only published posts
- **Post pages** (`/blog/{id}`) — only published posts get static paths
- **Tag pages** (`/blog/tags/{tag}`) — only published posts
- **RSS feed** (`/rss.xml`) — only published posts

The placeholder post `hello-world.md` ships with `draft: true`. It exists to validate the content collection schema and will not appear on the live site.

### RSS Feed

Available at `/rss.xml`. Includes full post content as HTML (rendered via `marked`, not Astro's built-in renderer) for cross-posting compatibility with platforms like Dev.to. Post tags are included as RSS categories.

### Design Decisions

A few choices worth knowing about if you're extending the blog:

- **Reading time** is calculated manually in `src/utils/reading-time.ts` (word count ÷ 200 wpm, minimum 1 minute) rather than using a remark plugin. This keeps the dependency tree small and the logic visible.
- **RSS content HTML** uses `marked` to parse Markdown instead of Astro's content renderer. The Astro renderer produces component output that doesn't serialize cleanly to an RSS `<content>` element — `marked` gives us plain HTML that RSS readers and cross-posting platforms expect.
- **Tag slugification** lives in `src/utils/slugify.ts` and is used by both the tag page router and the post header component to ensure consistent URL generation.

## Deployment

Pushing to `main` triggers an automatic build and deploy to Hostinger via GitHub Actions.

**Pipeline:** `push to main` → `npm ci` → `npm run build` → verify `dist/` → FTPS deploy to Hostinger

### GitHub Secrets Required

The workflow uses three repository secrets (Settings > Secrets and variables > Actions):

| Secret | Description |
|--------|-------------|
| `FTP_SERVER` | Hostinger FTP server hostname |
| `FTP_USERNAME` | FTP account username (scoped to public_html) |
| `FTP_PASSWORD` | FTP account password |

### Manual Deploy

If you need to deploy without the pipeline:

```bash
npm run build
# Upload contents of dist/ to Hostinger public_html via FTP client
```

## License

AGPL-3.0 — see [LICENSE](LICENSE) for details.

Built by L Melton · Springfield, MO
