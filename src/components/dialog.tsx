import {
  Dialog as BaseDialog,
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
import { cn } from "../lib/utils";
import { Button } from "./button";

export interface DialogProps
  extends DialogRootProps, Omit<DialogTriggerProps, "children" | "render"> {
  trigger?: DialogTriggerProps["render"];
  portalProps?: DialogPortalProps;
  backdropProps?: DialogBackdropProps;
  popupProps?: DialogPopupProps;
  closeProps?: DialogCloseProps;
  closeButtonProps?: DialogCloseProps;
  closeButtonIconProps?: React.ComponentProps<typeof X>;
}

export function Dialog({
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
  backdropProps: { className: backdropClassName, ...backdropProps } = {},
  popupProps: { className: popupClassName, ...popupProps } = {},
  closeProps,
  closeButtonProps: {
    className: closeButtonClassName,
    ...closeButtonProps
  } = {},
  closeButtonIconProps: {
    className: closeButtonIconClassName,
    ...closeButtonIconProps
  } = {},
  ...props
}: DialogProps) {
  return (
    <BaseDialog.Root
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
          <BaseDialog.Trigger render={trigger} {...props} />
          <BaseDialog.Portal {...portalProps}>
            <BaseDialog.Backdrop
              className={cn(
                "fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute",
                backdropClassName,
              )}
              {...backdropProps}
            />
            <BaseDialog.Popup
              className={cn(
                "bg-background text-foreground fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border p-4 transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
                popupClassName,
              )}
              {...popupProps}
            >
              {!disablePointerDismissal && (
                <DialogClose
                  render={
                    <Button
                      className={cn(
                        "fixed top-2 right-2",
                        closeButtonClassName,
                      )}
                      variant="ghost"
                      size="icon"
                      {...closeButtonProps}
                    >
                      <X
                        className={cn(
                          "text-muted-foreground size-4",
                          closeButtonIconClassName,
                        )}
                        {...closeButtonIconProps}
                      />
                    </Button>
                  }
                  {...closeProps}
                />
              )}
              {typeof children === "function"
                ? children(renderProps)
                : children}
            </BaseDialog.Popup>
          </BaseDialog.Portal>
        </>
      )}
    </BaseDialog.Root>
  );
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <BaseDialog.Title className={cn("heading-6", className)} {...props} />;
}

export function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      className={cn("text-body body-2 mb-6", className)}
      {...props}
    />
  );
}

export function DialogClose(props: DialogCloseProps) {
  return <BaseDialog.Close {...props} />;
}
