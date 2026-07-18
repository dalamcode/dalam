import { getComponentCatalogue } from "@opentui/solid/components"
import { registerSpinner } from "opentui-spinner/solid"

export function registerDalamSpinner() {
  if (!getComponentCatalogue().spinner) registerSpinner()
}
