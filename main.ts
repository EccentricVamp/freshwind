import { dom } from "twind";
import { FreshwindUserConfig, setup, STYLE_ELEMENT_ID } from "./shared.ts";

export default function hydrate(options: FreshwindUserConfig) {
  const sheet = dom(
    document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement,
  );
  setup(options, sheet);
}
