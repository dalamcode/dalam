export * from "./client.js"
export * from "./server.js"

import { createDalamClient } from "./client.js"
import { createDalamServer } from "./server.js"
import type { ServerOptions } from "./server.js"

export * as data from "./data.js"

export async function createDalam(options?: ServerOptions) {
  const server = await createDalamServer({
    ...options,
  })

  const client = createDalamClient({
    baseUrl: server.url,
  })

  return {
    client,
    server,
  }
}
