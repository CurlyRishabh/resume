import { describe, expect, it, vi } from "vitest";
import { quantile } from "./ddsketch";
import { lastDays, memoryStore, parseVital, upstashStore } from "./store";

describe("parseVital", () => {
  it("accepts one well-formed metric", () => {
    expect(parseVital('{"name":"LCP","value":1234.5}')).toEqual({ metric: "LCP", value: 1234.5 });
    expect(parseVital('{"name":"CLS","value":0}')).toEqual({ metric: "CLS", value: 0 });
  });

  it("rejects junk, unknown metrics, extra fields and out-of-range values", () => {
    for (const body of [
      "",
      "not json",
      "[]",
      '{"name":"LCP"}',
      '{"name":"FID","value":10}',
      '{"name":"LCP","value":-1}',
      '{"name":"LCP","value":1e9}',
      '{"name":"CLS","value":50}',
      '{"name":"LCP","value":"100"}',
      '{"name":"LCP","value":100,"url":"https://example.com"}',
      JSON.stringify({ name: "LCP", value: 1, pad: "x".repeat(600) }),
    ]) {
      expect(parseVital(body)).toBeNull();
    }
  });
});

describe("stores", () => {
  it("memory store aggregates across days", async () => {
    const store = memoryStore();
    const [today, yesterday] = lastDays(2, new Date("2026-10-28T12:00:00Z"));
    for (const v of [100, 200, 300]) await store.record("LCP", v, today);
    for (const v of [400, 500]) await store.record("LCP", v, yesterday);
    const sketch = await store.read("LCP", [today, yesterday]);
    expect(sketch.count).toBe(5);
    expect(quantile(sketch, 0.5)).toBeCloseTo(300, -1);
  });

  it("upstash store sends atomic increments and parses HGETALL replies", async () => {
    const fetchImpl = vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      const commands = JSON.parse(String(init!.body));
      const result = commands[0][0] === "HGETALL" ? commands.map(() => ({ result: ["b0", "2", "z", "1"] })) : [{ result: 1 }, { result: 1 }];
      return new Response(JSON.stringify(result), { status: 200 });
    });
    const store = upstashStore("https://example.upstash.io/", "secret", fetchImpl as typeof fetch);

    await store.record("INP", 64, "2026-10-28");
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe("https://example.upstash.io/pipeline");
    expect((init!.headers as Record<string, string>).Authorization).toBe("Bearer secret");
    const sent = JSON.parse(String(init!.body));
    expect(sent[0][0]).toBe("HINCRBY");
    expect(sent[0][1]).toBe("vitals:INP:2026-10-28");
    expect(sent[1][0]).toBe("EXPIRE");

    const sketch = await store.read("INP", ["2026-10-28", "2026-10-27"]);
    expect(sketch.count).toBe(6);
    expect(sketch.zero).toBe(2);
  });
});
