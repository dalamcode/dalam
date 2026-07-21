#!/usr/bin/env bun
/**
 * Lint check: reject raw `.isComposing` property access outside the
 * shared `ime.ts` utility (and its test).
 *
 * All keyboard-event handlers MUST use the `isImeEvent(event)` helper
 * from `@uthakkan/ui/ime` which combines the standard `isComposing`
 * check with the legacy `keyCode === 229` fallback.
 */

import { Glob } from "bun"

const ALLOWED = new Set([
  "packages/ui/src/ime.ts",
  "packages/ui/src/ime.test.ts",
  "script/no-raw-iscomposing.ts",
])

const files = await Array.fromAsync(
  new Glob("**/*.{ts,tsx}").scan({
    absolute: false,
  }),
)

const RE = /\.isComposing\b/

let failed = false

for (const file of files) {
  if (file.includes("node_modules")) continue
  if (file.includes("/dist/")) continue
  if (ALLOWED.has(file)) continue

  const content = await Bun.file(file).text()
  const lines = content.split("\n")

  for (let i = 0; i < lines.length; i++) {
    if (RE.test(lines[i])) {
      console.error(`  ${file}:${i + 1}  ${lines[i].trim()}`)
      failed = true
    }
  }
}

if (failed) {
  console.error(
    "\n\x1b[31mERROR: Raw `.isComposing` detected in files above.\n" +
      "All keyboard-event handlers must use the shared `isImeEvent(event)` helper\n" +
      "from `@uthakkan/ui/ime` instead of accessing `event.isComposing` directly.\x1b[0m",
  )
  process.exit(1)
}

console.log("\x1b[32m✓ No raw `.isComposing` usage outside allowed files.\x1b[0m")
