# Academic inline comments — deployment and operations

Status: deployable code with a local PostgreSQL/HTTP/browser test harness. No public
comment backend, production database or real Turnstile widget has been provisioned.
The public configuration intentionally contains an empty `apiBase` and fails closed.
Never represent that state as a working public comment service.

## Architecture and Waline decision

Waline was investigated against upstream revision
`b9f884150f033f3a9e8563f8e47bc19c22273a7e`:

- [Comment transport](https://github.com/walinejs/waline/blob/b9f884150f033f3a9e8563f8e47bc19c22273a7e/packages/server/src/controller/comment.js)
- [Comment creation and storage fields](https://github.com/walinejs/waline/blob/b9f884150f033f3a9e8563f8e47bc19c22273a7e/packages/core/src/handlers/comment.ts)

Its normal creation path selects fixed comment fields and supplies a generated ID
after saving. The inspected public path does not offer an atomic, client-idempotent
operation combining arbitrary annotation selectors with comment creation. A second
mapping service would therefore require maintaining a Waline fork or a recovery
protocol spanning two stores. No unsupported Waline metadata options are used here.

The allowed custom-backend alternative is implemented instead. Node's HTTP server
and `pg` write comments, anchors, ownership, moderation state and the idempotency key
in one PostgreSQL transaction. There is no separate attachment mutation accepting
another person's comment ID. Replies inherit their parent's anchor on the server;
the target and all its ancestors must be visible to that visitor and on the same page.
An advisory transaction lock and unique key serialize simultaneous retries. A hash
of the one-use verification token prevents reusing it for a different submission.

Both views use `comment_id`; the browser stores records in a Map, never two copies
with different identities. Anonymous ownership uses a random session capability.
Only its HMAC is stored in PostgreSQL; it is not an account or an administrator key.
The capability is in `sessionStorage`, not a comment database. Clearing it or closing
the browser session loses access to private pending submissions, not approved posts.

## Files and integration

- `assets/inline-comments.js`: native selections, floating controls, panel, replies,
  discussion, error states and asynchronous API calls.
- `assets/inline-comments-anchors.js`: DOM-safe quote/position selectors and recovery.
- `assets/inline-comments.css`: scoped tactile styles, Custom Highlights and rail/sheet.
- `assets/inline-comments-config.json`: public API address only.
- `_theme/page.html`: conditional stylesheet and scripts only for `site-note`.
- `comment-service/src`: HTTP API, PostgreSQL adapter, validation and admin CLI.
- `comment-service/schema.sql`: storage, indexes, rate buckets and moderation audit.
- `comment-service/test`: service and browser tests using the real PGlite PostgreSQL engine.
- `.github/workflows/comment-tests.yml`: repeatable checks independent of Pages publishing.

Existing `site.js`, `site.css`, `site.lua`, notes and Quarto settings are unchanged.
No normal article text nodes are wrapped, split or replaced. Panel space is reserved
only while it is open. At widths 768–1439px the TOC is temporarily hidden while the
right-side panel is open; closing restores the existing preference. Below 768px the
panel is a bottom sheet. Escape and Cancel close it; Alt+Shift+C opens a selected
passage (or a paragraph containing a focused link). The button always says `Comments`.

## Install and deploy the service

Use Node 24 and a backed-up, managed PostgreSQL database (PostgreSQL 16+).
Deploy this directory as a standalone service, not a GitHub Pages function.
The site stays on GitHub Pages. No hosting account or paid service is created here.

1. In the repository root, run `quarto render` and then
   `node comment-service/src/build-note-paths.mjs`. This creates `note-paths.json`
   from Quarto's public catalog, excluding draft and non-note pages. Regenerate and
   redeploy it whenever adding, renaming or removing a research note.
2. In `comment-service`, run `npm ci`.
3. Register a Cloudflare Turnstile widget for `linminxi007.github.io`. Obtain its
   public site key and private secret. Register any preview host separately.
4. Put secrets in the hosting provider's environment settings, never in Git or HTML.
   For a local terminal, an ignored `.env.local` may be used with Node's `--env-file`.
5. Run `node --env-file=.env.local src/migrate.mjs` once against the intended database,
   or `npm run migrate` when the environment is already provided. Migrations are
   additive and use a separate `academic_*` namespace; they do not modify Waline tables.
6. Run `npm start`. Alternatively build the included Dockerfile, expose port 8080,
   and run `node src/migrate.mjs` as the platform's one-off release command before start.
7. Serve the API over HTTPS through the provider's trusted reverse proxy. Verify
   `/health`, then restrict its network/database user to this service's needs.
8. Set `apiBase` in `assets/inline-comments-config.json` to the HTTPS service origin,
   such as `https://comments.YOUR_DOMAIN` (without `/v1`). No credential belongs here.
   Run `quarto render`, publish the website and perform the live checklist below.

The Docker image requires the committed `package-lock.json` and generated
`note-paths.json`. Production origins are exact HTTPS origins, with no trailing slash
or wildcard. Node refuses startup if secrets or the public note allowlist are missing.
For local browser tests only, the harness supplies localhost origins directly and
injects test verification. Production `main.mjs` has no CAPTCHA-bypass flag.

| Environment | Purpose |
| --- | --- |
| `DATABASE_URL` | Private PostgreSQL connection string. Use provider-supplied, certificate-verified TLS settings. |
| `ADMIN_TOKEN` | Random secret of at least 32 characters for the separate admin API/CLI. |
| `RATE_SECRET` | Different random secret of at least 32 characters, used for capability/IP HMACs. Keep stable to retain pending ownership. |
| `ALLOWED_ORIGINS` | Comma-separated exact HTTPS website origins. Usually `https://linminxi007.github.io`. |
| `TURNSTILE_SITE_KEY` | Public widget key returned by `/v1/config`. |
| `TURNSTILE_SECRET` | Private Siteverify key. |
| `PORT` | API listening port, default 8080. |
| `TRUST_PROXY` | `off` by default. Use `one` only behind one controlled proxy that overwrites X-Forwarded-For and blocks direct access. The rightmost forwarded address is trusted. |

Generate secrets with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
Do not paste generated secrets into a chat or commit them.

## Storage and API

`schema.sql` defines one canonical `academic_comments` row containing:
`comment_id`, `page_path`, `parent_id`, `root_id`, `depth`, `nickname`, `content`,
`status`, `anchor_type`, `section_id`, `paragraph_id`, `exact`, `prefix`, `suffix`,
`start_offset`, `end_offset`, `created_at`, plus private ownership/idempotency hashes.
Database timestamps are authoritative. IP addresses and user agents are not stored
in comments or returned in public JSON. Short-lived rate buckets contain only HMACs.

| Public endpoint | Behavior |
| --- | --- |
| `GET /v1/config` | Public Turnstile key, limits and mandatory moderation policy. |
| `GET /v1/comments?page=...&cursor=...` | Approved records and this capability's private pending/rejected records. Cursor pagination, 200 records per batch. |
| `POST /v1/comments` | New root or reply; requires allowed Origin and `X-Visitor-Key`. Returns canonical record, initially pending. |

POST JSON includes `request_id` (UUID), `page_path`, optional `parent_id`, `nickname`,
`content`, `anchor` and `turnstile_token`. The same request ID and payload may be
retried after a lost response. Different text with the same ID returns 409. A reply's
client anchor is validated structurally but replaced with its parent's actual anchor.
No API accepts reassignment of an existing comment to a caller-specified passage.

Content is **plain text**, deliberately rendered using `textContent`, including
literal Markdown and HTML. No HTML is interpolated from API responses. Nicknames are
optional (Anonymous default), up to 60 UTF-16 code units; comments up to 5000; quotes
up to 8000; context is 64 code units per side. Requests are limited to 32 KB. New posts
and replies are limited to 6 per ten minutes per IP HMAC and per visitor HMAC. Reads
are limited to 120/minute/IP HMAC; buckets are shared across workers in PostgreSQL.

Turnstile is loaded only when a configured composer opens. Its compact widget fits the narrow rail without horizontal overflow. The server performs
[Siteverify validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/),
checking success, hostname and action `academic-comment`. Cross-origin responses
allow only configured origins; no cookies or wildcard credentialed CORS are used.
Origin checks supplement CAPTCHA/rate limits; they are not treated as authentication.

## Moderation (separate from the visitor UI)

Set private `COMMENT_API_URL` and `ADMIN_TOKEN` only in the administrator's terminal:

```sh
npm run moderate -- list pending
npm run moderate -- set COMMENT_UUID approved
npm run moderate -- set COMMENT_UUID rejected
```

The underlying admin API is `GET /admin/v1/comments?status=pending&cursor=...` and
`PATCH /admin/v1/comments/:id` with `{"status":"approved"}` and a Bearer token.
The CLI lists one page and returns `next_cursor` for more; use the API for subsequent
pages. Every status change is logged. An unapproved ancestor hides its descendants
from unrelated visitors, even if a child is approved. Rate-limit and restrict admin
traffic further at your proxy if appropriate. There is no public moderation widget.

## Anchoring and deliberate limits

Normal text selectors use the article's whitespace-normalized UTF-16 text stream,
excluding formulas, code, hidden assistive text and interactive elements. Paragraph
identity combines the existing section ID, content hash and duplicate ordinal.
Recovery verifies quote content: an intact paragraph identity narrows the search,
then exact quote plus context is used. Offsets alone never justify an attachment.
Ambiguous duplicates remain unresolved; unique quotes can survive nearby edits.
Chinese/English versions have separate page paths and are not automatically translated.

Mixed math/text selections fall back to an intact paragraph. Standalone math uses
an intact block signature and is allowed to become unresolved if MathJax changes its
representation. Code-only selections do not activate comments. CSS Custom Highlight
API support is preferred; otherwise only the target block receives a temporary outline.
Unresolved comments stay readable in Discussion, with the original quote and a label.

The server validates selector fields, authorized new-record creation, page allowlist
and reply ownership; it does not assert that an anonymous quote is academically true
or exactly reflects a historical source revision. Client reattachment always verifies
the quote against the current article. Administrators should review abuse and content.

## Verification

```sh
node --test tests/analytics.test.cjs             # repository root
quarto render
node comment-service/src/build-note-paths.mjs
python tests/check-analytics-html.py
cd comment-service
npm ci
npm test
npx playwright install chromium
npm run test:browser
```

`test:browser` starts loopback-only HTTP servers on 8910/8911, a **real embedded
PostgreSQL engine (PGlite)**, the production request handler and actual browser UI.
The Turnstile widget and verification call are test doubles; these tests do not prove
that a real site key, Cloudflare challenge, managed database TLS or production proxy
is configured. Service tests persist to disk, close/reopen the engine, and query again.
Screenshots are saved in `comment-service/test-results/` or `SCREENSHOT_DIR`.
`BROWSER_EXE` optionally selects an installed Edge/Chrome executable on Windows.

Before enabling public posting, test a real Turnstile challenge on the final host,
an anonymous pending post, private owner visibility, administrator approval, a reply,
lost-response retry, reload in another browser, and service restart against the managed
database. Never test by turning CAPTCHA off on the production service.

Back up PostgreSQL regularly with the provider's PITR/backup service and verify restore.
Back up `RATE_SECRET` separately: rotating it invalidates private pending capabilities
and rate bucket identities. Production hosting/TLS/CAPTCHA operation remains untested
until those resources are supplied and configured.

## Old version and rollback

Before editing, a local Git branch `backup/before-inline-comments-20261118` was made
at `ab62805`, and a complete tracked-source ZIP was saved separately. Implementation
is on `feature/inline-academic-comments`; the `main` branch retains the original site.
Before deploying this feature, preview the branch and keep the backup. Roll back the
website with a normal Git revert of the feature commit(s), then rebuild and publish.
Do not drop the database on a frontend rollback: keep comments and backups intact.
