import * as BaseUI from "@base-ui/react/separator";
import React from "react";
import { mergeProps, tw } from "../../lib/utils";

export type SeparatorProps = BaseUI.SeparatorProps;

/**
 * A horizontal or vertical divider between groups of content, announced to
 * screen readers as a separator.
 */
export function Separator(props: SeparatorProps) {
  return (
    <BaseUI.Separator
      {...mergeProps(props, {
        className: tw(
          "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        ),
      })}
    />
  );
}
