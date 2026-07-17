# [statecraft.ing](https://statecraft.ing) ![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Encore.ts](https://img.shields.io/badge/Encore.ts-554BF7?style=for-the-badge&logo=encore&logoColor=white) ![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white) ![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Spec Spine Intent Evolution](artifacts/statecraft-github-banner.jpg)

<div align="center">

### Governed software delivery for the agentic era

**AI can write the code. The unsolved problem is trusting what it wrote.**

We build the machinery that makes machine-generated change *auditable*: <br /> 
the human authors the contract, agents do the work, and gates (not optimism) refuse anything
that drifts from the contract. <br />
Stop reviewing output; start constraining intent.

</div>

---

## The thesis

No human reviews every line an agent writes; pretending otherwise just moves the
bottleneck back to the human. So we move the trust boundary upstream. Intent
becomes a requirement, the requirement becomes a typed spec, and the spec becomes
law: a hash-verifiable contract that machinery enforces at PR time and at run time.

Agentic output is hostile by default. It earns passage by surviving gates, not by
appealing to trust. Humans gate the contracts (specs, approvals, irreversible
boundaries); everything between them is enforced, reconciled, and signed by code.
The result is delivery you can hand to an auditor: every change bound to the spec
that authorised it, every run emitting a certificate anyone can verify offline.

---

## The stack

Each project does one job; together they take you from a single hash-verified spec
all the way to a governed, self-auditing platform running in your own cloud.

<p align="center">
  <img alt="architecture_infographic_v3.jpg" src="artifacts/architecture_infographic_v3.jpg" width="830px"/>
</p>

---

## Projects

### The platform

#### [open-agentic-platform](https://github.com/statecrafting/open-agentic-platform)
![License](https://img.shields.io/badge/license-AGPL--3.0-blue?style=flat-square)
![Rust](https://img.shields.io/badge/-Rust-000?style=flat-square&logo=rust)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

A governed control plane for AI-native software delivery. Frozen, hash-verifiable
specs are the unit of governance: every change is bound to a spec, every spec
compiles to a deterministic registry, and drift between spec and code fails CI
before merge. Agents act through scoped tools, policy gates, and permission tiers;
SHA-256 proof chains and JSONL audit logs are the runtime substrate. Every run
emits a self-authenticating `governance-certificate.json` an auditor can verify
independently, and the OWASP ASI 2026 control-to-spec mapping is one CLI
invocation. Ships with a local Tauri + React cockpit (OPC) and an organisational
control plane (identity, policy, approvals, deployments, audit).

### The factory

#### [factory-encore](https://github.com/statecrafting/factory-encore)
![License](https://img.shields.io/badge/license-Apache--2.0-green?style=flat-square)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

A technology-agnostic software factory. It separates the *process* of building
software (requirements, design, specification) from the *implementation*
(frameworks, languages, patterns) by placing a formal *contract* between the two.
Business documents go in; a frozen, technology-free Build Specification comes out;
an adapter turns that specification into a running application. The process layer
never names a framework; add a stack by adding an adapter.

#### [template-encore](https://github.com/statecrafting/template-encore)
![License](https://img.shields.io/badge/license-Apache--2.0-green?style=flat-square)
![Vue](https://img.shields.io/badge/-Vue%203-42b883?style=flat-square&logo=vuedotjs&logoColor=white)
![Encore.ts](https://img.shields.io/badge/-Encore.ts-554BF7?style=flat-square)

The runnable reference baseline the factory composes from: a public-facing SPA and
a staff-facing SPA, both backed by a single Encore.ts service cluster with a BFF
API gateway, stateless RS256 JWT auth, and Postgres. Vue 3 + PrimeVue with
pluggable authentication (rauthy OIDC or Mock). The factory clones this lean
baseline and composes the requested modules in, bound by a cross-repo lockstep so
the generator can never silently diverge from the baseline it targets.

### The tenant toolkit

#### [tenant-emit](https://github.com/statecrafting/tenant-emit)
![License](https://img.shields.io/badge/license-Apache--2.0-green?style=flat-square)
![Rust](https://img.shields.io/badge/-Rust-000?style=flat-square&logo=rust)

An emit-only CLI a produced application pins to build a signed
`governance-certificate.json` from a finished run directory: scan every stage,
SHA-256 every artifact, lift the frozen Build Spec hash, attach an attributable
signer, and write a self-authenticating certificate. Identity-bearing and offline.

#### [tenant-tail](https://github.com/statecrafting/tenant-tail)
![License](https://img.shields.io/badge/license-Apache--2.0-green?style=flat-square)
![Rust](https://img.shields.io/badge/-Rust-000?style=flat-square&logo=rust)

The verify-only counterpart: a CLI a produced application pins to re-check the
factory's run-side paperwork (artifact-hash chain, Ed25519 signature, platform
countersign, inter-stage manifest chain) with zero trust in the producer. Offline,
identity-free, read-only all the way down. *Spine to tail to emit:* spec-spine
compiles the corpus, tenant-tail verifies the run-side paperwork, tenant-emit
produces it.

### The primitive

#### [spec-spine](https://github.com/statecrafting/spec-spine)
![License](https://img.shields.io/badge/license-Apache--2.0-green?style=flat-square)
![Rust](https://img.shields.io/badge/-Rust-000?style=flat-square&logo=rust)
[![crates.io](https://img.shields.io/badge/crates.io-spec--spine--cli-orange?style=flat-square&logo=rust)](https://crates.io/crates/spec-spine-cli)
[![npm](https://img.shields.io/badge/npm-spec--spine-CB3837?style=flat-square&logo=npm)](https://www.npmjs.com/package/spec-spine)

The foundation everything else is built on: a typed, hash-verifiable authority
ledger over a markdown spec corpus. Each spec declares, in YAML frontmatter, the
files, sections, symbols, and crates it owns; a PR-time coupling gate refuses code
that drifts from its owning spec. Every artifact is a pure function of (config,
file contents): byte-identical output on every platform. Installable from
crates.io, npm, or PyPI. It governs itself, its own coupling gate runs against its
own spec corpus in CI.

### Day-zero operations

#### [oap-bootstrap](https://github.com/statecrafting/oap-bootstrap)
![License](https://img.shields.io/badge/license-Apache--2.0-green?style=flat-square)
![Go](https://img.shields.io/badge/-Go-00ADD8?style=flat-square&logo=go&logoColor=white)

One resumable CLI that stands up an open-agentic-platform instance in a new GitHub
org and brings its Hetzner K3s estate online: fork the platform, register the
GitHub App, wire every secret, provision the cluster, configure DNS and OIDC, and
verify, without the multi-hour manual choreography. Every phase is idempotent, so
re-running one is how you resume after a fix.

---

## Why these licenses

The platform is **AGPL-3.0** on purpose: the audit chain is a public good for
regulated buyers, and strong copyleft prevents that work from being absorbed into
proprietary control planes that strip the traceability while keeping the engine.
The primitives and tooling (spec-spine, the tenant toolkit, the factory,
oap-bootstrap) are **Apache-2.0**, so the building blocks are free to adopt
anywhere.

---

<div align="center">

Built in the open from Edmonton, Canada by [**@bartekus**](https://github.com/bartekus)
and a fleet of governed agents, which is rather the point.

**[bartekus.com](https://bartekus.com)** · **[the platform ↗](https://github.com/statecrafting/open-agentic-platform)**

</div>
