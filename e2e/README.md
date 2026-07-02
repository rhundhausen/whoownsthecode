# End-to-end checks (Playwright)

Two independent Playwright specs for the assessment:

- `tests/wizard.spec.js` (**Script A**) drives the assessment page and verifies the
  persona wizard: short-circuits, promise-check stacking, the Acquirer question
  hiding, the Renter mitigation, reset, and the blog link. It never submits the
  form, so reCAPTCHA is never involved. Runs against any deployment with no
  secrets.
- `tests/worker-email.spec.js` (**Script B**) verifies the worker's scoring and
  the rendered email through the worker's secret-gated test mode. It skips
  itself unless `WOTC_TEST_SECRET` is set.

## Why there is no full "submit the real form" test

The live form uses reCAPTCHA v3 and the worker rejects any token scoring below
0.3. An automated browser generally scores as a bot, so a real end-to-end submit
through the UI is unreliable to keep green. Instead, Script A checks the page
behavior without submitting, and Script B checks the worker's scoring and email
rendering directly via test mode. Neither sends an actual email.

## Setup

```bash
cd e2e
npm install
npm run install-browsers   # downloads Chromium
```

## Script A: the assessment page

```bash
# Against production (once the current changes are deployed):
npm run test:ui

# Against a local Hugo server (from the repo root: `hugo server`):
SITE_URL=http://localhost:1313 npm run test:ui
```

Script A asserts the new persona wizard, so it only passes against a build that
includes it. Test a local `hugo server` before deploying, or production after.

## Script B: worker scoring + email

1. Set a shared secret on the worker (once):

   ```bash
   cd ../ai-assessment-worker
   npx wrangler secret put TEST_SECRET
   # paste a random value, e.g. output of: openssl rand -hex 24
   ```

   For a local `wrangler dev` run, put `TEST_SECRET = "..."` in
   `ai-assessment-worker/.dev.vars` instead.

2. Run the tests with the same secret in `WOTC_TEST_SECRET`:

   ```bash
   cd ../e2e
   WOTC_TEST_SECRET=your-secret npm run test:email

   # Against a local worker (`npx wrangler dev` in ai-assessment-worker):
   WOTC_TEST_SECRET=your-secret WORKER_URL=http://localhost:8787 npm run test:email
   ```

The test mode returns the computed inbound/outbound scores, the persona, and the
rendered text + HTML email in the response body. It does **not** send anything
through Resend, so it verifies rendering and scoring, not actual delivery. To
confirm real delivery, submit the live form once by hand and check the inbox.

## Run everything

```bash
WOTC_TEST_SECRET=your-secret npm test
```

## Environment variables

| Variable | Used by | Default |
| --- | --- | --- |
| `SITE_URL` | Script A | `https://whoownsthecode.com` |
| `WORKER_URL` | Script B | `https://ai-assessment-worker.richard-dd5.workers.dev` |
| `WOTC_TEST_SECRET` | Script B | unset (tests skip) |
