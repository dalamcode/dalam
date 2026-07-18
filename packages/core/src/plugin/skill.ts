/// <reference path="../markdown.d.ts" />

export * as SkillPlugin from "./skill"

import { define } from "./internal"
import { Effect } from "effect"
import { AbsolutePath } from "../schema"
import { SkillV2 } from "../skill"
import customizeDalamContent from "./skill/customize-dalam.md" with { type: "text" }

export const CustomizeDalamContent = customizeDalamContent

export const Plugin = define({
  id: "skill",
  effect: Effect.fn(function* (ctx) {
    yield* ctx.skill.transform((draft) => {
      draft.source(
        SkillV2.EmbeddedSource.make({
          type: "embedded",
          skill: SkillV2.Info.make({
            name: "customize-dalam",
            description:
              "Use ONLY when the user is editing or creating dalam's own configuration: dalam.json, dalam.jsonc, files under .dalam/, or files under ~/.config/dalam/. Also use when creating or fixing dalam agents, subagents, commands, skills, plugins, MCP servers, or permission rules. Do not use for the user's own application code, or for any project that is not configuring dalam itself.",
            location: AbsolutePath.make("/builtin/customize-dalam.md"),
            content: CustomizeDalamContent,
          }),
        }),
      )
    })
  }),
})
