import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Meter } from "../components/meter";

const meta = {
  title: "Components/Meter",
  component: Meter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "muted",
        "danger",
        "success",
        "warning",
      ],
    },
    label: { control: "text" },
    showValue: { control: "boolean" },
    value: { control: "number" },
  },
  args: {
    label: "Storage used",
    value: 24,
  },
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
};

export const WithoutValue: Story = {
  args: {
    showValue: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Meter label="Small" size="sm" value={40} />
      <Meter label="Medium" size="md" value={40} />
      <Meter label="Large" size="lg" value={40} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Meter label="Primary" variant="primary" value={65} />
      <Meter label="Secondary" variant="secondary" value={65} />
      <Meter label="Muted" variant="muted" value={65} />
      <Meter label="Success" variant="success" value={65} />
      <Meter label="Warning" variant="warning" value={65} />
      <Meter label="Danger" variant="danger" value={65} />
    </div>
  ),
};

export const CustomRange: Story = {
  args: {
    label: "Score",
    min: 0,
    max: 10,
    value: 7,
  },
};
