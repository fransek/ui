import {
  ScrollArea as BaseUIScrollArea,
  ScrollAreaContentProps,
  ScrollAreaCornerProps,
  ScrollAreaRootProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaViewportProps,
} from "@base-ui/react/scroll-area";
import React from "react";
import { cn, mergeProps, tw } from "../lib/utils";

export interface ScrollAreaProps extends ScrollAreaRootProps {
  viewportProps?: ScrollAreaViewportProps;
  contentProps?: ScrollAreaContentProps;
  scrollbarProps?: ScrollAreaScrollbarProps;
  thumbProps?: ScrollAreaThumbProps;
  cornerProps?: ScrollAreaCornerProps;
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
    <BaseUIScrollArea.Root {...restProps}>
      <BaseUIScrollArea.Viewport
        {...mergeProps(viewportProps, {
          className: tw("focus-visible:focus-outline outline-highlight h-full"),
        })}
      >
        <BaseUIScrollArea.Content
          {...mergeProps(contentProps, {
            className: cn(
              orientations.includes("vertical") && "data-has-overflow-y:pr-2",
              orientations.includes("horizontal") && "data-has-overflow-x:pb-2",
            ),
          })}
        >
          {children}
        </BaseUIScrollArea.Content>
      </BaseUIScrollArea.Viewport>
      {orientations.map((scrollbarOrientation) => (
        <BaseUIScrollArea.Scrollbar
          key={scrollbarOrientation}
          orientation={scrollbarOrientation}
          {...mergeProps(scrollbarProps, {
            className: tw(
              "bg-contrast/10 pointer-events-none m-1 flex rounded-full opacity-0 transition-opacity data-hovering:pointer-events-auto data-hovering:opacity-100 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0 data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:items-center data-[orientation=vertical]:w-2 data-[orientation=vertical]:justify-center",
            ),
          })}
        >
          <BaseUIScrollArea.Thumb
            {...mergeProps(thumbProps, {
              className: tw(
                "bg-contrast/50 rounded-full data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
              ),
            })}
          />
        </BaseUIScrollArea.Scrollbar>
      ))}
      {orientation === "both" && <BaseUIScrollArea.Corner {...cornerProps} />}
    </BaseUIScrollArea.Root>
  );
}
