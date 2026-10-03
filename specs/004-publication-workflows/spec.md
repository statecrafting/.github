---
id: "004-publication-workflows"
title: "Verification and GitHub Pages publication"
status: draft
implementation: pending
created: "2026-10-03"
summary: "Reproducible least-permission verification and single-publisher Pages deployment to the custom domain."
depends_on:
  - "000-bootstrap"
establishes:
  - ".github/workflows/verify.yml"
  - ".github/workflows/pages.yml"
  - "scripts/verify-site.mjs"
  - "scripts/install-spec-spine.sh"
  - ".node-version"
---

# Verification and GitHub Pages publication

## 1. Verification

Before accepting implementation, retire ownership coverage debt and enable
`require_ownership` with an explicit governed scope covering all authored
frontend, scripts, catalog, profile and workflow files. The starter default
is temporarily false for this draft-only proposal. Absent future paths remain
visible unresolved diagnostics, not passing implementation evidence.

Pin actions to immutable commits with recognizable release annotations.
Pin the runtime, dependencies and spec-spine producer. Verify producer identity,
compile/index freshness, lint, ownership/coupling, type checking, deterministic
catalog generation, static build, route coverage and meaningful browser/privacy
checks. Required input failures fail CI. Untrusted pull requests receive no
write permissions or secrets and cannot deploy. Record exact-head results;
local gates, CI, reviews and deployed qualification are separate evidence.

## 2. Deployment

Use GitHub Pages Actions with one authoritative publisher in this repository.
Build with read-only contents permission and public corpus access only.
Upload only the static output directory. The deployment job alone gets
`pages: write` and `id-token: write`, with the appropriate `github-pages`
environment. Serialize deployment and prevent older artifacts overtaking a
newer deployment. Do not grant blanket contents write or private corpus access.

Configure `statecraft.ing` after verifying existing DNS and publisher ownership.
Do not create a competing organization Pages repository. Recheck hostname,
certificate, HTTPS enforcement, representative deep links and the profile after
deployment. DNS already targets GitHub Pages, but its current certificate is
not proof of delivery. Preserve deployment identifiers and rollback evidence
in ignored state. Do not declare completion until live HTTPS serves the intended
artifact and verification passed.
