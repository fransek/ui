import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleCheckBig, Trash } from "lucide-react";
import React from "react";
import { Button, ButtonVariant } from "../components/button";

const variants: ButtonVariant[] = [
  "primary",
  "secondary",
  "success",
  "success-subtle",
  "warning",
  "warning-subtle",
  "danger",
  "danger-subtle",
  "muted",
  "outline",
  "ghost",
  "link",
] as const;

function kebabCaseToCapitalized(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

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
          {kebabCaseToCapitalized(variant)}
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
    tooltip: "Delete",
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
