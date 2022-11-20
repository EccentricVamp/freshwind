import { TwindConfig } from "@twind/core";
import { install } from "./shared.ts";

export default function hydrate(config: TwindConfig) {
  install(config);
}
