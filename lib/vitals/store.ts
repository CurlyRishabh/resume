import { bucketOf, emptySketch, merge, type Sketch } from "./ddsketch";

export const METRICS = ["LCP", "INP", "CLS", "FCP", "TTFB"] as const;
export type Metric = (typeof METRICS)[number];

/** Upper bounds that reject junk without clipping real field data. */
const MAX_VALUE: Record<Metric, number> = { LCP: 60_000, INP: 60_000, CLS: 10, FCP: 60_000, TTFB: 60_000 };
const RETENTION_SECONDS = 35 * 24 * 60 * 60;

export interface VitalsStore {
  readonly kind: "upstash" | "memory";
  record(metric: Metric, value: number, day: string): Promise<void>;
  read(metric: Metric, days: string[]): Promise<Sketch>;
}

/** Validate a beacon body. Returns null for anything that is not one well-formed metric. */
export function parseVital(body: string): { metric: Metric; value: number } | null {
  if (body.length > 512) return null;
  let data: unknown;
  try {
    data = JSON.parse(body);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const { name, value, ...rest } = data as Record<string, unknown>;
  if (Object.keys(rest).length > 0) return null;
  if (typeof name !== "string" || !(METRICS as readonly string[]).includes(name)) return null;
  const metric = name as Metric;
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > MAX_VALUE[metric]) return null;
  return { metric, value };
}

export const dayKey = (date: Date) => date.toISOString().slice(0, 10);

export function lastDays(n: number, now = new Date()): string[] {
  return Array.from({ length: n }, (_, i) => dayKey(new Date(now.getTime() - i * 86_400_000)));
}

const redisKey = (metric: Metric, day: string) => `vitals:${metric}:${day}`;
const field = (value: number) => {
  const index = bucketOf(value);
  return index === null ? "z" : `b${index}`;
};

/** Rebuild a sketch from a Redis hash: { n, z, b<index>... }. */
export function sketchFromHash(hash: Record<string, string>): Sketch {
  const sketch = emptySketch();
  for (const [key, raw] of Object.entries(hash)) {
    const n = Number(raw);
    if (key === "z") sketch.zero += n;
    else if (key.startsWith("b")) sketch.buckets.set(Number(key.slice(1)), n);
  }
  sketch.count = sketch.zero + [...sketch.buckets.values()].reduce((a, b) => a + b, 0);
  return sketch;
}

export function memoryStore(): VitalsStore {
  const hashes = new Map<string, Record<string, string>>();
  return {
    kind: "memory",
    async record(metric, value, day) {
      const key = redisKey(metric, day);
      const hash = hashes.get(key) ?? {};
      const f = field(value);
      hash[f] = String(Number(hash[f] ?? 0) + 1);
      hashes.set(key, hash);
    },
    async read(metric, days) {
      return days.reduce((sketch, day) => merge(sketch, sketchFromHash(hashes.get(redisKey(metric, day)) ?? {})), emptySketch());
    },
  };
}

/** Upstash Redis over its REST API, so it works anywhere fetch does. */
export function upstashStore(url: string, token: string, fetchImpl: typeof fetch = fetch): VitalsStore {
  const pipeline = async (commands: (string | number)[][]) => {
    const res = await fetchImpl(`${url.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Upstash responded ${res.status}`);
    return (await res.json()) as { result: unknown }[];
  };

  return {
    kind: "upstash",
    async record(metric, value, day) {
      const key = redisKey(metric, day);
      // One atomic increment per sample: concurrent writers never race.
      await pipeline([
        ["HINCRBY", key, field(value), 1],
        ["EXPIRE", key, RETENTION_SECONDS],
      ]);
    },
    async read(metric, days) {
      const results = await pipeline(days.map((day) => ["HGETALL", redisKey(metric, day)]));
      return results.reduce((sketch, { result }) => {
        const flat = (result as string[] | null) ?? [];
        const hash: Record<string, string> = {};
        for (let i = 0; i < flat.length; i += 2) hash[flat[i]] = flat[i + 1];
        return merge(sketch, sketchFromHash(hash));
      }, emptySketch());
    },
  };
}

let shared: VitalsStore | undefined;

/** Upstash when configured (Vercel's integration uses the KV_* names), in-memory otherwise. */
export function getStore(): VitalsStore {
  if (shared) return shared;
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  shared = url && token ? upstashStore(url, token) : memoryStore();
  return shared;
}
