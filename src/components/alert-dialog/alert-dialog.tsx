import * as BaseUI from "@base-ui/react/alert-dialog";
import { useRender } from "@base-ui/react/use-render";
import React from "react";
import { mergeProps, tw } from "../../lib/utils";
import {
  dialogBackdropStyles,
  DialogClose,
  DialogDescription,
  dialogPopupStyles,
  DialogTitle,
} from "../dialog";

export interface AlertDialogProps
  extends
    BaseUI.AlertDialogRootProps,
    Omit<BaseUI.AlertDialogTriggerProps, "children" | "render"> {
  trigger?: BaseUI.AlertDialogTriggerProps["render"];
  portalProps?: BaseUI.AlertDialogPortalProps;
  backdropProps?: BaseUI.AlertDialogBackdropProps;
  popupProps?: BaseUI.AlertDialogPopupProps;
}

/**
 * A modal dialog that interrupts the user and asks them to confirm or cancel
 * an action. Unlike `Dialog`, it has no close button and can't be dismissed by
 * clicking outside, so every way out is a choice you render with
 * `AlertDialog.Close`.
 */
export function AlertDialog(props: AlertDialogProps) {
  const {
    trigger,
    actionsRef,
    children,
    defaultOpen,
    defaultTriggerId,
    handle,
    onOpenChange,
    onOpenChangeComplete,
    open,
    triggerId,
    portalProps,
    backdropProps,
    popupProps,
    ...restProps
  } = props;

  return (
    <BaseUI.AlertDialog.Root
      actionsRef={actionsRef}
      defaultOpen={defaultOpen}
      defaultTriggerId={defaultTriggerId}
      handle={handle}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
      triggerId={triggerId}
    >
      {(renderProps) => (
        <>
          {trigger && (
            <BaseUI.AlertDialog.Trigger render={trigger} {...restProps} />
          )}
          <BaseUI.AlertDialog.Portal {...portalProps}>
            <BaseUI.AlertDialog.Backdrop
              {...mergeProps(backdropProps, {
                className: dialogBackdropStyles,
              })}
            />
            <BaseUI.AlertDialog.Popup
              {...mergeProps(popupProps, { className: dialogPopupStyles })}
            >
              {typeof children === "function"
                ? children(renderProps)
                : children}
            </BaseUI.AlertDialog.Popup>
          </BaseUI.AlertDialog.Portal>
        </>
      )}
    </BaseUI.AlertDialog.Root>
  );
}

/** Labels the alert dialog. */
export function AlertDialogTitle(props: BaseUI.AlertDialogTitleProps) {
  return <DialogTitle {...props} />;
}

/** Describes what the action does and what happens if the user confirms. */
export function AlertDialogDescription(
  props: BaseUI.AlertDialogDescriptionProps,
) {
  return <DialogDescription {...props} />;
}

export type AlertDialogActionsProps = useRender.ComponentProps<"div">;

/** A right-aligned row for the cancel and confirm buttons. */
export function AlertDialogActions(props: AlertDialogActionsProps) {
  const { render, ...restProps } = props;

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw("flex flex-wrap justify-end gap-2"),
    }),
  });
}

/** Closes the alert dialog. Render each of its choices with it. */
export function AlertDialogClose(props: BaseUI.AlertDialogCloseProps) {
  return <DialogClose {...props} />;
}

AlertDialog.Title = AlertDialogTitle;
AlertDialog.Description = AlertDialogDescription;
AlertDialog.Actions = AlertDialogActions;
AlertDialog.Close = AlertDialogClose;
