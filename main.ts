import { dom } from "@twind/core";
import { FreshwindConfig, setup, STYLE_ELEMENT_ID } from "./shared.ts";

export default function hydrate(config: FreshwindConfig) {
  const sheet = dom(
    document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement,
  );
  setup(config.twind, sheet);
}
