import { defineConfig } from "electron-vite"
import appPlugin from "@uthakkan/app/vite"
import * as fs from "node:fs/promises"
import * as path from "node:path"

const DALAM_SERVER_DIST = "../dalam/dist/node"

const channel = (() => {
  const raw = process.env.DALAM_CHANNEL
  if (raw === "dev" || raw === "beta" || raw === "prod") return raw
  if (process.env.DALAM_CHANNEL === "latest") return "prod"
  return "dev"
})()

const nodePtyPkg = `@lydell/node-pty-${process.platform}-${process.arch}`

export default defineConfig({
  main: {
    define: {
      "import.meta.env.DALAM_CHANNEL": JSON.stringify(channel),
    },
    build: {
      rollupOptions: {
        input: { index: "src/main/index.ts", sidecar: "src/main/sidecar.ts" },
        // Keep this identical to electron-vite's Node 20.11+ shim. Its regex insertion can
        // corrupt bundled TypeScript, while a Rollup banner places the shim safely.
        output: {
          banner: `
// -- CommonJS Shims --
import __cjs_mod__ from 'node:module';
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require = __cjs_mod__.createRequire(import.meta.url);
`,
        },
      },
      externalizeDeps: { include: [nodePtyPkg] },
    },
    plugins: [
      {
        name: "dalam:node-pty-narrower",
        enforce: "pre",
        resolveId(s) {
          if (s === "@lydell/node-pty") return nodePtyPkg
        },
      },
      {
        name: "dalam:virtual-server-module",
        enforce: "pre",
        resolveId(id) {
          if (id === "virtual:dalam-server") return this.resolve(`${DALAM_SERVER_DIST}/node.js`)
        },
      },
      {
        name: "dalam:copy-server-assets",
        async writeBundle() {
          for (const l of await fs.readdir(DALAM_SERVER_DIST)) {
            if (!l.endsWith(".wasm")) continue
            await fs.writeFile(`./out/main/chunks/${l}`, await fs.readFile(`${DALAM_SERVER_DIST}/${l}`))
          }
        },
      },
    ],
  },
  preload: {
    build: {
      rollupOptions: {
        input: { index: "src/preload/index.ts" },
        output: {
          format: "cjs",
          entryFileNames: "[name].js",
        },
      },
    },
  },
  renderer: {
    plugins: [
      appPlugin,
      {
        name: "dalam:pet-assets",
        configureServer(server) {
          const petsDir = path.resolve(__dirname, "pets")
          server.middlewares.use("/pets", (req, res, next) => {
            const url = req.url ?? ""
            const ext = path.extname(url).toLowerCase()
            if (ext !== ".webp" && ext !== ".png") return next()
            const safe = url.replace(/\.\./g, "").replace(/[<>"|]/g, "")
            const filePath = path.join(petsDir, safe)
            if (filePath.startsWith(petsDir)) {
              return void (async () => {
                try {
                  const data = await fs.readFile(filePath)
                  const types: Record<string, string> = { ".webp": "image/webp", ".png": "image/png" }
                  res.setHeader("Content-Type", types[ext] ?? "application/octet-stream")
                  res.end(data)
                } catch {
                  res.statusCode = 404
                  res.end()
                }
              })()
            }
            next()
          })
        },
      },
    ],
    publicDir: "../../../app/public",
    root: "src/renderer",
    build: {
      sourcemap: true,
      rollupOptions: {
        input: {
          main: "src/renderer/index.html",
        },
      },
    },
  },
})
