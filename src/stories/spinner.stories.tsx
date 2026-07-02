import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../components/button";
import { Spinner } from "../components/spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
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
      options: ["primary", "secondary", "muted", "error", "success", "current"],
    },
    textPosition: {
      control: "inline-radio",
      options: ["bottom", "right"],
    },
    loopTexts: { control: "boolean" },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "md",
    variant: "primary",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner variant="primary" />
      <Spinner variant="secondary" />
      <Spinner variant="muted" />
      <Spinner variant="error" />
      <Spinner variant="success" />
    </div>
  ),
};

export const WithText: Story = {
  args: {
    size: "md",
    variant: "primary",
    text: "Loading…",
  },
};

export const WithTextRight: Story = {
  args: {
    size: "md",
    variant: "primary",
    text: "Loading…",
    textPosition: "right",
  },
};

export const CyclingText: Story = {
  args: {
    size: "md",
    variant: "primary",
    texts: [
      "Loading…",
      "Fetching your data…",
      "Almost there…",
      "Just a moment…",
    ],
    interval: 2000,
  },
};

export const CyclingTextNoLoop: Story = {
  args: {
    size: "md",
    variant: "primary",
    texts: ["Loading...", "Still loading..."],
    interval: 2000,
    loopTexts: false,
  },
};

export const Delayed: Story = {
  args: {
    size: "md",
    variant: "primary",
    text: "This appears after 1s",
    delay: 1000,
  },
};

export const InButton: Story = {
  render: () => (
    <Button disabled>
      <Spinner size="sm" variant="current" />
      Loading
    </Button>
  ),
};
