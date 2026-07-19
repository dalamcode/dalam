import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dir = path.resolve(__dirname, "..")

process.chdir(dir)

const modelsUrl = process.env.DALAM_MODELS_URL || "https://models.dev"
export const modelsData = process.env.MODELS_DEV_API_JSON
  ? await Bun.file(process.env.MODELS_DEV_API_JSON).text()
  : process.env.MODELS_DEV_API_JSON_DATA
    ? process.env.MODELS_DEV_API_JSON_DATA
    : await fetch(`${modelsUrl}/api.json`).then((x) => x.text()).catch(() => {
      console.warn("Unable to reach models.dev; using empty models data")
      return "[]"
    })
console.log("Loaded models.dev snapshot")
