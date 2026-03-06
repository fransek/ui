import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button, buttonStyles } from "../components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger variant="primary" size="md">
        Open dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <p className="text-foreground text-sm leading-relaxed">
          This dialog demonstrates the default styling for overlays, content,
          and close actions.
        </p>
        <DialogFooter>
          <DialogClose
            className={buttonStyles({ variant: "muted", size: "md" })}
          >
            Cancel
          </DialogClose>
          <Button variant="primary" size="md">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
