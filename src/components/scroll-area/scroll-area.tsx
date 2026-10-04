import * as BaseUI from "@base-ui/react/scroll-area";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";

export interface ScrollAreaProps extends BaseUI.ScrollAreaRootProps {
  viewportProps?: BaseUI.ScrollAreaViewportProps;
  contentProps?: BaseUI.ScrollAreaContentProps;
  scrollbarProps?: BaseUI.ScrollAreaScrollbarProps;
  thumbProps?: BaseUI.ScrollAreaThumbProps;
  cornerProps?: BaseUI.ScrollAreaCornerProps;
  /**
   * Which scrollbars to render.
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal" | "both";
}

export function ScrollArea(props: ScrollAreaProps) {
  const {
    children,
    orientation = "vertical",
    viewportProps,
    contentProps,
    scrollbarProps,
    thumbProps,
    cornerProps,
    ...restProps
  } = props;

  const orientations =
    orientation === "both"
      ? (["vertical", "horizontal"] as const)
      : [orientation];

  return (
    <BaseUI.ScrollArea.Root {...restProps}>
      <BaseUI.ScrollArea.Viewport
        {...mergeProps(viewportProps, {
          className: tw("focus-visible:focus-outline outline-highlight h-full"),
        })}
      >
        <BaseUI.ScrollArea.Content
          {...mergeProps(contentProps, {
            className: cn(
              orientations.includes("vertical") && "data-has-overflow-y:pr-2",
              orientations.includes("horizontal") && "data-has-overflow-x:pb-2",
            ),
          })}
        >
          {children}
        </BaseUI.ScrollArea.Content>
      </BaseUI.ScrollArea.Viewport>
      {orientations.map((scrollbarOrientation) => (
        <BaseUI.ScrollArea.Scrollbar
          key={scrollbarOrientation}
          orientation={scrollbarOrientation}
          {...mergeProps(scrollbarProps, {
            className: tw(
              "pointer-events-none m-1 flex rounded-full opacity-0 transition-opacity data-hovering:pointer-events-auto data-hovering:opacity-100 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0 data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:items-center data-[orientation=vertical]:w-1.5 data-[orientation=vertical]:justify-center",
            ),
          })}
        >
          <BaseUI.ScrollArea.Thumb
            {...mergeProps(thumbProps, {
              className: tw(
                "bg-muted rounded-full data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
              ),
            })}
          />
        </BaseUI.ScrollArea.Scrollbar>
      ))}
      {orientation === "both" && <BaseUI.ScrollArea.Corner {...cornerProps} />}
    </BaseUI.ScrollArea.Root>
  );
}
