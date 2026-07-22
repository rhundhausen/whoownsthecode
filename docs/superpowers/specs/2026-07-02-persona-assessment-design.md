# Persona Assessment: Design

Date: 2026-07-02
Status: Implemented (assumptions 1 and 3 resolved to the recommended options), awaiting user review

## Goal

Add an "AI-code risk persona" identifier to the top of the existing AI Usage
Assessment. A short branching wizard identifies which of 18 organizational
personas a respondent falls into, using the minimum number of questions, and
correctly handles organizations that match more than one persona at once. The
result is shown on the page immediately, then the respondent continues to the
existing maturity questions and submits as today. The emailed report gains a
persona section.

## Source of truth

The 18 personas, their inbound/outbound ratings, and their tooltip text come
from the blog post risk-matrix table at
`Accentient/accentient.com/content/blog/ai-code-ownership-by-persona/index.md`.
The assessment must stay consistent with that table. Ratings use the five-level
scale None / Low / Moderate / High / Critical (encoded there as `rk-0`..`rk-4`).

Persona ratings (verbatim from the blog table):

| # | Persona | Inbound | Outbound |
|---|---------|---------|----------|
| 1 | Internal Tooler | Low | Low |
| 2 | Onshorer | Low | High |
| 3 | Offshorer | Low | High |
| 4 | Host | Low | Moderate |
| 5 | Bootstrapper | Moderate | High |
| 6 | Hired Gun | Low | Critical |
| 7 | Renter | Moderate | Moderate |
| 8 | Giver | Low | None |
| 9 | Licensor | Moderate | Critical |
| 10 | Regulated | Moderate | Critical |
| 11 | Exiter | Moderate | Critical |
| 12 | Acquirer | Low | Moderate |
| 13 | Civic Coder | Moderate | None |
| 14 | Fed Supplier | Moderate | Critical |
| 15 | Inheritor | Low | High |
| 16 | Walled Garden | Low | Low |
| 17 | Two-Tier | Moderate | Critical |
| 18 | Model Maker | Critical | Low |

## Architecture

- **Client-side wizard** in the inline JS of `content/assessment.md`. No new
  framework or dependency. Progressive disclosure: persona questions reveal or
  collapse based on prior answers. The persona result renders on the page live.
- The wizard sits **above** the existing "AI Tools & Usage" section as a new
  first section. The existing maturity questions, name/email, reCAPTCHA, and
  POST-to-worker flow are preserved unchanged in behavior.
- On submit, the serialized JSON gains the persona answers plus the computed
  `persona_primary` and `persona_stacked` fields. The worker
  (`ai-assessment-worker/src/index.js`) adds a "Persona Profile" section to the
  text and HTML emails. The existing 0-100 maturity score is untouched.
- A single `PERSONAS` data object in the client JS holds each persona's slug,
  display name, inbound, outbound, and a one-line description. This is the only
  persona table in the assessment; it mirrors the blog source of truth.

## Decision logic (question flow)

Short-circuit questions come first: a Yes ends the persona branch immediately
(the persona is shown, remaining branch questions collapse, the respondent
still continues to the maturity questions).

- **P0 Acquire gate.** "Are you assessing code your organization built or owns,
  or code you're evaluating to acquire?"
  - Built/own -> P1
  - Evaluating to acquire -> **ACQUIRER** (short-circuit)
- **P1 Model Maker.** "Do you train or ship an AI model that others build on?"
  - Yes -> **MODEL MAKER** (short-circuit)
  - No -> P2
- **P2 Giver.** "Is all of your code free and open source, with no paid tier and
  nothing sold?"
  - Yes -> **GIVER** (short-circuit)
  - No -> P3
- **P3 Civic Coder.** "Is the code written by government employees, not
  contractors?"
  - Yes -> **CIVIC CODER** (short-circuit)
  - No -> P4
- **P4 Host.** "Does your code only ever run on your own servers and never get
  delivered to anyone (pure SaaS)?"
  - Yes -> **HOST** (primary), then promise check
  - No -> P5
- **P5 Authorship.** "Who writes the code you're assessing?"
  - Our own employees -> P6
  - A contractor or shop we hired -> P7
  - We are the contractor/shop building for clients -> **HIRED GUN** (primary),
    then promise check
  - We inherited it through an acquisition -> **INHERITOR** (primary), then
    promise check
- **P6 Employee usage.** "What do you do with that code?"
  - Internal only, never leaves -> **INTERNAL TOOLER** (terminal, no promise
    check)
  - Feeds an internal LLM trained on our own data -> **WALLED GARDEN**
    (terminal)
  - We sell or license it to customers -> **LICENSOR** (primary), then promise
    check  *(assumption, see below)*
  - Building it to raise money and sell the company -> **EXITER** (primary),
    then promise check
  - Bootstrapped paid product, no investors, not for sale -> **BOOTSTRAPPER**
    (terminal)
- **P7 Shop location.** "Is that shop US-based and easy to reach, or offshore and
  hard to audit?"
  - US-based, reachable -> **ONSHORER** (terminal)
  - Offshore, hard to audit -> **OFFSHORER** (terminal)
- **P8 Promise check.** Multi-select shown to everyone who reaches it (Host,
  Hired Gun, Inheritor, Licensor/sold-licensed, Exiter). NOT a branch: each
  checked box is an independent trigger that stacks on the same codebase.
  - We warrant clear title to customers in our licenses -> **LICENSOR**
  - We deliver to the federal government under contract -> **FED SUPPLIER**
  - We operate under HIPAA, SEC, or FDA regulation -> **REGULATED**
  - Open-source core plus a proprietary paid tier -> **TWO-TIER**
  - Raising or selling, will warrant title at exit -> **EXITER**
  - A vendor contractually indemnifies our AI output -> **RENTER** (mitigating:
    reduces outbound severity rather than adding a trigger)

Personas that never reach the promise check: the four short-circuits, plus
Internal Tooler, Walled Garden, Bootstrapper, Onshorer, Offshorer.

## Result handling

- Show the **primary** persona (from the routing path) prominently with its
  inbound and outbound rating.
- Show each **stacked** persona from the promise check as a flag with its own
  inbound/outbound rating. Deduplicate against the primary (e.g. an Exiter who
  also checks the Exiter promise box appears once; a sold/licensed Licensor who
  checks "warrant clear title" appears once).
- **Critical-outbound callout.** Count personas in the identified set (primary +
  stacked) whose outbound rating is Critical (Hired Gun, Licensor, Regulated,
  Exiter, Fed Supplier, Two-Tier). If two or more, surface it explicitly, e.g.
  "3 critical-outbound triggers on one codebase," since that stack is the main
  thing the assessment exists to reveal.
- **Renter** is shown as a mitigating flag: a note that the vendor's contractual
  indemnity reduces outbound severity, not another trigger.
- Ratings render using the blog's visual language (four bar segments + word,
  colored by level) so the assessment result reads the same as the blog table.
  The small `rk-*` CSS is inlined into `assessment.md` alongside the existing
  inline styles.

## Data captured / emailed

The POST payload gains: the raw persona answers (opening gate, each branch
answer, the promise-check selections) and the computed `persona_primary` and
`persona_stacked` values. The worker renders a "Persona Profile" section (primary
persona + ratings, stacked flags + ratings, critical-outbound count, Renter
mitigation note) into both the text and HTML emails. The existing survey-details
rows and 0-100 maturity score are preserved as-is.

## Constraints honored

- No new framework or dependency; vanilla inline JS and CSS, matching the
  existing `assessment.md` style.
- Persona names, ratings, and copy kept consistent with the blog source of
  truth. Any drift found is flagged, not silently reconciled.
- Existing routing, analytics, layout, reCAPTCHA, Resend, and the maturity score
  are preserved.
- Five-level None/Low/Moderate/High/Critical scale. No em-dashes. 2-space
  indentation.

## Assumptions to verify

1. **Sold/licensed branch primary = Licensor.** P6 "we sell or license to
   customers" has no named routing terminal in the task's logic; Licensor is a
   promise-check trigger. I made Licensor the base primary for that branch so
   the path always yields a persona, and the promise check stacks the rest. If
   you'd rather the promise check alone supply the persona (no persona if the
   respondent checks nothing), say so.
2. **Short-circuits still continue** to the maturity questions and email capture
   (confirmed).
3. **Onshorer / Offshorer / Bootstrapper / Internal Tooler / Walled Garden do
   not reach the promise check**, per the task's explicit routing. An Onshorer
   client could in reality also be Regulated; the task does not route them
   there, so neither do we. Flagging in case you want promise check widened.

## Test walkthroughs

1. **Short-circuit.** P0 built/own -> P1 Yes (trains a model) -> **MODEL MAKER**
   (Inbound Critical, Outbound Low). Branch collapses; continues to maturity
   questions.
2. **Single primary, no stack.** P0 built/own -> P1 No -> P2 No -> P3 No -> P4
   No -> P5 own employees -> P6 internal only -> **INTERNAL TOOLER** (Low / Low).
   No promise check.
3. **Stacked, multiple critical-outbound.** P0 built/own -> P1 No -> P2 No -> P3
   No -> P4 No -> P5 own employees -> P6 sell/license -> primary **LICENSOR**
   (Moderate / Critical). Promise check: deliver to federal government
   (**FED SUPPLIER**), HIPAA/SEC/FDA (**REGULATED**). Result set = Licensor,
   Fed Supplier, Regulated -> callout "3 critical-outbound triggers on one
   codebase."
4. **Mitigated.** P0 built/own -> P4 Yes (pure SaaS) -> primary **HOST** (Low /
   Moderate). Promise check: vendor indemnifies AI output -> **RENTER** shown as
   a mitigating flag reducing outbound severity.

## Files to change

- `content/assessment.md` - add the persona wizard section (HTML + inline CSS +
  inline JS), above the existing questions; extend the submit serializer to
  include persona fields.
- `ai-assessment-worker/src/index.js` - add a "Persona Profile" section to the
  text and HTML email builders; read the new persona fields.
- (Docs) this spec.
