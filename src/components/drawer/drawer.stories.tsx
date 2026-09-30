import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, screen } from "storybook/test";
import { Button } from "../button";
import { Drawer } from "./drawer";

const meta = {
  title: "Components/Drawer",
  render: (args) => (
    <Drawer
      {...args}
      contentProps={{ className: "h-full" }}
      trigger={<Button variant="outline">Open drawer</Button>}
    >
      <div className="flex flex-1 flex-col gap-2">
        <Drawer.Title>Drawer</Drawer.Title>
        <Drawer.Description>
          This is a drawer that slides in from the side. You can swipe to
          dismiss it.
        </Drawer.Description>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Drawer.Close render={<Button variant="secondary">Cancel</Button>} />
        <Drawer.Close render={<Button variant="primary">Confirm</Button>} />
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
      <Drawer.Title>Drawer</Drawer.Title>
      <Drawer.Description>
        This is a drawer that slides in from the side. You can swipe to dismiss
        it.
      </Drawer.Description>
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

export const DetachedTrigger: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open detached
        </Button>
        <Drawer {...args} open={open} onOpenChange={setOpen}>
          <Drawer.Title>Detached drawer</Drawer.Title>
        </Drawer>
      </>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getAllByRole("button")).toHaveLength(1);
    await userEvent.click(
      canvas.getByRole("button", { name: "Open detached" }),
    );
    await expect(
      await screen.findByText("Detached drawer"),
    ).toBeInTheDocument();
  },
};
