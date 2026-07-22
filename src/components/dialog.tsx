import {
  Dialog as BaseUIDialog,
  DialogBackdropProps,
  DialogCloseProps,
  DialogDescriptionProps,
  DialogPopupProps,
  DialogPortalProps,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerProps,
} from "@base-ui/react/dialog";
import { X } from "lucide-react";
import React from "react";
import { mergeProps, tw } from "../lib/utils";
import { CloseButton, CloseButtonProps } from "./close-button";

export interface DialogProps
  extends DialogRootProps, Omit<DialogTriggerProps, "children" | "render"> {
  trigger?: DialogTriggerProps["render"];
  portalProps?: DialogPortalProps;
  backdropProps?: DialogBackdropProps;
  popupProps?: DialogPopupProps;
  closeProps?: DialogCloseProps;
  closeButtonProps?: CloseButtonProps;
  closeButtonIconProps?: React.ComponentProps<typeof X>;
}

export function Dialog(props: DialogProps) {
  const {
    trigger,
    actionsRef,
    children,
    defaultOpen,
    defaultTriggerId,
    disablePointerDismissal,
    handle,
    modal,
    onOpenChange,
    onOpenChangeComplete,
    open,
    triggerId,
    portalProps,
    backdropProps,
    popupProps,
    closeProps,
    closeButtonProps,
    closeButtonIconProps,
    ...restProps
  } = props;

  return (
    <BaseUIDialog.Root
      actionsRef={actionsRef}
      defaultOpen={defaultOpen}
      defaultTriggerId={defaultTriggerId}
      disablePointerDismissal={disablePointerDismissal}
      handle={handle}
      modal={modal}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
      triggerId={triggerId}
    >
      {(renderProps) => (
        <>
          <BaseUIDialog.Trigger render={trigger} {...restProps} />
          <BaseUIDialog.Portal {...portalProps}>
            <BaseUIDialog.Backdrop
              {...mergeProps(backdropProps, {
                className: tw(
                  "fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute",
                ),
              })}
            />
            <BaseUIDialog.Popup
              {...mergeProps(popupProps, {
                className: tw(
                  "bg-background text-foreground fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border p-4 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
                ),
              })}
            >
              <DialogClose
                render={
                  <CloseButton
                    position="top-right"
                    iconProps={closeButtonIconProps}
                    {...closeButtonProps}
                  />
                }
                {...closeProps}
              />
              {typeof children === "function"
                ? children(renderProps)
                : children}
            </BaseUIDialog.Popup>
          </BaseUIDialog.Portal>
        </>
      )}
    </BaseUIDialog.Root>
  );
}

export function DialogTitle(props: DialogTitleProps) {
  return (
    <BaseUIDialog.Title
      {...mergeProps(props, { className: tw("heading-xs") })}
    />
  );
}

export function DialogDescription(props: DialogDescriptionProps) {
  return (
    <BaseUIDialog.Description
      {...mergeProps(props, { className: tw("text-body body-sm mb-6") })}
    />
  );
}

export function DialogClose(props: DialogCloseProps) {
  return <BaseUIDialog.Close {...props} />;
}
