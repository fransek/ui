import {
  Dialog as BaseDialog,
  DialogBackdropProps as BaseDialogBackdropProps,
  DialogCloseProps as BaseDialogCloseProps,
  DialogDescriptionProps as BaseDialogDescriptionProps,
  DialogPopupProps as BaseDialogPopupProps,
  DialogPortalProps as BaseDialogPortalProps,
  DialogRootProps as BaseDialogRootProps,
  DialogTitleProps as BaseDialogTitleProps,
  DialogTriggerProps as BaseDialogTriggerProps,
  DialogViewportProps as BaseDialogViewportProps,
} from "@base-ui/react/dialog";
import { X } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "./button";

export type DialogProps = BaseDialogRootProps;

export function Dialog(props: DialogProps) {
  return <BaseDialog.Root {...props} />;
}

export interface DialogTriggerProps<
  Payload = unknown,
> extends BaseDialogTriggerProps<Payload> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function DialogTrigger<Payload = unknown>({
  className,
  variant = "primary",
  size = "md",
  ...props
}: DialogTriggerProps<Payload>) {
  return (
    <BaseDialog.Trigger
      className={cn(
        buttonStyles({ variant, size }),
        "data-popup-open:translate-y-px",
        className,
      )}
      {...props}
    />
  );
}

export type DialogPortalProps = BaseDialogPortalProps;

export function DialogPortal(props: DialogPortalProps) {
  return <BaseDialog.Portal {...props} />;
}

export type DialogBackdropProps = BaseDialogBackdropProps;

export function DialogBackdrop({ className, ...props }: DialogBackdropProps) {
  return (
    <BaseDialog.Backdrop
      className={cn(
        "bg-background/70 fixed inset-0 z-40 backdrop-blur-sm transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

export type DialogViewportProps = BaseDialogViewportProps;

export function DialogViewport({ className, ...props }: DialogViewportProps) {
  return (
    <BaseDialog.Viewport
      className={cn(
        "fixed inset-0 z-50 grid place-items-center p-4",
        className,
      )}
      {...props}
    />
  );
}

export type DialogCloseProps = BaseDialogCloseProps;

export function DialogClose({
  className,
  children,
  ...props
}: DialogCloseProps) {
  return (
    <BaseDialog.Close
      className={cn(
        "focus-visible:outline-highlight hover:bg-muted/60 inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </BaseDialog.Close>
  );
}

export interface DialogContentProps extends BaseDialogPopupProps {
  portalProps?: DialogPortalProps;
  backdropProps?: DialogBackdropProps;
  viewportProps?: DialogViewportProps;
  closeProps?: DialogCloseProps;
  showCloseButton?: boolean;
}

export function DialogContent({
  children,
  className,
  portalProps,
  backdropProps,
  viewportProps,
  closeProps,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  const { className: closeClassName, ...restCloseProps } = closeProps ?? {};
  const { className: backdropClassName, ...restBackdropProps } =
    backdropProps ?? {};
  const { className: viewportClassName, ...restViewportProps } =
    viewportProps ?? {};

  return (
    <DialogPortal {...portalProps}>
      <DialogBackdrop className={backdropClassName} {...restBackdropProps} />
      <DialogViewport className={viewportClassName} {...restViewportProps}>
        <BaseDialog.Popup
          className={cn(
            "bg-background text-foreground relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl transition-[opacity,transform] outline-none data-ending-style:-translate-y-2 data-ending-style:opacity-0 data-starting-style:-translate-y-2 data-starting-style:opacity-0",
            className,
          )}
          {...props}
        >
          {showCloseButton && (
            <DialogClose
              className={cn(
                "text-muted-foreground hover:bg-muted/60 absolute top-3 right-3 h-9 w-9 rounded-full p-0 transition data-closed:opacity-0",
                closeClassName,
              )}
              {...restCloseProps}
            >
              <X className="size-4" />
            </DialogClose>
          )}
          {children}
        </BaseDialog.Popup>
      </DialogViewport>
    </DialogPortal>
  );
}

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-2 text-left", className)}
      {...props}
    />
  );
}

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end sm:gap-3",
        className,
      )}
      {...props}
    />
  );
}

export type DialogTitleProps = BaseDialogTitleProps;

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      className={cn("text-xl leading-7 font-semibold", className)}
      {...props}
    />
  );
}

export type DialogDescriptionProps = BaseDialogDescriptionProps;

export function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
