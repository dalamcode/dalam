import { Config, ConfigProvider, Context, Effect, Layer, Option } from "effect"
import { ConfigService } from "@/effect/config-service"

const bool = (name: string) => Config.boolean(name).pipe(Config.withDefault(false))
const positiveInteger = (name: string) =>
  Config.number(name).pipe(
    Config.map((value) => (Number.isInteger(value) && value > 0 ? value : undefined)),
    Config.orElse(() => Config.succeed(undefined)),
  )
const experimental = bool("DALAM_EXPERIMENTAL")
const enabledByExperimental = (name: string) =>
  Config.all({ experimental, enabled: Config.boolean(name).pipe(Config.option) }).pipe(
    Config.map((flags) => Option.getOrElse(flags.enabled, () => flags.experimental)),
  )

export class Service extends ConfigService.Service<Service>()("@dalam/RuntimeFlags", {
  autoShare: bool("DALAM_AUTO_SHARE"),
  pure: bool("DALAM_PURE"),
  disableDefaultPlugins: bool("DALAM_DISABLE_DEFAULT_PLUGINS"),
  disableEmbeddedWebUi: bool("DALAM_DISABLE_EMBEDDED_WEB_UI"),
  disableExternalSkills: bool("DALAM_DISABLE_EXTERNAL_SKILLS"),
  disableLspDownload: bool("DALAM_DISABLE_LSP_DOWNLOAD"),
  disableClaudeCodePrompt: Config.all({
    broad: bool("DALAM_DISABLE_CLAUDE_CODE"),
    direct: bool("DALAM_DISABLE_CLAUDE_CODE_PROMPT"),
  }).pipe(Config.map((flags) => flags.broad || flags.direct)),
  disableClaudeCodeSkills: Config.all({
    broad: bool("DALAM_DISABLE_CLAUDE_CODE"),
    direct: bool("DALAM_DISABLE_CLAUDE_CODE_SKILLS"),
  }).pipe(Config.map((flags) => flags.broad || flags.direct)),
  enableExa: Config.all({
    experimental,
    enabled: bool("DALAM_ENABLE_EXA"),
    legacy: bool("DALAM_EXPERIMENTAL_EXA"),
  }).pipe(Config.map((flags) => flags.experimental || flags.enabled || flags.legacy)),
  enableParallel: Config.all({
    enabled: bool("DALAM_ENABLE_PARALLEL"),
    legacy: bool("DALAM_EXPERIMENTAL_PARALLEL"),
  }).pipe(Config.map((flags) => flags.enabled || flags.legacy)),
  enableExperimentalModels: bool("DALAM_ENABLE_EXPERIMENTAL_MODELS"),
  enableQuestionTool: bool("DALAM_ENABLE_QUESTION_TOOL"),
  experimentalReferences: enabledByExperimental("DALAM_EXPERIMENTAL_REFERENCES"),
  experimentalBackgroundSubagents: enabledByExperimental("DALAM_EXPERIMENTAL_BACKGROUND_SUBAGENTS"),
  experimentalLspTy: bool("DALAM_EXPERIMENTAL_LSP_TY"),
  experimentalLspTool: enabledByExperimental("DALAM_EXPERIMENTAL_LSP_TOOL"),
  experimentalOxfmt: enabledByExperimental("DALAM_EXPERIMENTAL_OXFMT"),
  experimentalPlanMode: enabledByExperimental("DALAM_EXPERIMENTAL_PLAN_MODE"),
  experimentalCodeMode: enabledByExperimental("DALAM_EXPERIMENTAL_CODE_MODE"),
  experimentalEventSystem: enabledByExperimental("DALAM_EXPERIMENTAL_EVENT_SYSTEM"),
  experimentalWorkspaces: enabledByExperimental("DALAM_EXPERIMENTAL_WORKSPACES"),
  experimentalIconDiscovery: enabledByExperimental("DALAM_EXPERIMENTAL_ICON_DISCOVERY"),
  outputTokenMax: positiveInteger("DALAM_EXPERIMENTAL_OUTPUT_TOKEN_MAX"),
  bashDefaultTimeoutMs: positiveInteger("DALAM_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS"),
  experimentalNativeLlm: bool("DALAM_EXPERIMENTAL_NATIVE_LLM"),
  experimentalWebSockets: bool("DALAM_EXPERIMENTAL_WEBSOCKETS"),
  client: Config.string("DALAM_CLIENT").pipe(Config.withDefault("cli")),
}) {}

export type Info = Context.Service.Shape<typeof Service>

const emptyConfigLayer = Service.layer.pipe(
  Layer.provide(ConfigProvider.layer(ConfigProvider.fromUnknown({}))),
  Layer.orDie,
)

export const layer = (overrides: Partial<Info> = {}) =>
  Layer.effect(
    Service,
    Effect.gen(function* () {
      const flags = yield* Service
      return Service.of({ ...flags, ...overrides })
    }),
  ).pipe(Layer.provide(emptyConfigLayer))

export const node = LayerNode.make({ service: Service, layer: Service.layer.pipe(Layer.orDie), deps: [] })

export * as RuntimeFlags from "./runtime-flags"
import { LayerNode } from "@uthakkan/core/effect/layer-node"
