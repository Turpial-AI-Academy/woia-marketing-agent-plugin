import assert from 'node:assert/strict';
import test from 'node:test';
import { evaluateMethodology, SLOTS } from '../skills/marketing-orchestration/scripts/evaluate-methodology.mjs';

function fixture(intent = 'strategy') {
  const task_ref = { kind: 'Task', id: 'task:synthetic', revision: 1 }, scope_ref = 'marketing.channel-execution', snapshot_ref = { kind: 'OrchestratorCompositionSnapshot', id: 'snapshot:synthetic', digest: `sha256:${'a'.repeat(64)}` };
  const request = { org_id: 'org:synthetic', task_ref, scope_ref, snapshot_ref, intent, evidence_ref: 'evidence:synthetic', observation_state: 'CONFIRMED' };
  const host = { current: true, org_id: request.org_id, department: 'marketing', task_ref: structuredClone(task_ref), scope_ref, snapshot_ref: structuredClone(snapshot_ref), binding_revision: 1, source_map_revision: 1, source_authority_map_ref: 'source-map:synthetic', accepted_evidence_refs: [request.evidence_ref] };
  return { request, host };
}

test('generic strategy evaluates without domain provider or sector context', () => {
  const { request, host } = fixture(), result = evaluateMethodology(request, host);
  assert.equal(result.result, 'METHOD_ELIGIBLE');
  assert.equal(result.provider, 'woia-marketing-strategy');
  assert.deepEqual(result.exported_slots, SLOTS);
  assert.equal(result.dispatch_performed, false);
});

test('owned handoffs remain scoped and do not route root user interaction externally', () => {
  for (const [intent, owner, provider] of [['paid', 'ads', 'woia-ads-platforms'], ['person-contact', 'customer-service', 'woia-communications'], ['appointment-mutation', 'customer-service', 'woia-scheduling']]) {
    const { request, host } = fixture(intent), result = evaluateMethodology(request, host);
    assert.equal(result.result, 'HANDOFF_REQUIRED'); assert.equal(result.owner, owner); assert.equal(result.provider, provider); assert.equal(result.dispatch_performed, false);
  }
  const { request, host } = fixture('strategy');
  request.interaction = 'current-root-user';
  assert.equal(evaluateMethodology(request, host).provider, 'woia-marketing-strategy');
});

test('source conflicts, stale scopes and unapproved public content block generic routing', () => {
  for (const mutate of [input => { input.request.observation_state = 'UNKNOWN'; }, input => { input.host.current = false; }, input => { input.request.task_ref.revision = 2; }, input => { input.request.snapshot_ref.id = 'snapshot:other'; }, input => { input.request.intent = 'public'; input.request.recipient_kind = 'public-non-person'; }]) {
    const input = fixture(); mutate(input); assert.equal(evaluateMethodology(input.request, input.host).result, 'BLOCKED');
  }
});
