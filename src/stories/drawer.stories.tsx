import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../components/button";
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerTitle,
} from "../components/drawer";

const meta = {
  title: "Components/Drawer",
  render: (args) => (
    <Drawer {...args} trigger={<Button variant="outline">Open drawer</Button>}>
      <DrawerTitle>Drawer</DrawerTitle>
      <DrawerDescription>
        This is a drawer that slides in from the side. You can swipe to dismiss
        it.
      </DrawerDescription>
      <div className="mt-4 flex justify-end gap-4">
        <DrawerClose render={<Button variant="secondary">Cancel</Button>} />
        <DrawerClose render={<Button variant="primary">Confirm</Button>} />
      </div>
    </Drawer>
  ),
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const DisablePointerDismissal: Story = {
  args: {
    disablePointerDismissal: true,
  },
};

export const CustomWidth: Story = {
  args: {
    width: "40rem",
  },
};

export const Overflow: Story = {
  render: (args) => (
    <Drawer {...args} trigger={<Button variant="outline">Open drawer</Button>}>
      <DrawerTitle>Drawer</DrawerTitle>
      <DrawerDescription>
        This drawer has enough content to overflow, so the scrollbar should be
        visible on the edge of the screen.
      </DrawerDescription>
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i} className="body-2 text-body">
          Paragraph {i + 1}. Vernacular architecture is building done outside
          any academic tradition, and without professional guidance.
        </p>
      ))}
      <div className="mt-4 flex justify-end gap-4">
        <DrawerClose render={<Button variant="secondary">Cancel</Button>} />
        <DrawerClose render={<Button variant="primary">Confirm</Button>} />
      </div>
    </Drawer>
  ),
};
