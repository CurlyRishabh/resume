// Fails the build when any route ships more gzipped JavaScript than its budget allows.
// Run after `next build`. Budgets live in budget.json so the X-ray panel can show them too.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const root = process.cwd();
const budget = JSON.parse(readFileSync(join(root, "budget.json"), "utf8"));
const { pages } = JSON.parse(readFileSync(join(root, ".next/app-build-manifest.json"), "utf8"));

const IGNORED = new Set(["/layout", "/_not-found/page"]);
const gzipKb = (file) => gzipSync(readFileSync(join(root, ".next", file))).length / 1024;

const rows = [];
let failed = false;

for (const [route, files] of Object.entries(pages)) {
  if (IGNORED.has(route) || route.endsWith("/route")) continue;
  const js = [...new Set([...(pages["/layout"] ?? []), ...files])].filter((f) => f.endsWith(".js"));
  const size = js.reduce((sum, f) => sum + gzipKb(f), 0);
  const limit = budget.routes[route];
  const status = limit === undefined ? "NO BUDGET" : size > limit ? "OVER" : "ok";
  if (status !== "ok") failed = true;
  rows.push({ route, "gzip KB": size.toFixed(1), "budget KB": limit ?? "-", status });
}

console.table(rows);
if (failed) {
  console.error("\nJS budget check failed. Every route needs an entry in budget.json and must stay under it.");
  process.exit(1);
}
console.log("JS budget check passed.");
