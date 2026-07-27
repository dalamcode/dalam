import { Config, Effect, Layer, Schema, Stream } from "effect"
import { LLM, LLMClient, Message, Tool, ToolRuntime } from "@uthakkan/llm"
import { RequestExecutor, WebSocketExecutor } from "@uthakkan/llm/route"
import { OpenAI } from "@uthakkan/llm/providers"

/**
 * A runnable walkthrough of the LLM package use-site API.
 *
 * Run from `packages/llm` with an OpenAI key in the environment:
 *
 *   OPENAI_API_KEY=... bun example/tutorial.ts
 *
 * The file is intentionally written as a normal TypeScript program. You can
 * hover imports and local values to see how the public API is typed.
 */

const apiKey = Config.redacted("OPENAI_API_KEY")

// 1. Pick a model. The provider helper records provider identity, protocol
// choice, capabilities, deployment options, authentication, and defaults.
const model = OpenAI.configure({
  apiKey,
  generation: { maxTokens: 160 },
  providerOptions: {
    openai: { store: false },
  },
}).model("gpt-4o-mini")

// 2. Tools are typed with Effect Schema. Provider turns remain explicit:
// advertise definitions on the request, stream one turn, dispatch local calls,
// then persist/build follow-up history in the enclosing product flow.
const tools = {
  get_weather: Tool.make({
    description: "Get current weather for a city.",
    parameters: Schema.Struct({ city: Schema.String }),
    success: Schema.Struct({ forecast: Schema.String }),
    execute: (input) => Effect.succeed({ forecast: `${input.city}: sunny, 72F` }),
  }),
}

const streamWithTools = Effect.gen(function* () {
  const request = LLM.request({
    model,
    prompt: "Use get_weather for San Francisco, then answer in one sentence.",
    generation: { maxTokens: 80, temperature: 0 },
    tools: Tool.toDefinitions(tools),
  })
  const events = Array.from(yield* LLM.stream(request).pipe(Stream.runCollect))
  for (const event of events) {
    if (event.type === "tool-call") console.log("tool call", event.name, event.input)
    if (event.type === "text-delta") process.stdout.write(event.text)
    if (event.type !== "tool-call" || event.providerExecuted) continue
    const dispatched = yield* ToolRuntime.dispatch(tools, event)
    console.log("tool result", event.name, dispatched.result)

    // A durable agent would persist these messages before starting another
    // raw model turn. This tutorial keeps the boundary visible instead.
    const followUp = LLM.updateRequest(request, {
      messages: [
        ...request.messages,
        Message.assistant([event]),
        Message.tool({ ...event, result: dispatched.result }),
      ],
    })
    console.log("follow-up history messages:", followUp.messages.length)
  }
})

// Provide the LLM runtime and the HTTP request executor once. Keep one path
// enabled at a time so the tutorial can demonstrate generate, prepare, stream,
// or tool-loop behavior without spending tokens on every example.
const requestExecutorLayer = RequestExecutor.fetchLayer
const llmDeps = Layer.mergeAll(requestExecutorLayer, WebSocketExecutor.layer)
const llmClientLayer = LLMClient.layer.pipe(Layer.provide(llmDeps))

const program = Effect.gen(function* () {
  yield* streamWithTools
}).pipe(Effect.provide(Layer.mergeAll(llmDeps, llmClientLayer)))

void Effect.runPromise(program)
