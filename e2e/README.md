# End-to-end checks (Playwright)

Three named test groups (Playwright projects):

| Group | What it checks | Sends email? | Needs |
| --- | --- | --- | --- |
| **UI** | The assessment page / persona wizard | No | nothing |
| **Results** | The worker's scoring + rendered email (via test mode) | No | `WOTC_TEST_SECRET` |
| **Emails** | Actually sends ~20 real emails to eyeball | **Yes** | `WOTC_TEST_SECRET` + `TEST_EMAIL_TO` |

Run one group by name with `--project`, or use the npm scripts below.

## UI

Drives the deployed page and the persona wizard. No submission, so reCAPTCHA is
never involved; no secrets needed.

- `tests/wizard.spec.js` - short-circuits, promise-check stacking, the Acquirer
  question hiding, the Renter mitigation, reset, the blog link.
- `tests/persona-matrix.spec.js` - every persona resolves to its correct
  inbound/outbound rating (source of truth = the blog risk matrix), and all 64
  promise-check stacking combinations produce the right stacked set and
  critical-outbound count.

```bat
npm run test:ui
:: against a local `hugo server` instead of production:
set SITE_URL=http://localhost:1313
npm run test:ui
```

## Results

Verifies the worker's scoring and the rendered email through its secret-gated
test mode. The worker returns the computed scores and email but **sends nothing**.

- `tests/worker-email.spec.js` - scoring and email content for representative
  personas.
- `tests/scoring-matrix.spec.js` - each of the 15 scored questions moves the
  correct axis by the correct amount and leaves the other at 0, plus band
  thresholds and the outbound cap.
- `tests/results-matrix.spec.js` - backend parity with the UI persona matrix:
  the same persona and stacking scenarios run through the worker, asserting the
  returned persona, the inbound/outbound scores and levels, and the rendered
  persona profile (stacked names, critical-outbound count, Renter mitigation).

```bat
set WOTC_TEST_SECRET=your-secret
npm run test:results
:: against a local `wrangler dev`:
set WORKER_URL=http://localhost:8787
npm run test:results
```

`WOTC_TEST_SECRET` must match what you set with `wrangler secret put TEST_SECRET`
(or `TEST_SECRET` in `ai-assessment-worker/.dev.vars` for local dev). Without it,
this group skips itself.

## Emails (sends real email)

Sends ~20 curated scenarios (every persona, the key stacks, a range of scores)
as real emails so you can eyeball the reports. Uses the test mode with
`testSend: true`, which delivers **only** to `TEST_EMAIL_TO`, not the production
inbox. Skips unless BOTH `WOTC_TEST_SECRET` and `TEST_EMAIL_TO` are set, so it
never sends by accident.

```bat
set WOTC_TEST_SECRET=your-secret
set TEST_EMAIL_TO=you@example.com
npm run test:emails
```

Requires the worker deployed with `TEST_SECRET` and `RESEND_API_KEY` set. This
delivers 20 emails to `TEST_EMAIL_TO`.

## Why there is no "submit the real form" test

The live form uses reCAPTCHA v3 and the worker rejects any token scoring below
0.3. An automated browser generally scores as a bot, so a real end-to-end submit
through the UI is unreliable. UI checks page behavior without submitting; Results
and Emails go through the worker's test mode.

## Setup

```bat
cd e2e
npm install
npm run install-browsers
```

## Run

```bat
npm test              :: UI + Results (never sends)
npm run test:ui       :: UI only
npm run test:results  :: Results only  (needs WOTC_TEST_SECRET)
npm run test:emails   :: Emails only   (needs WOTC_TEST_SECRET + TEST_EMAIL_TO)
```

`npm test` deliberately excludes the Emails group so a plain run can never send.

## Environment variables

| Variable | Used by | Default |
| --- | --- | --- |
| `SITE_URL` | UI | `https://whoownsthecode.com` |
| `WORKER_URL` | Results, Emails | `https://ai-assessment-worker.richard-dd5.workers.dev` |
| `WOTC_TEST_SECRET` | Results, Emails | unset (groups skip) |
| `TEST_EMAIL_TO` | Emails | unset (group skips) |
