import * as BaseUI from "@base-ui/react/dialog";
import { X } from "lucide-react";
import React from "react";
import { mergeProps, tw } from "../../lib/utils";
import { CloseButton, CloseButtonProps } from "../close-button";

export interface DialogProps
  extends
    BaseUI.DialogRootProps,
    Omit<BaseUI.DialogTriggerProps, "children" | "render"> {
  trigger?: BaseUI.DialogTriggerProps["render"];
  portalProps?: BaseUI.DialogPortalProps;
  backdropProps?: BaseUI.DialogBackdropProps;
  popupProps?: BaseUI.DialogPopupProps;
  closeProps?: BaseUI.DialogCloseProps;
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
    <BaseUI.Dialog.Root
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
          {trigger && <BaseUI.Dialog.Trigger render={trigger} {...restProps} />}
          <BaseUI.Dialog.Portal {...portalProps}>
            <BaseUI.Dialog.Backdrop
              {...mergeProps(backdropProps, {
                className: tw(
                  "fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute",
                ),
              })}
            />
            <BaseUI.Dialog.Popup
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
            </BaseUI.Dialog.Popup>
          </BaseUI.Dialog.Portal>
        </>
      )}
    </BaseUI.Dialog.Root>
  );
}

export function DialogTitle(props: BaseUI.DialogTitleProps) {
  return (
    <BaseUI.Dialog.Title
      {...mergeProps(props, { className: tw("heading-xs") })}
    />
  );
}

export function DialogDescription(props: BaseUI.DialogDescriptionProps) {
  return (
    <BaseUI.Dialog.Description
      {...mergeProps(props, { className: tw("text-body body-sm mb-6") })}
    />
  );
}

export function DialogClose(props: BaseUI.DialogCloseProps) {
  return <BaseUI.Dialog.Close {...props} />;
}

Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Close = DialogClose;
