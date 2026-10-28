/**
 * DDSketch (Masson, Rim, Lee 2019): quantiles with a guaranteed relative error.
 * Values map to logarithmic buckets; a bucket's representative is within `alpha`
 * of every value in it. Sketches merge by adding bucket counts, which is what
 * lets the server store them as atomic Redis counters with no read-modify-write.
 */
export const ALPHA = 0.01;
const GAMMA = (1 + ALPHA) / (1 - ALPHA);
const LOG_GAMMA = Math.log(GAMMA);

export interface Sketch {
  /** bucket index -> count */
  buckets: Map<number, number>;
  zero: number;
  count: number;
}

export const emptySketch = (): Sketch => ({ buckets: new Map(), zero: 0, count: 0 });

/** Bucket index for a positive value, or null for zero (kept in a separate counter). */
export function bucketOf(value: number): number | null {
  if (!(value > 0)) return null;
  return Math.ceil(Math.log(value) / LOG_GAMMA);
}

const representative = (index: number) => (2 * Math.pow(GAMMA, index)) / (GAMMA + 1);

export function add(sketch: Sketch, value: number, times = 1): Sketch {
  const index = bucketOf(value);
  if (index === null) sketch.zero += times;
  else sketch.buckets.set(index, (sketch.buckets.get(index) ?? 0) + times);
  sketch.count += times;
  return sketch;
}

export function merge(into: Sketch, other: Sketch): Sketch {
  into.zero += other.zero;
  into.count += other.count;
  for (const [index, n] of other.buckets) into.buckets.set(index, (into.buckets.get(index) ?? 0) + n);
  return into;
}

/** The q-quantile (lower rank) within ALPHA relative error, or null for an empty sketch. */
export function quantile(sketch: Sketch, q: number): number | null {
  if (sketch.count === 0) return null;
  const rank = Math.floor(q * (sketch.count - 1));
  let seen = sketch.zero;
  if (seen > rank) return 0;
  for (const index of [...sketch.buckets.keys()].sort((a, b) => a - b)) {
    seen += sketch.buckets.get(index)!;
    if (seen > rank) return representative(index);
  }
  return representative(Math.max(...sketch.buckets.keys()));
}
