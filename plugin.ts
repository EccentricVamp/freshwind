import { Plugin } from "$fresh/server.ts";
import { setup, stringify } from "twind";
import { FreshwindUserConfig, STYLE_ELEMENT_ID } from "./shared.ts";

export default function twind(config: FreshwindUserConfig): Plugin {
  const instance = setup(config);
  const main = `data:application/javascript,import hydrate from "${
    new URL("./main.ts", import.meta.url).href
  }";
import config from "${config.selfURL}";
export default function() { hydrate(config); }`;
  return {
    name: "twind",
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
