import {
  Popover as BaseUIPopover,
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverDescriptionProps,
  PopoverPopupProps,
  PopoverPortalProps,
  PopoverPositionerProps,
  PopoverRootProps,
  PopoverTitleProps,
  PopoverTriggerProps,
} from "@base-ui/react/popover";
import React from "react";
import { cn, cnBaseUI } from "../lib/utils";

export interface PopoverProps
  extends PopoverRootProps, Omit<PopoverTriggerProps, "children" | "render"> {
  trigger?: PopoverTriggerProps["render"];
  arrow?: boolean;
  portalProps?: PopoverPortalProps;
  positionerProps?: PopoverPositionerProps;
  popupProps?: PopoverPopupProps;
  arrowProps?: PopoverArrowProps;
  arrowSvgProps?: ArrowSvgProps;
}

export function Popover(props: PopoverProps) {
  const {
    trigger,
    arrow,
    actionsRef,
    children,
    defaultOpen,
    defaultTriggerId,
    handle,
    modal,
    onOpenChange,
    onOpenChangeComplete,
    open,
    triggerId,
    portalProps,
    positionerProps: {
      className: positionerClassName,
      ...positionerProps
    } = {},
    popupProps: { className: popupClassName, ...popupProps } = {},
    arrowProps: { className: arrowClassName, ...arrowProps } = {},
    arrowSvgProps,
    className,
    ...restProps
  } = props;

  return (
    <BaseUIPopover.Root
      actionsRef={actionsRef}
      defaultOpen={defaultOpen}
      defaultTriggerId={defaultTriggerId}
      handle={handle}
      modal={modal}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
      triggerId={triggerId}
    >
      {(renderProps) => (
        <>
          <BaseUIPopover.Trigger
            render={trigger}
            className={className}
            {...restProps}
          />
          <BaseUIPopover.Portal {...portalProps}>
            <BaseUIPopover.Positioner
              className={cnBaseUI("z-10 outline-none", positionerClassName)}
              sideOffset={8}
              {...positionerProps}
            >
              <BaseUIPopover.Popup
                className={cnBaseUI(
                  "bg-background outline-border max-w-[calc(100vw-3rem)] min-w-(--anchor-width) origin-(--transform-origin) rounded-lg bg-clip-padding p-4 shadow-lg outline transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
                  popupClassName,
                )}
                {...popupProps}
              >
                {arrow && (
                  <BaseUIPopover.Arrow
                    className={cnBaseUI(
                      "data-[side=bottom]:-top-2 data-[side=left]:-right-3.25 data-[side=left]:rotate-90 data-[side=right]:-left-3.25 data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180",
                      arrowClassName,
                    )}
                    {...arrowProps}
                  >
                    <ArrowSvg {...arrowSvgProps} />
                  </BaseUIPopover.Arrow>
                )}
                {typeof children === "function"
                  ? children(renderProps)
                  : children}
              </BaseUIPopover.Popup>
            </BaseUIPopover.Positioner>
          </BaseUIPopover.Portal>
        </>
      )}
    </BaseUIPopover.Root>
  );
}

export function PopoverTitle(props: PopoverTitleProps) {
  const { className, ...restProps } = props;
  return (
    <BaseUIPopover.Title
      className={cnBaseUI("heading-6", className)}
      {...restProps}
    />
  );
}

export function PopoverDescription(props: PopoverDescriptionProps) {
  const { className, ...restProps } = props;
  return (
    <BaseUIPopover.Description
      className={cnBaseUI("text-body body-2", className)}
      {...restProps}
    />
  );
}

export function PopoverClose(props: PopoverCloseProps) {
  return <BaseUIPopover.Close {...props} />;
}

interface ArrowSvgProps extends React.ComponentProps<"svg"> {
  backgroundPathProps?: React.ComponentProps<"path">;
  borderPathProps?: React.ComponentProps<"path">;
}

export function ArrowSvg(props: ArrowSvgProps) {
  const {
    backgroundPathProps: {
      className: backgroundClassName,
      ...backgroundPathProps
    } = {},
    borderPathProps: { className: borderClassName, ...borderPathProps } = {},
    ...restProps
  } = props;

  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...restProps}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className={cn("fill-background", backgroundClassName)}
        {...backgroundPathProps}
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className={cn("fill-border", borderClassName)}
        {...borderPathProps}
      />
      <path d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z" />
    </svg>
  );
}
