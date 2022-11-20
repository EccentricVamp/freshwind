import { Plugin } from "$fresh/server.ts";
import { stringify, TwindConfig } from "@twind/core";
import { setup, STYLE_ELEMENT_ID } from "./shared.ts";

export default function freshwind(
  config: TwindConfig,
  configURL: string,
): Plugin {
  const instance = setup(config);
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
      const cssText = stringify(instance.target);
      const scripts = [];
      if (res.requiresHydration) {
        scripts.push({ entrypoint: "main", state: [] });
      }
      return {
        scripts,
        styles: [{ cssText, id: STYLE_ELEMENT_ID }],
      };
    },
  };
}
