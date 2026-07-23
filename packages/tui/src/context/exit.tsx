import { createSimpleContext } from "./helper"

export type Exit = (reason?: unknown) => void

// oxlint-disable-next-line typescript-eslint/unbound-method
export const { use: useExit, provider: ExitProvider } = createSimpleContext({
  name: "Exit",
  init: (input: { exit: Exit }) => input.exit,
})
