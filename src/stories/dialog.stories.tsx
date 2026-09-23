import { Dialog as BaseUIDialog } from "@base-ui/react/dialog";
import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, screen } from "storybook/test";
import { Button } from "../components/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "../components/dialog";

const meta = {
  title: "Components/Dialog",
  render: (args) => (
    <Dialog {...args} trigger={<Button variant="outline">Open Dialog</Button>}>
      <DialogTitle className="mb-2">Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
      <div className="flex justify-end gap-4">
        <DialogClose render={<Button variant="secondary">Cancel</Button>} />
        <DialogClose render={<Button variant="primary">OK</Button>} />
      </div>
    </Dialog>
  ),
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open Dialog" }));
    await expect(await screen.findByText("Are you sure?")).toBeInTheDocument();
  },
};

export const DisablePointerDismissal: Story = {
  args: {
    disablePointerDismissal: true,
  },
};

const detachedDialog = BaseUIDialog.createHandle();

export const DetachedTrigger: Story = {
  render: (args) => {
    return (
      <>
        <BaseUIDialog.Trigger
          handle={detachedDialog}
          render={<Button variant="outline">Open detached</Button>}
        />
        <Dialog {...args} handle={detachedDialog}>
          <DialogTitle>Detached dialog</DialogTitle>
        </Dialog>
      </>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getAllByRole("button")).toHaveLength(1);
    await userEvent.click(
      canvas.getByRole("button", { name: "Open detached" }),
    );
    await expect(
      await screen.findByText("Detached dialog"),
    ).toBeInTheDocument();
  },
};
