import { Layer, ManagedRuntime } from "effect"
import { AppNodeBuilder } from "@uthakkan/core/effect/app-node-builder"
import { LayerNode } from "@uthakkan/core/effect/layer-node"

import { Plugin } from "@/plugin"
import { LSP } from "@/lsp/lsp"
import { Format } from "@/format"

import { Vcs } from "@/project/vcs"
import { Snapshot } from "@/snapshot"
import { Config } from "@/config/config"
import { Observability } from "@uthakkan/core/observability"
import { memoMap } from "@uthakkan/core/effect/memo-map"

export const BootstrapLayer = AppNodeBuilder.build(
  LayerNode.group([Config.node, Plugin.node, Format.node, LSP.node, Vcs.node, Snapshot.node]),
).pipe(Layer.provide(Observability.layer))

export const BootstrapRuntime = ManagedRuntime.make(BootstrapLayer, { memoMap })
