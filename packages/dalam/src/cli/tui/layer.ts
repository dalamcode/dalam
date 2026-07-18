import { run as runTui, type TuiInput } from "@uthakkan/tui"
import { Global } from "@uthakkan/core/global"
import { AppNodeBuilder } from "@uthakkan/core/effect/app-node-builder"
import { Effect } from "effect"

export function run(input: TuiInput) {
  return runTui(input).pipe(Effect.provide(AppNodeBuilder.build(Global.node)))
}
