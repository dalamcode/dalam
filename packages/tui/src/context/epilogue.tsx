import { createSimpleContext } from "./helper"

// oxlint-disable-next-line typescript-eslint/unbound-method
export const { use: useEpilogue, provider: EpilogueProvider } = createSimpleContext({
  name: "Epilogue",
  init: (props: { set(value?: string): void }) => (value?: string) => props.set(value),
})
