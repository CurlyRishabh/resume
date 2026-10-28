import { dayKey, getStore, parseVital } from "@/lib/vitals/store";

/**
 * Receives one Core Web Vital per beacon. Stores only a bucket counter per metric per day:
 * no raw events, no cookies, no IP addresses, no URLs or user agents.
 */
export async function POST(request: Request) {
  const optedOut = request.headers.get("sec-gpc") === "1" || request.headers.get("dnt") === "1";
  if (optedOut) return new Response(null, { status: 204 });

  const vital = parseVital(await request.text());
  if (!vital) return new Response(null, { status: 400 });

  try {
    await getStore().record(vital.metric, vital.value, dayKey(new Date()));
  } catch {
    // Telemetry must never break the site; the sample is simply dropped.
  }
  return new Response(null, { status: 204 });
}
