# AI-tools scrolling strip (homepage)

Date: 2026-07-20

## Goal

Show visitors that the site's IP/copyright guidance applies to code from many AI
tools, not one vendor, via a continuously scrolling strip of AI-tool logos
directly below the hero on the homepage. Modeled on the customer-logo marquee at
accentient.com.

## Behavior

- Infinite horizontal marquee, homepage only, placed directly below the hero,
  framed as an "import bar" card. The card header shows only the caption label
  (`.import-caption`, from `[params.aitools].eyebrow`); an earlier
  `import { * } from "ai-tools"` mono statement was removed and the caption now
  sits alone, left-aligned.
- Logos are grayscale at reduced opacity by default; hovering a logo restores its
  full native color.
- The whole strip pauses on hover and fades out at both left/right edges.
- Collapses to a static centered wrapped grid when `prefers-reduced-motion` is set
  (the duplicate `aria-hidden` copy is hidden in that mode).
- The logo list is rendered twice and the track translates `0 -> -50%` so the loop
  is seamless.

## Assets

- One full-color SVG per tool in `static/images/ai-tools/<slug>.svg`.
- Sources: **svgl.app** (full color) for 22 tools; **simple-icons** (monochrome)
  for Cline and Qodo. Full color is required so the grayscale-default /
  color-on-hover effect works.
- Prefer compact glyph marks over wide wordmarks so heights normalize uniformly.
- Dropped for lack of a clean vendable logo: Tabnine, Devin, Aider, Continue.
  Codeium dropped as redundant with Windsurf. Add later if assets are supplied.

## Components

- `layouts/partials/home/ai-tools.html` - a `$tools` slice of `{f: slug, n: name}`
  in popularity order, a caption label (`.import-caption`, from
  `[params.aitools].eyebrow`), and the doubled `<img>` track.
- `layouts/index.html` - includes the partial before the footer, guarded by
  `[params.aitools].enabled`.
- `config.toml` - `[params.aitools]` block with `enabled` and editable `eyebrow`.
- `static/css/custom.css` - the `.imports` / `.import-card` / `.import-head` /
  `.import-caption` / `.band` / `.marquee` rules (light band, grayscale-to-color
  hover, edge fades, pause-on-hover, reduced-motion fallback, mobile sizing).

## Tool list (order = rough popularity)

ChatGPT, GitHub Copilot, Claude, Google Gemini, Microsoft Copilot, Cursor,
OpenAI Codex, Perplexity, DeepSeek, Grok, Meta Llama, Mistral AI,
Amazon Q Developer, Replit, v0 by Vercel, Bolt, Lovable, Windsurf,
Sourcegraph Cody, JetBrains AI, Warp, Zed, Cline, Qodo (24 total).

## Maintenance

To add a tool: drop a full-color SVG in `static/images/ai-tools/`, add a `dict`
entry to the `$tools` slice in the partial. To change the heading, edit
`eyebrow` in `config.toml`. To turn the strip off, set `enabled = false`.
