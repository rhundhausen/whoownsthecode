# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing/content site for **whoownsthecode.com**, a site about the IP and copyright risks of AI-generated code. It has two independent deployable parts:

1. **Hugo static site** (repo root) - the public website, deployed to Cloudflare Pages.
2. **`ai-assessment-worker/`** - a standalone Cloudflare Worker that receives the AI risk assessment form (scores it and emails the result) and the site contact form (emails the message). It has its own `package.json` and deploys separately. It is not part of the Hugo build.

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

Note: the worker's own `test/index.spec.js` is still the unmodified Cloudflare starter test (asserts a "Hello World!" response `src/index.js` no longer returns) and does not reflect current behavior. The real coverage is the repo-root `e2e/` Playwright suite below.

### End-to-end tests (run from `e2e/`)

```bash
npm install
npm run install-browsers
npm test              # UI + Results groups (never sends email)
npm run test:ui       # assessment page + persona wizard (no secrets needed)
npm run test:results  # worker scoring + rendered email via test mode (needs WOTC_TEST_SECRET)
npm run test:emails   # sends ~20 real emails to eyeball (needs WOTC_TEST_SECRET + TEST_EMAIL_TO)
```

Three Playwright projects: **UI** drives the deployed page and persona wizard (no submission, so no reCAPTCHA/secrets); **Results** checks the worker's scoring and rendered email through its secret-gated `X-Test-Secret` test mode (sends nothing); **Emails** delivers curated reports only to `TEST_EMAIL_TO`. `npm test` excludes the Emails group so a plain run can never send. `WOTC_TEST_SECRET` must match the worker's `TEST_SECRET` secret. Full detail in `e2e/README.md`.

## Deployment

Two separate pipelines, do not assume one deploys the other:

- **Site**: GitHub Actions (`deploy-to-cloudflare.yml`) runs on push to `main`, builds with Hugo, and runs `wrangler pages deploy public --project-name=whoownsthecode`. Pushes that only touch `.github/workflows/**` are skipped. Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets.
- **Worker**: deployed manually via `npm run deploy` from `ai-assessment-worker/`. Lives at `https://ai-assessment-worker.richard-dd5.workers.dev`. There is no CI for it.

## Architecture

### Hugo site

- `config.toml` is the control panel. The navbar links, hero text, footer, and AI-tools strip caption are driven by `[params.*]` entries there (`[params.hero]`, `[params.aitools]`, `[params.footer]`, `[[params.navbar]]`), not hardcoded in templates. `layouts/index.html` is a bespoke single-file homepage layout (hero with a plain-language "Where it matters" card, the `home/ai-tools.html` logo strip, the "four ways" risk cards, a plain case-law timeline, and the closing CTA); it is not a generic `sectionN`-partial page. The homepage is intentionally written for non-developers (founders, executives, counsel): no fake terminals, `function()` headings, git-log commit hashes, `//` eyebrows, or other code decoration. That feedback came from non-technical readers in August 2026; keep the homepage plain even though the interior pages keep the editor-panel shell.
- `content/*.md` are the pages (assessment, authors, contact, faq, presentations, resources, workshops). Each maps to a navbar URL.
- The theme is a customized copy of the Bulma-based **Fresh** theme, vendored directly into the repo root (`layouts/`, `static/`, `assets/`) rather than installed under `themes/` (that directory is empty). Edit the root `layouts/` and `static/` directly.
  - `static/css/custom.css` is the **single, hand-maintained stylesheet that is actually served** (the earlier `bulma.css` / `style.css` / `icons.css` were removed). It is a bespoke "REPL" code-editor design system, not the original Fresh/Bulma CSS. The Hugo build does NOT run a Sass pipeline; `layouts/partials/css.html` links `custom.css` with a content-hash cache-buster (`?v=<md5>` via `readFile | crypto.MD5`) so browsers refetch it whenever it changes, and loads the Google Fonts (JetBrains Mono + IBM Plex Sans) with `display=fallback`. Edit `custom.css` directly.
  - Sass sources live under `assets/` (`assets/style.sass` imports `assets/fresh/core.scss`). They are kept for reference/recompilation only and are NOT published, because unreferenced files in `assets/` are not copied to the build. Do not expect editing them to change the site on its own; regenerate `static/css/style.css` if you change them.
  - Bulma is NOT vendored. An earlier full copy of the Bulma source repo under `static/bulma/` was removed (it was unused and was being deployed wholesale). `static/css/bulma.css` is the precompiled framework CSS. To recompile from Sass, re-add Bulma via npm or git and point an `@import` at it.
  - `layouts/partials/` contains the page chrome (navbar, hero, footer, single/list scaffolding) and `layouts/shortcodes/` provides `titleN`/`subtitleN` shortcodes used in content.
- `markup.goldmark.renderer.unsafe = true` is enabled, so content `.md` files can contain raw HTML. The assessment page (`content/assessment.md`) relies on this: it embeds the entire form markup plus the persona wizard and the reCAPTCHA + fetch submit script inline. `content/contact.md` likewise embeds a contact form + reCAPTCHA submit script that POSTs to the same worker.
- **Light theme only.** The color-scheme toggle was removed; `layouts/_default/baseof.html` hardcodes `<html data-theme="light">` and `meta.html` sets `<meta name="color-scheme" content="light">`. `custom.css` still contains the dark token sets (`@media (prefers-color-scheme: dark)` and `:root[data-theme="dark"]`), but they are inert while `data-theme="light"` is forced. Do not re-add a toggle without also unforcing that attribute. Always style through the CSS custom properties (tokens), never hardcode hex colors, so a future dark mode can be re-enabled.
- Interior pages render through `layouts/partials/single/content.html`, an editor-panel shell (tab = `<name>.md`, a `~/whoownsthecode` path that links home). It honors a `hidetitle: true` front-matter flag to suppress the `<h1>`. The top nav, footer, and mobile menu all iterate `[[params.navbar]]`; the Assessment link is rendered as a purple `nav-cta` button (see `.nav a.nav-cta` in `custom.css`). Phone-specific layout fixes live in the `@media (max-width: 520px)` block of `custom.css`.
- `_go.mod` is intentionally inert (underscore-prefixed). Hugo modules are not active; do not rename it to `go.mod` expecting module behavior.

### Assessment worker (`src/index.js`)

Single-file Worker, default `fetch` export, no framework. Request flow:

1. Accepts `POST` of a JSON body (the form on the assessment page serializes itself to JSON and POSTs here). `OPTIONS` returns CORS preflight; other methods 405.
2. Honeypot: if the `website` field is present, returns `200 OK` without doing anything (bot trap).
3. Verifies the Google reCAPTCHA v3 token against `siteverify`, requiring `action === "submit"` and `score >= 0.3`.
4. `computeRiskAssessment()` produces **two** 0-100 scores, an **inbound** and an **outbound** risk, from a single `SCORED` array. Each entry has a `weight` (20 = critical, 10 = high, 5 = medium), a `riskWhen` flag, and an `axis` (`inbound` = what the AI ingested into your build: infringing/copyleft fragments and tracing them; `outbound` = whether you can own, license, warrant, and sell what you ship). Most questions are `riskWhen: "no"` (the safe answer is "Yes"); a few are inverted with `riskWhen: "yes"` (e.g. `ai_in_production`, `vendor_ai_use`). Some are `graded: true` (Always/Sometimes/Never, where "Sometimes" scores half weight). Only the safe answer scores zero: "Don't know" and unanswered both score full risk. Each axis is normalized to 0-100 over only the questions actually shown (so persona exclusions don't skew the scale), then a context multiplier (>5 tools, code-like usage, individual/unknown tool tier, high/unknown share of AI-generated code) capped at 1.25 is applied; asserting ownership caps the **outbound** score at 80; each score is bucketed into Low/Moderate/High/Critical bands. Changing the question set means updating the `SCORED` array, the `QUESTIONS` array (currently Q1-Q20), and the form fields in `content/assessment.md` together.
5. Builds both a plain-text and an HTML email of the answers + score and sends via the **Resend** API to `whoownsthecode@gmail.com` and the submitter.

The same endpoint also serves the **contact form** (`content/contact.md`), discriminated by `form_type: "contact"`: after the shared honeypot + reCAPTCHA gate (steps 2-3), it skips scoring and emails the `name` / `email` / `subject` / `message` through Resend to `whoownsthecode@gmail.com` (reply-to the sender) instead of building the assessment report. Both forms use the same worker URL and the same public reCAPTCHA site key.

Secrets the worker expects (set via `wrangler secret`, never committed): `RECAPTCHA_SECRET`, `RESEND_API_KEY`. The reCAPTCHA **site** key is public and hardcoded in `content/assessment.md`.

When editing the assessment, keep these in sync between `content/assessment.md` and `src/index.js`: the form field `name`s vs the `SCORED` and `QUESTIONS` arrays; the `ai_usage` checkbox `value`s vs `hasCodeLikeUsage()`; the `ai_tool_tier` and `ai_code_share` option `value`s vs the multiplier logic in `computeRiskAssessment()`; the graded (Always/Sometimes/Never) answer `value`s for `code_reviewed` / `code_labeled` vs the `graded` branch of `riskFraction()`; the assistance checkbox `value`s vs `ASSISTANCE_VALUE_TO_LABEL`; and the `*_other` free-text field names (`ai_tools_other`, `ai_usage_other`, `assistance_other`) vs what the worker reads. A field added or renamed on one side but not the other is silently unscored or unreported. For the contact form, keep `content/contact.md`'s field names (`form_type`, `name`, `email`, `subject`, `message`, and the `website` honeypot) in sync with the `form_type === "contact"` branch in `src/index.js`.

## Conventions

- Writing style for all content (Markdown, comments, commit messages): do not use en-dashes or em-dashes. Use a hyphen, or rephrase with commas/parentheses/colons.
