# WOIA Marketing

WOIA Marketing is the Marketing department orchestrator for WOIA v0.5.0.

It does not impose a rigid phase sequence. Non-software persistent work is executed through WOIA Core's proportional OPEA-H profiles:

```text
O -> Orchestration
P -> Planning
E -> Execution
A -> Audit
H -> Human Review
```

WOIA Marketing supplies department methodology: capability selection, routing, deliverable/evidence expectations, cross-capability constraints and Marketing-specific review boundaries.

## Initial capabilities

- marketing-strategy
- audience
- content-copy
- creative
- channel-execution
- analytics

Shared/conditional capabilities:

- woia-customer-data
- woia-comfyui-local

## Design rule

A campaign is not automatically a fixed six-stage pipeline. The root orchestrator chooses the smallest OPEA-H profile and only the capabilities required by the actual Task.

Examples:

- internal copy draft -> task-execution;
- campaign plan -> planned-execution;
- public creative/campaign launch -> opea-h-full or audited-execution as risk requires;
- read-only performance analysis -> planned-execution or task-execution without publication authority.

## Authority

Publication, paid activation, audience/customer mutation and external communication are effects. Plugin availability never grants authority for those actions.

## Personalization

Project-specific brand voice, approved phrases, campaign conventions and local workflows belong in WOIA overlays; they never patch upstream Marketing plugins.
