import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { isDeepStrictEqual } from 'node:util';
import { routeMarketingWork } from './route-work.mjs';

const plugin = JSON.parse(readFileSync(new URL('../../../plugin.json', import.meta.url), 'utf8'));
const text = value => typeof value === 'string' && value.trim().length > 0;
const revision = value => text(value) || (Number.isSafeInteger(value) && value > 0);
const reference = value => text(value) || (value && text(value.kind) && text(value.id));
export const SLOTS = Object.freeze(['source-resolution', 'content-domain-validation', 'channel-effect-policy', 'outcome-evidence']);
export const requestDigest = request => createHash('sha256').update(JSON.stringify(request)).digest('hex');

/** Generic coordination evaluation. A specialization may narrow these slots only.
 * Context is independently resolved by the host; this function performs no effects.
 */
export function evaluateMethodology(request, host) {
  const noEffects = { dispatch_performed: false, authority_granted: false, fact_written: false, task_written: false };
  const blockers = [];
  if (!request || !host) return { result: 'BLOCKED', blockers: ['TRUSTED_CONTEXT_REQUIRED'], ...noEffects };
  if (!text(host.org_id) || !reference(host.snapshot_ref) || !revision(host.binding_revision) || !revision(host.source_map_revision) || host.current !== true) blockers.push('CURRENT_BOUND_CONTEXT_REQUIRED');
  if (request.org_id !== host.org_id || !isDeepStrictEqual(request.task_ref, host.task_ref) || !isDeepStrictEqual(request.scope_ref, host.scope_ref) || !isDeepStrictEqual(request.snapshot_ref, host.snapshot_ref)) blockers.push('BOUND_SCOPE_REQUIRED');
  const route = routeMarketingWork(request, host);
  if (route.result === 'BLOCKED') blockers.push(route.reason);
  if (route.result === 'HANDOFF_REQUIRED') return { ...route, result: blockers.length ? 'BLOCKED' : route.result, blockers, ...noEffects };
  return {
    result: blockers.length ? 'BLOCKED' : 'METHOD_ELIGIBLE', blockers,
    task_ref: structuredClone(request.task_ref), scope_ref: structuredClone(request.scope_ref),
    org_id: request.org_id, snapshot_ref: host.snapshot_ref, binding_revision: host.binding_revision,
    source_map_revision: host.source_map_revision, request_sha256: requestDigest(request),
    base: { plugin: plugin.name, version: plugin.version }, exported_slots: [...SLOTS],
    provider: route.provider ?? null, ...noEffects,
  };
}
