import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, screen } from "storybook/test";
import { Button } from "../components/button";
import { Dialog } from "../components/dialog";

const meta = {
  title: "Components/Dialog",
  render: (args) => (
    <Dialog {...args} trigger={<Button variant="outline">Open Dialog</Button>}>
      <Dialog.Title className="mb-2">Are you sure?</Dialog.Title>
      <Dialog.Description>This action cannot be undone.</Dialog.Description>
      <div className="flex justify-end gap-4">
        <Dialog.Close render={<Button variant="secondary">Cancel</Button>} />
        <Dialog.Close render={<Button variant="primary">OK</Button>} />
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

export const DetachedTrigger: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open detached
        </Button>
        <Dialog {...args} open={open} onOpenChange={setOpen}>
          <Dialog.Title>Detached dialog</Dialog.Title>
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
