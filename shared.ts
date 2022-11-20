import { options as preactOptions, VNode } from "preact";
import {
  getSheet,
  setup as twSetup,
  Sheet,
  tw,
  TwindConfig,
} from "@twind/core";

export const STYLE_ELEMENT_ID = "__FRSH_TWIND";

export function setup(config: TwindConfig, sheet: Sheet = getSheet()) {
  const instance = twSetup(config, sheet);
  const originalHook = preactOptions.vnode;

  preactOptions.vnode = (
    vnode: VNode<{ class?: string; className?: string }>,
  ) => {
    if (typeof vnode.type === "string" && typeof vnode.props === "object") {
      const { props } = vnode;
      const classes: string[] = [];
      if (props.class) {
        classes.push(tw(props.class));
        props.class = undefined;
      }
      if (props.className) {
        classes.push(tw(props.className));
      }
      if (classes.length) {
        props.class = classes.join(" ");
      }
    }

    originalHook?.(vnode);
  };

  return instance;
}
