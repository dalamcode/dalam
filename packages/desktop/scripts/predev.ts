import { $ } from "bun"

await $`bun ./scripts/copy-icons.ts ${process.env.DALAM_CHANNEL ?? "dev"}`

await $`cd ../dalam && bun script/build-node.ts`
