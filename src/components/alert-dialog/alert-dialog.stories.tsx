import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, screen, waitFor } from "storybook/test";
import { Button } from "../button";
import { AlertDialog } from "./alert-dialog";

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  render: (args) => (
    <AlertDialog
      {...args}
      trigger={<Button variant="outline">Discard draft</Button>}
    >
      <AlertDialog.Title className="mb-2">Discard draft?</AlertDialog.Title>
      <AlertDialog.Description>
        You will lose everything you wrote since the last save.
      </AlertDialog.Description>
      <AlertDialog.Actions>
        <AlertDialog.Close render={<Button variant="secondary" />}>
          Keep editing
        </AlertDialog.Close>
        <AlertDialog.Close render={<Button variant="primary" />}>
          Discard
        </AlertDialog.Close>
      </AlertDialog.Actions>
    </AlertDialog>
  ),
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onOpenChange: fn(),
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Discard draft" }),
    );
    const dialog = await screen.findByRole("alertdialog", {
      name: "Discard draft?",
    });
    await expect(dialog).toHaveAccessibleDescription(
      "You will lose everything you wrote since the last save.",
    );
    // No close button: the only ways out are the choices.
    await expect(
      screen.queryByRole("button", { name: /close/i }),
    ).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Keep editing" }));
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument(),
    );
  },
};

/** Clicking the backdrop leaves the dialog open; Escape still cancels. */
export const NoPointerDismissal: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Discard draft" }),
    );
    await screen.findByRole("alertdialog");

    await userEvent.click(document.body);
    await expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    await expect(args.onOpenChange).not.toHaveBeenCalledWith(
      false,
      expect.anything(),
    );

    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument(),
    );
  },
};

const onDelete = fn();

/** A destructive confirmation that runs its action when confirmed. */
export const Destructive: Story = {
  render: (args) => {
    return (
      <AlertDialog
        {...args}
        trigger={<Button variant="danger-subtle">Delete project</Button>}
      >
        <AlertDialog.Title className="mb-2">Delete project?</AlertDialog.Title>
        <AlertDialog.Description>
          This permanently deletes the project and all of its files. This action
          cannot be undone.
        </AlertDialog.Description>
        <AlertDialog.Actions>
          <AlertDialog.Close render={<Button variant="secondary" />}>
            Cancel
          </AlertDialog.Close>
          <AlertDialog.Close
            render={<Button variant="danger" />}
            onClick={onDelete}
          >
            Delete
          </AlertDialog.Close>
        </AlertDialog.Actions>
      </AlertDialog>
    );
  },
  play: async ({ canvas, userEvent }) => {
    onDelete.mockClear();
    await userEvent.click(
      canvas.getByRole("button", { name: "Delete project" }),
    );
    await screen.findByRole("alertdialog", { name: "Delete project?" });
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    await expect(onDelete).toHaveBeenCalledOnce();
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument(),
    );
  },
};

/** Controlled from outside, e.g. opened by a menu item or a keyboard shortcut. */
export const DetachedTrigger: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Sign out
        </Button>
        <AlertDialog
          {...args}
          open={open}
          onOpenChange={(nextOpen, details) => {
            setOpen(nextOpen);
            args.onOpenChange?.(nextOpen, details);
          }}
        >
          <AlertDialog.Title className="mb-2">Sign out?</AlertDialog.Title>
          <AlertDialog.Description>
            You have unsynced changes on this device.
          </AlertDialog.Description>
          <AlertDialog.Actions>
            <AlertDialog.Close render={<Button variant="secondary" />}>
              Stay signed in
            </AlertDialog.Close>
            <AlertDialog.Close render={<Button variant="primary" />}>
              Sign out
            </AlertDialog.Close>
          </AlertDialog.Actions>
        </AlertDialog>
      </>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getAllByRole("button")).toHaveLength(1);
    await userEvent.click(canvas.getByRole("button", { name: "Sign out" }));
    await expect(
      await screen.findByRole("alertdialog", { name: "Sign out?" }),
    ).toBeInTheDocument();
  },
};
