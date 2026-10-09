# AGENTS.md — WOIA Marketing

- Use woia-core for Project bootstrap, provider lifecycle, Task/TaskCell, OPEA-H, receipts, effects, overlays, updates and custom-agent runtime bindings.
- Keep Marketing methodology here; do not duplicate Core mechanics.
- Select capabilities from current Task evidence rather than forcing every Marketing Task through every provider.
- Public/paid/external actions require their applicable authority/human boundary.
- Shared customer data stays in its system of record and is accessed through woia-customer-data references/operations.
- ComfyUI is triggered only by a concrete requested creative asset/edit/workflow/fixture need.
- Auditor identity must remain independent from Executor identity even when both inspect the same artifact/provider evidence.
- Every substantial run self-evaluates and may create ImprovementCandidates; consumers never self-publish upstream plugin changes.

## Operation
Require WOIA Core 0.5.7 or later for Tasks, accepted resource/source bindings and effect reconciliation. Marketing owns public, non-person, non-paid execution. Paid campaign/targeting/spend routes to Ads; external-person contact and appointment mutation route to Customer Service through Communications/Scheduling. Skills never dispatch those effects directly. Existing provider identities and proportional OPEA-H methodology remain stable.

The routing helper consumes a separate trusted host context containing accepted Task/scope, effective Source Authority Map and competent accepted evidence references. The host must obtain that context independently of model/request input and validate its current bindings before delegation. The helper selects a provider or handoff; it does not grant authority, execute effects or implement a durable writer. Provider execution still requires exact authority, immutable version/evidence, idempotency and reconciliation-before-retry for UNKNOWN. CRM is an optional adapter, never identity/business-state master.
