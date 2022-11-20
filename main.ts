import { getSheet, TwindConfig } from "@twind/core";
import { setup, STYLE_ELEMENT_ID } from "./shared.ts";

export default function hydrate(config: TwindConfig) {
  const sheet = getSheet();
  // @ts-ignore Hack
  sheet.target = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement;
  setup(config, sheet);
}
