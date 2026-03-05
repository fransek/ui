import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleCheckBig } from "lucide-react";
import React from "react";
import { Button } from "../components/button";

const meta = {
  title: "Button",
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

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "md",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "md",
  },
};

export const Destructive: Story = {
  args: {
    variant: "error",
    size: "md",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "success",
    size: "md",
    children: (
      <>
        <CircleCheckBig className="h-5 w-5" />
        Icon
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: true,
  },
};
