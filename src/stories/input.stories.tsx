import type { Meta, StoryObj } from "@storybook/react-vite";

import { Info, Search } from "lucide-react";
import React from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Popover, PopoverTrigger } from "../components/popover";

const meta = {
  title: "Components/Fields/Input",
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
    infoPopover: { control: "text" },
  },
  args: {
    label: "Username",
    description: "Please enter your username.",
    placeholder: "Enter username",
    isValidating: false,
    isValidatingMessage: "Checking availability...",
    infoPopover:
      "Your username should be unique and contain 4-16 characters. It can include letters, numbers, and underscores.",
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
    rightSlot: (
      <Button
        aria-label="search"
        variant="outline"
        size="icon"
        className="w-12"
      >
        <Search className="size-5" />
      </Button>
    ),
  },
};

export const WithInfoPopover: Story = {
  args: {
    rightSlot: (
      <Popover>
        <PopoverTrigger
          render={
            <Button size="icon" variant="ghost">
              <Info className="size-4" />
            </Button>
          }
        />
        <p className="body-2 text-body">
          Your username should be unique and contain 4-16 characters.
          <br /> It can include letters, numbers, and underscores.
        </p>
      </Popover>
    ),
  },
};
