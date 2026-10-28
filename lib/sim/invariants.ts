import { MAX_PODS, STEPS, activePods, isSettled, paymentRetries } from "./engine";
import type { SimState } from "./types";

/**
 * The rules the engine must never break, checked over a whole run's history.
 * Returns human-readable violations; an empty list means the run is clean.
 */
export function violations(states: readonly SimState[], { expectSettled = true } = {}): string[] {
  const found: string[] = [];

  states.forEach((s, k) => {
    if (paymentRetries(s) > 0) found.push(`t=${s.t}: a payment step started twice`);
    if (activePods(s).length > MAX_PODS) found.push(`t=${s.t}: more than ${MAX_PODS} serving pods`);
    for (const order of s.orders) {
      order.steps.forEach((step, i) => {
        if ((step.status === "running" || step.status === "done") && !order.steps.slice(0, i).every((p) => p.status === "done")) {
          found.push(`t=${s.t}: ${order.id} ran ${STEPS[i].id} before an earlier step finished`);
        }
      });
    }

    const prev = states[k - 1];
    if (!prev) return;
    prev.orders.forEach((order, o) =>
      order.steps.forEach((step, i) => {
        if (step.status === "done" && s.orders[o].steps[i].status !== "done") found.push(`t=${s.t}: ${order.id} lost its ${STEPS[i].id} checkpoint`);
      }),
    );
    for (const pod of prev.pods.filter((p) => p.state === "draining")) {
      const after = s.pods.find((p) => p.id === pod.id);
      if (after && after.order !== null && after.order !== pod.order) found.push(`t=${s.t}: draining ${pod.id} took new work`);
    }
  });

  const last = states[states.length - 1];
  if (expectSettled && last && !isSettled(last)) found.push(`run did not settle by t=${last.t}`);
  return found;
}
