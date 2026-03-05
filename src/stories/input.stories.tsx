import type { Meta, StoryObj } from "@storybook/react-vite";

import { Search } from "lucide-react";
import React from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    errorMessage: { control: "text" },
    isValidatingMessage: { control: "text" },
    description: { control: "text" },
  },
  args: {
    label: "Username",
    description: "Please enter your username.",
    placeholder: "Enter username",
    isValidating: false,
    isValidatingMessage: "Checking availability...",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Error: Story = {
  args: {
    errorMessage: "This field is required.",
  },
};

export const Validating: Story = {
  args: {
    isValidating: true,
  },
};

export const WithButton: Story = {
  args: {
    label: "Search components",
    description: undefined,
    placeholder: "Search...",
    button: (
      <Button aria-label="search" variant="outline">
        <Search className="size-5" />
      </Button>
    ),
  },
};
