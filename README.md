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

## Scoring changes (October 2026)

The assessment worker was revised after a review of the scoring logic. The old
model treated an ownership claim as the strongest signal of low outbound risk,
which got the legal reality backwards: a company that asserts title to code it
cannot show it authored is carrying a warranty it may not be able to honor. The
revision scores the record, not the claim.

- **Ownership assertion is no longer a free pass.** Q19 ("Do you assert that you
  own the code?") previously carried 20 outbound points and capped outbound risk
  at 80 when answered "Yes". An unsupported assertion is itself an exposure, so
  the cap is gone, the weight is 10, and "Yes" scores zero only when at least two
  authorship-record questions (commits, docs, prompts, labeling) are also
  answered safely. "No" scores half. Both emails show a note when ownership is
  asserted but unsupported, and the Q19 tooltip on the form says so up front.
- **Axis assignments follow a stated rule.** Inbound covers what the model put
  into the build and whether you can trace it (prompting policy, review,
  restrictions, labeling). Outbound covers what you ship and the record you would
  produce to prove title (commits, docs, prompts, tool terms, contracts,
  policies). `store_prompts` and `reviewed_ai_licenses` moved from inbound to
  outbound, so the axes now total 35 and 90 possible points.
- **Persona exclusions are enforced server-side.** The worker resolves excluded
  questions from `persona_primary` using its own copy of `PERSONA_EXCLUDED`. The
  client-posted `scored_excluded` field, which a crafted request could have used
  to exclude every scored question, has been removed from the form. The persona
  itself is still self-declared, so this narrows the hole rather than closing it.
- **Answer parsing is symmetric.** Added `isNo` so inverted questions accept the
  same yes/no shapes as `isYes`, and the score and the email note read the
  ownership answer through the same normalizer.
- **Untrusted input is normalized, not just checked.** `persona_result` is
  reduced to named stacked entries and a finite count before rendering, and a
  `persona_primary` that collides with an `Object.prototype` key (for example
  `constructor`) no longer crashes the worker.
- **Errors are logged.** The outer catch now writes to `console.error` before
  returning 500.
- **Keys are exported and diffed.** `PERSONA_EXCLUDED`, `QUESTIONS`, and
  `ASSISTANCE_VALUE_TO_LABEL` are named exports, and `e2e/tests/key-sync.spec.js`
  diffs the form and worker copies of every shared list on each `npm test`, with
  no network or secret needed.
- **The Results e2e suite was rewritten to the new scoring.** It had drifted from
  the committed worker already (the graded Always/Sometimes/Never answers were
  never reflected), so the expected scores, axis membership, and fixtures were
  rebuilt and verified against the working tree before deployment.

Reports generated before this change are not comparable with reports generated
after it; the outbound score in particular will be higher for organizations
that assert ownership without a record.
