# Project Flux Meridian — Website

The public website for [Project Flux Meridian](https://fluxmeridian.com) — a nonprofit mission providing free technology tools and tech support to underserved communities.

## What This Is

This is the source for fluxmeridian.com, built with [Astro](https://astro.build/) and vanilla CSS. It serves as the public face of Flux Meridian, housing:

- **FluxHelp** — connecting underserved communities with free tech support
- **BRAIN 3.0** — a free, open-source personal operating system built for ADHD
- **How We Build** — documenting our AI-assisted development methodology

## Tech Stack

- **Framework:** Astro (static output)
- **Styling:** Vanilla CSS with custom properties
- **Hosting:** Hostinger
- **License:** AGPL-3.0

## Development

```bash
npm install
npm run dev       # Start dev server at localhost:4321
npm run build     # Build static output to dist/
npm run preview   # Preview built site locally
```

## Deployment

Pushing to `main` triggers an automatic build and deploy to Hostinger via GitHub Actions.

**Pipeline:** `push to main` -> `npm ci` -> `npm run build` -> verify `dist/` -> FTP deploy to Hostinger

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
