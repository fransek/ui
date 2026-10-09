import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, waitFor } from "storybook/test";
import { Avatar } from "./avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "muted",
        "danger",
        "danger-subtle",
        "warning",
        "warning-subtle",
        "success",
        "success-subtle",
      ],
    },
    shape: {
      control: "inline-radio",
      options: ["circle", "square"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const imageSrc =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#6366f1"/><circle cx="20" cy="16" r="7" fill="#e0e7ff"/><rect x="8" y="26" width="24" height="14" rx="7" fill="#e0e7ff"/></svg>',
  );

export const Basic: Story = {
  args: {
    src: imageSrc,
    alt: "Ada Lovelace",
  },
  play: async ({ canvas }) => {
    await waitFor(() =>
      expect(canvas.getByRole("img", { name: "Ada Lovelace" }).tagName).toBe(
        "IMG",
      ),
    );
  },
};

export const Initials: Story = {
  args: {
    alt: "Ada Lovelace",
  },
  play: async ({ canvas }) => {
    const fallback = await canvas.findByRole("img", { name: "Ada Lovelace" });
    await expect(fallback).toHaveTextContent("AL");
  },
};

export const BrokenImage: Story = {
  args: {
    src: "/does-not-exist.png",
    alt: "Grace Hopper",
  },
  play: async ({ canvas }) => {
    await waitFor(() => expect(canvas.getByText("GH")).toBeVisible());
    await expect(canvas.queryByRole("img", { name: "Grace Hopper" })).toBe(
      canvas.getByText("GH"),
    );
  },
};

export const IconFallback: Story = {
  args: {},
};

export const CustomFallback: Story = {
  args: {
    variant: "primary",
    children: "?",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" alt="Ada Lovelace" />
      <Avatar size="sm" alt="Ada Lovelace" />
      <Avatar size="md" alt="Ada Lovelace" />
      <Avatar size="lg" alt="Ada Lovelace" />
      <Avatar size="xl" alt="Ada Lovelace" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar variant="primary" alt="Primary" />
      <Avatar variant="secondary" alt="Secondary" />
      <Avatar variant="tertiary" alt="Tertiary" />
      <Avatar variant="muted" alt="Muted" />
      <Avatar variant="danger" alt="Danger" />
      <Avatar variant="danger-subtle" alt="Danger Subtle" />
      <Avatar variant="warning" alt="Warning" />
      <Avatar variant="warning-subtle" alt="Warning Subtle" />
      <Avatar variant="success" alt="Success" />
      <Avatar variant="success-subtle" alt="Success Subtle" />
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar shape="square" src={imageSrc} alt="Ada Lovelace" />
      <Avatar shape="square" alt="Ada Lovelace" />
      <Avatar shape="square" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <Avatar.Group>
      <Avatar src={imageSrc} alt="Ada Lovelace" />
      <Avatar variant="primary" alt="Grace Hopper" />
      <Avatar variant="success-subtle" alt="Alan Turing" />
      <Avatar variant="muted">+3</Avatar>
    </Avatar.Group>
  ),
};
