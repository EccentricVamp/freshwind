import { Plugin } from "fresh/server.ts";
import { setup, tw, TwindUserConfig } from "twind";

export const STYLE_ELEMENT_ID = "__FRSH_TWIND";

export default function twind(config: TwindUserConfig): Plugin {
  setup(config);
  return {
    name: "twind",
    render(ctx) {
      tw.clear();
      ctx.render();
      const cssText = [...tw.target].join("\n");
      return {
        styles: [{ cssText, id: STYLE_ELEMENT_ID }],
      };
    },
  };
}
