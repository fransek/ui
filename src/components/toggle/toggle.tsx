import { mergeProps as mergeBaseUIProps } from "@base-ui/react/merge-props";
import * as BaseUI from "@base-ui/react/toggle";
import React from "react";
import { mergeProps } from "../../lib/utils";
import { ButtonSize, buttonStyles } from "../button";

export interface ToggleProps<T extends string = string> extends Omit<
  BaseUI.ToggleProps<T>,
  "children"
> {
  size?: ButtonSize;
  compact?: boolean;
  /** Content of the toggle, or a function of its state to render different content when pressed. */
  children?:
    React.ReactNode | ((state: BaseUI.Toggle.State) => React.ReactNode);
}

export function Toggle<T extends string = string>(props: ToggleProps<T>) {
  const { size = "md", compact, children, render, ...restProps } = props;

  return (
    <BaseUI.Toggle
      render={
        typeof children === "function"
          ? (renderProps, state) => {
              const propsWithChildren = {
                ...renderProps,
                children: children(state),
              };
              if (typeof render === "function") {
                return render(propsWithChildren, state);
              }
              if (render) {
                return React.cloneElement(
                  render,
                  mergeBaseUIProps(
                    propsWithChildren,
                    render.props as React.ComponentProps<"button">,
                  ),
                );
              }
              return <button {...propsWithChildren} />;
            }
          : render
      }
      {...mergeProps(restProps, {
        className: (state: BaseUI.Toggle.State) =>
          toggleStyles({ pressed: state.pressed, size, compact }),
      })}
    >
      {typeof children === "function" ? undefined : children}
    </BaseUI.Toggle>
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
