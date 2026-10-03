# Public frontend adoption proposal

Observed 2026-10-03. This is a proposal, not ratification or a deployment receipt.

## Baseline and setup

The public `statecrafting/.github` repository starts at
`485297349901a5a32701e0a991eba32cff1df30f` with an empty `profile/README.md`.
It has no Pages configuration or branch protection/rulesets. The apex DNS
resolves to GitHub Pages addresses and www points to `statecrafting.github.io`.
Live apex HTTPS fails hostname validation; HTTP returns GitHub Pages 404.
No active Pages publisher was found in the public family inventory. Recheck
publisher ownership immediately before deployment; this observation is not a
claim to control the DNS account.

Official GitHub documentation confirms the public `.github/profile/README.md`
organization profile and custom-domain project Pages arrangement:
- https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/customizing-your-organizations-profile
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

Current Statecraft CLI main is `0748fc721a5e51baff7c1d137be6e8756f7b9088`.
No published release was found. Its only setup profile is
`github-actions-rust`, revision 15. Governance-only `init apply` was used in
an isolated worktree; no Rust application profile was installed. The generated
bootstrap remains draft. Registration does not arm or qualify the project.
The generated managed instructions were read explicitly; Codex delivery was
reported unverified, so native import execution is not assumed.

Published spec-spine is 0.28.0, also the exact local corpus pin. Current public
source main contains additional functionality, which does not make it part of
the released command contract. The initial catalog scope is supported registry
metadata, headings, anchors, relationships and immutable source links. Full
selected-section content is deferred until a reviewed producer supports it.

## Archive feature decisions

Canonical historical website input is the `repositories/statecraft.ing` tree
at archive revision `d775aa31b12f60ebc994504ec3a725b5339e4df5`. The archive
is private; this document intentionally provides no visitor-facing source link.
Both historical checkouts remain unchanged. Its approved specs 001 through 005
and draft 006 are design evidence, not approvals in this repository.

| Historical surface | Decision | Reason and planned change |
| --- | --- | --- |
| Static React Router scaffold and prerender | Refactor | Keep static architecture, pin current dependencies and verify every detail route. |
| Landing and milestone ladder | Refactor | Replace obsolete roster and complete-to-shipped rollup with separate declared status and evidence. |
| Products and shared family data | Refactor | Keep one roster; replace retired names and private source links. |
| Registry groups, counts and provenance dates | Reuse pattern | Compute from validated payload, label the observation date. No search or filtering existed in the archive. |
| Spec detail status chips and summary | Reuse pattern | Keep lifecycle and implementation distinct; show unknown verification and qualification. |
| Detail dependencies, claims, headings and frozen anchors | Refactor | Preserve supported exported fields and pin accessible source links. |
| Build-time disk loader | Refactor | Validate website schema and fail for missing required payload. |
| Old baker | Retire | Direct shard enumeration/parsing, hard-coded old sources and moving revisions violate the supported-read contract. |
| Prerender missing-data catch | Retire | Silent omission of all detail routes is a build failure. |
| Docs and getting-started walkthrough | Refactor | Replace Encore stamping and hosted-login assumptions with public local-tool guidance. |
| Paper reader, TOC, progress, references and print | Reuse pattern | Add mobile TOC and keyboard checks; author current paper with an explicit new date. |
| Historical whitepaper prose and comparison claims | Retire as current copy | Contains obsolete chassis claims, private links and infrastructure details. Preserve archive history unchanged. |
| Architecture explorer | Refactor | Keep accessible interaction; use unique SVG IDs, responsive detail panels and current stage labels. |
| Navigation and mobile menu | Reuse pattern | Preserve useful structure, test focus and narrow viewports. |
| Theme toggle and no-flash theme | Reuse pattern | Keep system/light/dark behavior and system fonts. |
| Sign-in link | Retire | No working approved hosted target has been established. |
| Historical provider kit and governance | Retire as authority | Use current Statecraft starter, not archived provider instructions or old producer pins. |
| Claim inventory principles | Reuse | Separate declaration, exercised evidence and owner decisions; no publication approval is inherited. |

## Public source inventory

These immutable public revisions were observed on 2026-10-03. Each non-skeletal
corpus declares exact spec-spine 0.28.0. These are proposed source pins, not
completed exports or verified implementation. All have Apache-2.0 except
chancery, whose API license metadata is absent. Confirm source license files
before any code reuse; descriptions alone do not grant a license.

| Public repository | Immutable revision | Initial catalog policy |
| --- | --- | --- |
| [statecraft-cli](https://github.com/statecrafting/statecraft-cli/tree/0748fc721a5e51baff7c1d137be6e8756f7b9088) | `0748fc721a5e51baff7c1d137be6e8756f7b9088` | Required supported-read export |
| [spec-spine](https://github.com/statecrafting/spec-spine/tree/943504d6b82a9a6b40f7f3f82f39f89255aaa0d9) | `943504d6b82a9a6b40f7f3f82f39f89255aaa0d9` | Required supported-read export |
| [aicortex](https://github.com/statecrafting/aicortex/tree/e05a5a9c3a7724f2c491b24b8e1dc896518b741a) | `e05a5a9c3a7724f2c491b24b8e1dc896518b741a` | Required supported-read export |
| [rahi](https://github.com/statecrafting/rahi/tree/73e937cce7f9d5c25db0939801456b8c94b2359e) | `73e937cce7f9d5c25db0939801456b8c94b2359e` | Required supported-read export |
| [rustev](https://github.com/statecrafting/rustev/tree/1c713a61033279ce9b81d11d683bdf551f7a3769) | `1c713a61033279ce9b81d11d683bdf551f7a3769` | Required supported-read export |
| [wire-witness](https://github.com/statecrafting/wire-witness/tree/9e8c647676f1898643c7cd2c301f6bb339db1bd5) | `9e8c647676f1898643c7cd2c301f6bb339db1bd5` | Required supported-read export |
| [action-gate](https://github.com/statecrafting/action-gate/tree/6cfa81efb0426d2c4242e2919b58180ec3b384ea) | `6cfa81efb0426d2c4242e2919b58180ec3b384ea` | Required supported-read export |
| [tenant-emit](https://github.com/statecrafting/tenant-emit/tree/fe85c3a2c33189e2c02bccef78b06328dc67b414) | `fe85c3a2c33189e2c02bccef78b06328dc67b414` | Required supported-read export |
| [tenant-tail](https://github.com/statecrafting/tenant-tail/tree/229a611f53e8aa481cbde8178f7b9a4b8804d3fe) | `229a611f53e8aa481cbde8178f7b9a4b8804d3fe` | Required supported-read export |
| [trust-window](https://github.com/statecrafting/trust-window/tree/33f0dd2dcc4e199b45e4f7b2d63474c726c4a8f7) | `33f0dd2dcc4e199b45e4f7b2d63474c726c4a8f7` | Required supported-read export |
| [attest-ledger](https://github.com/statecrafting/attest-ledger/tree/a6b3eac8aa9ae2d9f2329c687f818d10c82cc565) | `a6b3eac8aa9ae2d9f2329c687f818d10c82cc565` | Required supported-read export |
| [canonical-keysort-json](https://github.com/statecrafting/canonical-keysort-json/tree/920eb173da928b70cdc96c66d98cd85ac5dfd91d) | `920eb173da928b70cdc96c66d98cd85ac5dfd91d` | Required supported-read export |
| [doc-manus](https://github.com/statecrafting/doc-manus/tree/a79fca85a5cc0f9cc43f70e85e8af92803c73599) | `a79fca85a5cc0f9cc43f70e85e8af92803c73599` | Outside required corpus; early repository |
| [chancery](https://github.com/statecrafting/chancery/tree/6bd54a6f4d1414f7abba015b2483751b50882dee) | `6bd54a6f4d1414f7abba015b2483751b50882dee` | Outside required corpus; early repository |

The public setup-acceptance fixture is not a family product. Private sources are
excluded. The private platform remains private and is not linked as accessible
source. Its selected publication contract requires a separate owner decision;
the public site can ship without it or full platform cell qualification.

Current README claims constrain initial copy: the CLI is local and not released;
Rahi describes a release candidate with N=1 recovery rather than N=3
qualification; Rustev proposes decisions and does not grant authority; Wire
Witness provides evidence rather than acceptance authority. Public libraries
are not automatically deployed services. Early repository descriptions do not
establish implemented products. Refresh claims against the selected immutable
revision at implementation time, and retain unknown evidence explicitly.

## Owner checkpoint and delivery sequence

Ratify exact specs 000-bootstrap, 001-organization-profile, 002-static-frontend,
003-public-catalog and 004-publication-workflows before their implementation.
The owner must explicitly approve these contracts; this proposal preserves
`status: draft` and `implementation: pending` (bootstrap is `n-a`). Broad work
and deployment authorization is not ratification. An owner instruction may
identify this exact proposal revision and the approved IDs, after which the
status change and regenerated artifacts can be recorded separately.

After ratification: implement static routes/readers, pinned ingestion and
required-source refusal; add verification and Pages Actions; validate a preview
and privacy; publish through one verified publisher; check live HTTPS and org
profile. Use separate implementation evidence and exact-head reviews. The
proposal itself contains no frontend, ingestion, workflow or DNS switch.
