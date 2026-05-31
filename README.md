# BA Team — Documentation Site

This repository contains the static documentation site for the **BA Team** AI tool.

The site is hosted on GitHub Pages and serves as the public-facing reference for users of the BA Team tool.

## What is BA Team?

BA Team is a Claude-based AI system that supports Business Analysts in requirements engineering. It automates Discovery, extraction, validation, and BA document generation from raw project materials.

## This repo

This repo contains only the **generated output** — do not edit files here directly.

| Path | Contents |
|---|---|
| `index.html` | Single-page app shell (generated) |
| `scripts/app.js` | Route definitions and client-side logic (generated) |
| `styles/style.css` | Stylesheet |
| `assets/` | Static assets |
| `page/` | All Markdown content served by the SPA |
| `page/agents/` | Agent documentation |
| `page/skills/` | Skill (command) documentation |
| `page/HANDBOOK/` | Full user handbook |
| `page/release-notes/` | Release notes per version |
| `page/downloadable/` | Downloadable files (PDF presentation) |

## How to update

All changes must be made in the **ba-team** source repo, then deployed with:

```bash
python scripts/deploy-docs/deploy_docs.py
```

This script syncs content from `app/` into `docs/page/`, regenerates `index.html` and `app.js` from templates, injects version and date, then commits and pushes here.

## Local preview

```bash
cd docs
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.
