import * as BaseUI from "@base-ui/react/toggle";
import React from "react";
import { mergeProps } from "../../lib/utils";
import { ButtonSize, buttonStyles } from "../button";

export interface ToggleProps<
  T extends string = string,
> extends BaseUI.ToggleProps<T> {
  size?: ButtonSize;
  compact?: boolean;
}

export function Toggle<T extends string = string>(props: ToggleProps<T>) {
  const { size = "md", compact, ...restProps } = props;

  return (
    <BaseUI.Toggle
      {...mergeProps(restProps, {
        className: (state: BaseUI.Toggle.State) =>
          toggleStyles({ pressed: state.pressed, size, compact }),
      })}
    />
  );
}

export const toggleStyles = ({
  pressed,
  size = "md",
  compact,
}: {
  pressed: boolean;
  size?: ButtonSize;
  compact?: boolean;
}) =>
  buttonStyles({
    variant: pressed ? "primary" : "tertiary",
    size,
    compact,
  });
