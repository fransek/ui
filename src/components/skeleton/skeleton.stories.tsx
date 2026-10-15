import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Avatar } from "../avatar";
import { Button } from "../button";
import { Card } from "../card";
import { Switch } from "../switch";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    shape: {
      control: "inline-radio",
      options: ["rectangle", "circle", "text"],
    },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    className: "h-24 w-64",
  },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector("[data-shape]");
    await expect(skeleton).toHaveAttribute("aria-hidden", "true");
    await expect(skeleton).toHaveAttribute("data-shape", "rectangle");
  },
};

export const Shapes: Story = {
  render: () => (
    <div className="flex w-64 items-center gap-4">
      <Skeleton shape="circle" className="size-12" />
      <Skeleton className="size-12" />
      <Skeleton shape="text" className="flex-1" />
    </div>
  ),
};

export const Text: Story = {
  render: () => (
    <div className="body w-80">
      <Skeleton.Text lines={4} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const lines = canvasElement.querySelectorAll('[data-shape="text"]');
    await expect(lines).toHaveLength(4);
    // Each line takes one line box, like the paragraph it stands in for.
    const block = lines[0].parentElement!;
    const lineHeight = parseFloat(getComputedStyle(block).lineHeight);
    await expect(block.getBoundingClientRect().height).toBeCloseTo(
      lineHeight * 4,
      0,
    );
  },
};

export const TextSizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Skeleton shape="text" className="heading-lg w-1/2" />
      <Skeleton.Text className="body" lines={2} />
      <Skeleton.Text className="body-sm" lines={2} />
    </div>
  ),
};

export const ProfileRow: Story = {
  render: () => (
    <div aria-busy="true" className="flex w-72 items-center gap-3">
      <Skeleton shape="circle" className="size-10" />
      <div className="body-sm flex-1">
        <Skeleton shape="text" className="w-1/2" />
        <Skeleton shape="text" className="w-4/5" />
      </div>
    </div>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <Card aria-busy="true" className="w-80">
      <Skeleton className="h-40 rounded-none" />
      <Card.Content>
        <Skeleton shape="text" className="heading-md w-2/3" />
        <Skeleton.Text className="body-sm" lines={3} />
        <div className="flex justify-end gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      </Card.Content>
    </Card>
  ),
};

function WrappingChildrenDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col items-start gap-4">
      <Switch label="Loading" checked={loading} onCheckedChange={setLoading} />
      <div aria-busy={loading} className="flex items-center gap-3">
        <Skeleton loading={loading} shape="circle">
          <Avatar alt="Frans Ekman" />
        </Skeleton>
        <Skeleton loading={loading}>
          <span className="body">Frans Ekman</span>
        </Skeleton>
        <Skeleton loading={loading}>
          <Button>Follow</Button>
        </Skeleton>
      </div>
    </div>
  );
}

export const WrappingChildren: Story = {
  render: () => <WrappingChildrenDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole("button", { name: "Follow" })).toBeNull();
    await userEvent.click(canvas.getByRole("switch", { name: "Loading" }));
    await expect(canvas.getByRole("button", { name: "Follow" })).toBeVisible();
    await expect(canvasElement.querySelector("[data-shape]")).toBeNull();
  },
};
