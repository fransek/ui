import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import {
  BottomDrawer,
  BottomDrawerClose,
  BottomDrawerDescription,
  BottomDrawerTitle,
} from "../components/bottom-drawer";
import { Button } from "../components/button";

const meta = {
  title: "Components/BottomDrawer",
  render: (args) => (
    <BottomDrawer
      {...args}
      trigger={<Button variant="outline">Open bottom drawer</Button>}
    >
      <BottomDrawerTitle>Bottom drawer</BottomDrawerTitle>
      <BottomDrawerDescription>
        This is a drawer that slides in from the bottom. You can swipe down to
        dismiss it.
      </BottomDrawerDescription>
      <div className="mt-4 flex justify-end gap-4">
        <BottomDrawerClose
          render={<Button variant="secondary">Cancel</Button>}
        />
        <BottomDrawerClose
          render={<Button variant="primary">Confirm</Button>}
        />
      </div>
    </BottomDrawer>
  ),
  component: BottomDrawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BottomDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const DisablePointerDismissal: Story = {
  args: {
    disablePointerDismissal: true,
  },
};

export const CustomHeight: Story = {
  args: {
    height: "20rem",
  },
};

export const Scrollable: Story = {
  render: (args) => (
    <BottomDrawer
      {...args}
      trigger={<Button variant="outline">Open bottom drawer</Button>}
    >
      <BottomDrawerTitle>Menu</BottomDrawerTitle>
      <BottomDrawerDescription>
        Scroll the long list. Flick down from the top to dismiss.
      </BottomDrawerDescription>
      {new Array(50).fill(null).map((_, index) => (
        <div key={index} className="rounded-lg border p-4">
          Item {index + 1}
        </div>
      ))}
    </BottomDrawer>
  ),
};
