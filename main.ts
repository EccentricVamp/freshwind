import { getSheet } from "twind";
import { FreshwindUserConfig, setup, STYLE_ELEMENT_ID } from "./shared.ts";

export default function hydrate(options: FreshwindUserConfig) {
  const sheet = getSheet(true, false);
  // @ts-ignore Remove this once Twind plays nice with islands
  sheet.target = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement;
  setup(options, sheet);
}
