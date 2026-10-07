---
id: "002-static-frontend"
title: "Static public frontend and reading surfaces"
status: approved
implementation: complete
created: "2026-10-03"
summary: "A static accessible website with current claims, catalog routes, reading controls, themes and architecture explanations."
depends_on:
  - "000-bootstrap"
establishes:
  - "package.json"
  - "package-lock.json"
  - "tsconfig.json"
  - "vite.config.ts"
  - "react-router.config.ts"
  - {"kind": "directory", "path": "app/"}
  - {"kind": "directory", "path": "public/"}
  - "tests/site.spec.ts"
  - "playwright.config.ts"
---

# Static public frontend and reading surfaces

## 1. Architecture and routes

Adopt the historical React Router v7 static framework pattern with `ssr: false`.
Select currently supported dependency versions, lock them, and document the
runtime pin before implementation. No backend, analytics, remote fonts,
third-party scripts, private API calls or login target are part of this site.

Provide landing, products, catalog, per-repository/per-spec detail, docs,
papers and getting-started routes. Preserve stable section anchors, reader TOC,
print layout, references, architecture explanations and system/light/dark themes.
Refactor the reader for mobile navigation, keyboard access and visible focus.
Interactive diagrams use unique SVG IDs, accessible controls and bounded detail
panels. A static explanation remains readable without interaction.

## 2. Honest content

Author new current prose from accessible pinned public source evidence. Do not
republish the archived paper under its historical author/date while changing
its substance. Do not import its private links, authentication infrastructure,
Encore-era promises, fabricated counts or complete-to-shipped status ladder.
Use one current public roster shared by products, navigation and content.
Retired repositories leave the roster and current copy, including capability
descriptions whose only public source was a retired repository.
Skeletal repositories may be labeled early repositories without corpus claims.

Catalog data comes only from the normalized presentation payload specified in
003. Display lifecycle and implementation independently. Unknown verification
or qualification is visible; neither is inferred from implementation complete.
Do not claim historical search or filters existed. Search/filter controls may
be added as new presentation behavior, with empty-state and keyboard checks.

## 3. Route integrity and acceptance

Missing required catalog input fails the build. Prerender every expected detail
route and verify the output against the payload IDs. Unknown IDs produce an
honest missing-spec response, never another spec's content. Check direct deep
links, refreshes, navigation, mobile widths, keyboard controls, themes, print,
source links and artifact privacy. Pages custom-domain routes use the apex
rather than the default project subpath. No local handoffs or evidence enter
the deploy artifact.

## Owner ratification

Ratified by Bart on 2026-10-03 for delivery of the public `.github` based
`statecraft.ing` frontend. Implementation, verification and deployment evidence
remain separate from this approval.
The 2026-10-07 repository retirement amendment awaits owner ratification.
