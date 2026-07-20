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
    <Drawer
      {...args}
      contentProps={{ className: "h-full" }}
      trigger={<Button variant="outline">Open drawer</Button>}
    >
      <div className="flex flex-1 flex-col gap-2">
        <DrawerTitle>Drawer</DrawerTitle>
        <DrawerDescription>
          This is a drawer that slides in from the side. You can swipe to
          dismiss it.
        </DrawerDescription>
      </div>
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

export const CustomWidth: Story = {
  args: {
    width: "40rem",
  },
};

export const Overflow: Story = {
  render: (args) => (
    <Drawer {...args} trigger={<Button variant="outline">Open Drawer</Button>}>
      <DrawerTitle>Drawer</DrawerTitle>
      <DrawerDescription>
        This is a drawer that slides in from the side. You can swipe to dismiss
        it.
      </DrawerDescription>
      {new Array(30).fill(null).map((_, index) => (
        <Button variant="outline" key={index}>
          Lorem ipsum
        </Button>
      ))}
    </Drawer>
  ),
};

export const MobileMenu: Story = {
  args: {
    trigger: <Button variant="outline">Open Drawer</Button>,
    direction: "bottom",
    popupProps: {
      className: "pb-0 px-0 pt-11",
    },
  },
  render: (args) => (
    <Drawer {...args}>
      <div className="bg-muted absolute top-3 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full" />
      <div className="flex h-[calc(100vh-8rem)] flex-col gap-2 overflow-y-auto p-4">
        {new Array(30).fill(null).map((_, index) => (
          <Button className="w-fit" variant="ghost" key={index}>
            Lorem ipsum
          </Button>
        ))}
      </div>
    </Drawer>
  ),
};

export const Top: Story = {
  args: {
    direction: "top",
  },
};

export const Bottom: Story = {
  args: {
    direction: "bottom",
  },
};

export const Left: Story = {
  args: {
    direction: "left",
  },
};

export const CustomHeight: Story = {
  args: {
    direction: "bottom",
    height: "100%",
  },
};

export const NonModal: Story = {
  args: {
    direction: "bottom",
    disablePointerDismissal: true,
    modal: false,
  },
};
