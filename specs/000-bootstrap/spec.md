---
id: "000-bootstrap"
title: "Bootstrap spec system"
# Written as a draft by statecraft-cli init: ratifying a spec, setting
# its status to approved, is the owner's act and never a tool's.
status: approved
# This spec owns governance policy, not application implementation.
implementation: n-a
created: "2026-10-03"
summary: >
  Foundational contract: authored truth lives only in markdown (+ YAML
  frontmatter); machine-consumable truth is compiler-emitted JSON only;
  every artifact is a deterministic function of (config, file contents);
  a typed authority graph governs who-owns-what.
establishes:
  - "AGENTS.md"
  - "spec-spine.toml"
  - ".gitignore"
  - "docs/public-frontend-adoption.md"
  - { kind: directory, path: "standards/spec/" }
unamendable:
  - "markdown-truth-boundary"
  - "json-truth-boundary"
  - "determinism-requirement"
  - "typed-authority-graph"
  - "refusal-rule"
---

# 000: Bootstrap spec system

This bootstrap defines the governance of the public organization frontend.
It is a draft requiring owner ratification. Archive approvals do not apply. Each
compilation unit links back here (or to a more specific spec) via
`[package.metadata.spec-spine].spec` in its manifest, a `// Spec:` comment
header, or a spec's ownership edge.

## 1. The authoring / derived boundary

Humans author markdown; the compiler owns the JSON. Never hand-edit a
derived artifact.

## 2. The typed authority graph

Specs declare typed edges (`establishes`, `extends`, `refines`,
`supersedes`, `amends`, `co_authority`, `constrains`, `references`) and
the units they own (file / section / symbol / directory / crate / module).
Authority is derived by walking the graph.

## Owner ratification

Ratified by Bart on 2026-10-03 for delivery of the public `.github` based
`statecraft.ing` frontend. Implementation, verification and deployment evidence
remain separate from this approval.
