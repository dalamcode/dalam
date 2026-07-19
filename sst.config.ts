/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "dalam",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    }
  },
  async run() {
    // TODO: Define SST resources for production infrastructure.
    // Previously managed outside this repo – re-add as needed.
  },
})
