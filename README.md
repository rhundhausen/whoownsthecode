# whoownsthecode

Marketing and content site for **whoownsthecode.com**, about the IP and copyright
risks of AI-generated code.

Two independent deployable parts:

1. **Hugo static site** (repo root) - the public website, deployed to Cloudflare
   Pages. Light-theme only; a bespoke "REPL" code-editor design in
   `static/css/custom.css`.
2. **`ai-assessment-worker/`** - a standalone Cloudflare Worker that scores the AI
   risk assessment and handles the contact form, emailing results via Resend.
   Deploys separately (manual `npm run deploy`).

End-to-end Playwright checks live in `e2e/`.

## Local dev

```bash
hugo server          # site, with live reload
```

See [CLAUDE.md](CLAUDE.md) for full commands, architecture, deployment, and the
sync rules between the forms and the worker. Design specs are in
`docs/superpowers/specs/`.
