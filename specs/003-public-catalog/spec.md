---
id: "003-public-catalog"
title: "Pinned public catalog ingestion and publication boundary"
status: approved
implementation: complete
created: "2026-10-03"
summary: "Deterministic public-source exports through supported pinned spec-spine commands, preserving provenance and authority limits."
depends_on:
  - "000-bootstrap"
extends:
  - { spec: "000-bootstrap", unit: "docs/public-frontend-adoption.md", nature: "additive" }
establishes:
  - "catalog/sources.json"
  - "catalog/schema.json"
  - {"kind": "directory", "path": "scripts/catalog/"}
  - "tests/catalog.test.mjs"
---

# Pinned public catalog ingestion and publication boundary

## 1. Source authority

Each repository remains its own specification authority. The website payload
is a presentation export, never a second governance registry or acceptance
judge. `catalog/sources.json` records an explicit public repository allowlist,
immutable commit, required producer, observation date and required/optional
corpus policy. A deliberate reviewed change refreshes pins; normal builds do
not resolve moving branches or use the wall clock as payload input.

A repository retired from the platform family leaves the allowlist in a
reviewed change; it is not kept as an optional or unpinned source. The
2026-10-07 retirement of `tenant-emit`, `tenant-tail`, `trust-window`,
`chancery`, `fact-fold`, `hqgit` and `statecraft-setup-acceptance-20260924`
is recorded in `docs/public-frontend-adoption.md`.

Metadata visibility requests may use the workflow repository-scoped read-only
token to avoid shared anonymous API limits. Independently require anonymous Git
access for every source, disable credential helpers and global Git configuration,
and remove the metadata token from source subprocess environments. Never grant
private source access to the public build.

At the pinned revision verify public accessibility and its declared producer
requirement. Use that exact supported producer to check source freshness and
read `registry list`, `registry show`, relationships and closure as needed.
Never enumerate or parse managed derived shards. Refuse unsupported producer
requirements, stale data, malformed records, missing required sources,
duplicate identities, invalid edges or inconsistent revisions. A skeletal
repository without a corpus is explicitly outside required ingestion.

## 2. Presentation schema

Version and validate the website schema. Preserve repository, immutable
revision, observation date, spec ID, producer version, title, summary, declared
lifecycle, declared implementation, dependency/relationship identities,
claimed units, headings, frozen anchors and pinned accessible source links.
Preserve source content hashes when exported. Verification and deployed
qualification need separate cited evidence and an explicit unknown state.
Sort repositories, IDs and relationships deterministically. Two exports from
the same pins and producer inputs must be byte-identical.

Released 0.28.0 supports registry reads and closure but no selected-content
command. The initial catalog renders metadata, headings and frozen anchors
from supported registry output and links pinned public markdown for full text.
Do not invent a document command or scrape derived data to fill this gap.
Full section exports require a separately reviewed supported producer adoption;
unreleased local `content select` source is not a published capability.

## 3. Private-platform publication

The initial implementation has no private-platform ingestion. Any later private
summary must come from a separately sanctioned, versioned selected export.
That contract needs an owner-approved field/section allowlist, public-safe
provenance, leakage checks and revocation/update rules. Private producer access
belongs outside the public website build. This spec does not sanction a private
export. No secrets, private paths, internal evidence, infrastructure inventory
or local handoff content may enter payloads or artifacts.

## 4. Acceptance

Exercise deterministic export, missing-source refusal, bad pins, unsupported
producer, stale source, schema rejection, unknown evidence and route set
completeness. Scan the final artifact for publication violations. CI uses only
public inputs and cannot silently substitute an older payload on failure.

## Owner ratification

Ratified by Bart on 2026-10-03 for delivery of the public `.github` based
`statecraft.ing` frontend. Implementation, verification and deployment evidence
remain separate from this approval.
The 2026-10-07 repository retirement amendment awaits owner ratification.
