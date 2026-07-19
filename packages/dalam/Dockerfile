FROM oven/bun:latest AS builder
WORKDIR /app
COPY package.json bun.lock .
COPY packages/ packages/
RUN bun install --frozen-lockfile --workspaces
WORKDIR /app/packages/dalam
RUN bun ./script/generate.ts
RUN bun ./script/build.ts --skip-embed-web-ui --skip-install

FROM alpine AS base
ARG BUN_RUNTIME_TRANSPILER_CACHE_PATH=0
ENV BUN_RUNTIME_TRANSPILER_CACHE_PATH=${BUN_RUNTIME_TRANSPILER_CACHE_PATH}
RUN apk add libgcc libstdc++ ripgrep

FROM base AS build-amd64
COPY --from=builder /app/packages/dalam/dist/dalam-linux-x64-baseline-musl/bin/dalam /usr/local/bin/dalam

FROM base AS build-arm64
COPY --from=builder /app/packages/dalam/dist/dalam-linux-arm64-musl/bin/dalam /usr/local/bin/dalam

FROM build-${TARGETARCH}
RUN dalam --version
ENTRYPOINT ["dalam"]
