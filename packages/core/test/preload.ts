import path from "path"

process.env.DALAM_DB = ":memory:"
process.env.DALAM_MODELS_PATH = path.join(import.meta.dir, "plugin", "fixtures", "models-dev.json")
process.env.DALAM_DISABLE_MODELS_FETCH = "true"
