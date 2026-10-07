// Routing decision only. Core and the selected provider retain authority/effect execution.
export function routeMarketingWork(request, acceptedContext) {
  const blocked = (reason) => ({ result: 'BLOCKED', reason });
  if (!request || !acceptedContext || acceptedContext.department !== 'marketing') return blocked('MARKETING_CONTEXT_REQUIRED');
  if (!acceptedContext.task_ref || !acceptedContext.scope_ref || !acceptedContext.source_authority_map_ref) return blocked('ACCEPTED_CONTEXT_REQUIRED');
  if (request.task_ref !== acceptedContext.task_ref || request.scope_ref !== acceptedContext.scope_ref) return blocked('SCOPE_MISMATCH');
  if (!Array.isArray(acceptedContext.accepted_evidence_refs) || !acceptedContext.accepted_evidence_refs.includes(request.evidence_ref)) return blocked('COMPETENT_ACCEPTANCE_REQUIRED');
  if (request.observation_state !== 'CONFIRMED') return blocked('UNKNOWN_REQUIRES_RECONCILIATION');
  if (request.intent === 'paid') return { result: 'HANDOFF_REQUIRED', owner: 'ads', provider: 'woia-ads-platforms', executed: false };
  if (request.intent === 'person-contact' || request.intent === 'appointment-mutation') return { result: 'HANDOFF_REQUIRED', owner: 'customer-service', provider: request.intent === 'person-contact' ? 'woia-communications' : 'woia-scheduling', executed: false };
  const providers = { strategy: 'woia-marketing-strategy', audience: 'woia-marketing-audience', copy: 'woia-marketing-content-copy', creative: 'woia-marketing-creative', analytics: 'woia-marketing-analytics', public: 'woia-marketing-channel-execution' };
  if (!Object.hasOwn(providers, request.intent)) return blocked('UNSUPPORTED_INTENT');
  if (request.intent === 'public' && (request.recipient_kind !== 'public-non-person' || !request.approved_content_ref || !acceptedContext.accepted_evidence_refs.includes(request.approved_content_ref))) return blocked('APPROVED_PUBLIC_CONTENT_REQUIRED');
  return { result: 'PROVIDER_SELECTED', owner: 'marketing', provider: providers[request.intent], executed: false };
}
