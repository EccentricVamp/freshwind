import { Plugin } from "$fresh/server.ts";
import { extract, TwindConfig } from "@twind/core";
import { install, STYLE_ELEMENT_ID } from "./shared.ts";

export default function freshwind(
  config: TwindConfig,
  configURL: string,
): Plugin {
  install(config);
  const main = `data:application/javascript,import hydrate from "${
    new URL("./main.ts", import.meta.url).href
  }";
import config from "${configURL}";
export default function() { hydrate(config); }`;
  return {
    name: "freshwind",
    entrypoints: { "main": main },
    render(ctx) {
      const res = ctx.render();
      const { css } = extract(res.htmlText);
      const scripts = [];
      if (res.requiresHydration) {
        scripts.push({ entrypoint: "main", state: [] });
      }
      return {
        scripts,
        styles: [{ cssText: css, id: STYLE_ELEMENT_ID }],
      };
    },
  };
}
