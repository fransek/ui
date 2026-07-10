import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleCheckBig, Trash } from "lucide-react";
import React from "react";
import { Button, ButtonVariant } from "../components/button";

const variants: ButtonVariant[] = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "muted",
  "outline",
  "ghost",
  "link",
] as const;

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    variant: "success",
    size: "md",
  },
  render: (args) => (
    <Button {...args}>
      <CircleCheckBig className="h-5 w-5" />
      Icon
    </Button>
  ),
};

export const IconButton: Story = {
  args: {
    variant: "outline",
    size: "icon",
  },
  render: (args) => (
    <Button {...args}>
      <Trash className="size-5" />
    </Button>
  ),
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: true,
  },
};
