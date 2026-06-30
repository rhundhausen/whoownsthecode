# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing/content site for **whoownsthecode.com**, a site about the IP and copyright risks of AI-generated code. It has two independent deployable parts:

1. **Hugo static site** (repo root) - the public website, deployed to Cloudflare Pages.
2. **`ai-assessment-worker/`** - a standalone Cloudflare Worker that receives the AI risk assessment form, scores it, and emails the result. It has its own `package.json` and deploys separately. It is not part of the Hugo build.

## Commands

### Hugo site (run from repo root)

```bash
hugo server          # local dev server with live reload
hugo --minify        # production build into ./public (what CI runs)
```

CI builds with Hugo **extended** v0.147.9 (see `.github/workflows/deploy-to-cloudflare.yml`). Use the extended edition locally since the theme uses SCSS/Sass.

> **Version gotcha:** CI pins 0.147.9, but a local install is often much newer. A build can succeed locally yet fail in CI if it uses template functions or config keys introduced after 0.147.9. (Example that bit us: `.Site.Language.Locale` and the `locale` config key, which replaced the deprecated `.Site.LanguageCode` / `languageCode` only in Hugo 0.158.0, so they error on 0.147.9.) Stay within 0.147.9-era syntax, or bump the pinned CI version deliberately, before relying on newer features. Deprecation warnings you see locally may not apply to the pinned CI version at all.

### Assessment worker (run from `ai-assessment-worker/`)

```bash
npm install
npm run dev          # wrangler dev (local worker)
npm test             # vitest
npx vitest run test/index.spec.js   # single test file
npm run deploy       # wrangler deploy
```

Note: `test/index.spec.js` is the unmodified Cloudflare starter test and asserts a "Hello World!" response that `src/index.js` no longer returns. It does not reflect current behavior; update it before relying on it.

## Deployment

Two separate pipelines, do not assume one deploys the other:

- **Site**: GitHub Actions (`deploy-to-cloudflare.yml`) runs on push to `main`, builds with Hugo, and runs `wrangler pages deploy public --project-name=whoownsthecode`. Pushes that only touch `.github/workflows/**` are skipped. Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets.
- **Worker**: deployed manually via `npm run deploy` from `ai-assessment-worker/`. Lives at `https://ai-assessment-worker.richard-dd5.workers.dev`. There is no CI for it.

## Architecture

### Hugo site

- `config.toml` is the control panel. The navbar links, hero text, and footer are all driven by `[params.*]` entries there, not hardcoded in templates. Page sections render conditionally: `layouts/index.html` only emits `section1`..`section5` partials when a matching `[params.sectionN]` block with `enabled = true` exists in config.
- `content/*.md` are the pages (assessment, authors, contact, faq, presentations, resources, workshops). Each maps to a navbar URL.
- The theme is a customized copy of the Bulma-based **Fresh** theme, vendored directly into the repo root (`layouts/`, `static/`, `assets/`) rather than installed under `themes/` (that directory is empty). Edit the root `layouts/` and `static/` directly.
  - `static/css/` holds the **compiled, hand-maintained CSS that is actually served** (`bulma.css`, `style.css`, `icons.css`, `custom.css`), wired up in `layouts/partials/css.html`. The Hugo build does NOT run a Sass pipeline; it copies these `.css` files as-is. Edit them directly (or recompile from source, then drop the result here).
  - Sass sources live under `assets/` (`assets/style.sass` imports `assets/fresh/core.scss`). They are kept for reference/recompilation only and are NOT published, because unreferenced files in `assets/` are not copied to the build. Do not expect editing them to change the site on its own; regenerate `static/css/style.css` if you change them.
  - Bulma is NOT vendored. An earlier full copy of the Bulma source repo under `static/bulma/` was removed (it was unused and was being deployed wholesale). `static/css/bulma.css` is the precompiled framework CSS. To recompile from Sass, re-add Bulma via npm or git and point an `@import` at it.
  - `layouts/partials/` contains the page chrome (navbar, hero, footer, single/list scaffolding) and `layouts/shortcodes/` provides `titleN`/`subtitleN` shortcodes used in content.
- `markup.goldmark.renderer.unsafe = true` is enabled, so content `.md` files can contain raw HTML. The assessment page (`content/assessment.md`) relies on this: it embeds the entire form markup plus the reCAPTCHA + fetch submit script inline.
- `_go.mod` is intentionally inert (underscore-prefixed). Hugo modules are not active; do not rename it to `go.mod` expecting module behavior.

### Assessment worker (`src/index.js`)

Single-file Worker, default `fetch` export, no framework. Request flow:

1. Accepts `POST` of a JSON body (the form on the assessment page serializes itself to JSON and POSTs here). `OPTIONS` returns CORS preflight; other methods 405.
2. Honeypot: if the `website` field is present, returns `200 OK` without doing anything (bot trap).
3. Verifies the Google reCAPTCHA v3 token against `siteverify`, requiring `action === "submit"` and `score >= 0.3`.
4. `computeRiskAssessment()` produces the 0-100 risk score. This is the core domain logic: a single `SCORED` array lists each scored question with a `weight` (20 = critical, 10 = high, 5 = medium) and a `riskWhen` flag. Most questions are `riskWhen: "no"` (a "No" to a good-practice question adds the weight); two are inverted with `riskWhen: "yes"` (`ai_in_production` and `vendor_ai_use`, where doing the thing is the risk). The base sum is capped at 100, then a multiplier (more than 5 tools, code-like usage) is applied and capped at 1.15, asserting ownership caps the result at 80, and the score is bucketed into Low/Moderate/High/Critical bands. Changing the question set means updating the `SCORED` array, the `QUESTIONS` array, and the form fields in `content/assessment.md` together.
5. Builds both a plain-text and an HTML email of the answers + score and sends via the **Resend** API to `whoownsthecode@gmail.com` and the submitter.

Secrets the worker expects (set via `wrangler secret`, never committed): `RECAPTCHA_SECRET`, `RESEND_API_KEY`. The reCAPTCHA **site** key is public and hardcoded in `content/assessment.md`.

When editing the assessment, keep these in sync between `content/assessment.md` and `src/index.js`: the form field `name`s vs the `SCORED` and `QUESTIONS` arrays; the Q2 usage checkbox `value`s vs `hasCodeLikeUsage()`; the Q18 assistance checkbox `value`s vs `ASSISTANCE_VALUE_TO_LABEL`; and the `*_other` free-text field names (`ai_tools_other`, `ai_usage_other`, `assistance_other`) vs what the worker reads. A field added or renamed on one side but not the other is silently unscored or unreported.

## Conventions

- Writing style for all content (Markdown, comments, commit messages): do not use en-dashes or em-dashes. Use a hyphen, or rephrase with commas/parentheses/colons.
