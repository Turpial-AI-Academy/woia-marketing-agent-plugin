---
name: marketing-orchestration
description: Orchestrate a WOIA Marketing Task through its selected OPEA-H profile, delegate exact Marketing providers, enforce shared-data and effect boundaries, validate receipts, and preserve Project overlays and evidence.
license: MIT
---

# WOIA Marketing Orchestration

WOIA Core owns Task/runtime mechanics. This skill owns Marketing routing.

## Flow

1. Read `.woia/project.json` and current Task/TaskCell once.
2. Confirm selected Marketing capabilities/effects still match current evidence.
3. For the active OPEA-H role, choose provider responsibilities from registry/routing.json.
4. Ask woia-core project-runtime to establish exact provider runtime readiness; never duplicate provider installation logic here.
5. Delegate provider-owned work to the exact custom role with Task scope, authority, effective snapshot, resource refs and acceptance/evidence requirements.
6. Persist and validate dev.woia.execution-receipt/v1.
7. Record effects explicitly; publication/communication/financial/external-write effects remain governed and may require Human Review.
8. Audit actual outputs/evidence independently from executor prose.
9. On completion, run self-evaluation and route justified improvements to overlays/feedback through woia-core.

## Shared customer data

`woia-customer-data` is a shared organization capability, not Marketing-owned data.

- Prefer references such as `customer:123` or segment refs.
- Request only minimum fields needed.
- Read access does not imply update/delete/export authority.
- Do not copy canonical CRM/customer records into Project state.

## Creative auxiliary

`woia-comfyui-local` may be added only when the Task requires a generated/edited asset, editable ComfyUI workflow, or specific media fixture.

Installed/available ComfyUI, GPU or local models alone are not a trigger.

## Audit

Auditor identity/thread must be independent from Executor.

For creative/content deliverables, audit against the approved strategy/brief/channel constraints and inspect actual artifacts.
For channel execution, audit exact target/channel/configuration/effect evidence and confirm authorization boundaries.
For analytics, distinguish observed metrics from inference and document attribution/data limitations.

Never mark a Marketing gate satisfied from a root summary alone.
