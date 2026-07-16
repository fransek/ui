import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Slider } from "../components/slider";

const meta = {
  title: "Components/Fields/Slider",
  component: Slider,
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
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    showValue: { control: "boolean" },
    thumbLabel: { control: "boolean" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
  },
  args: {
    label: "Volume",
    description: "Adjust the playback volume.",
    showValue: true,
    defaultValue: 40,
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithThumbLabel: Story = {
  args: {
    label: "Brightness",
    description: "Hover, focus, or drag the thumb to see the value.",
    thumbLabel: true,
    defaultValue: 60,
  },
};

export const Range: Story = {
  args: {
    label: "Price range",
    description: "Select a minimum and maximum price.",
    defaultValue: [25, 75],
    thumbLabel: true,
  },
};

export const Steps: Story = {
  args: {
    label: "Rating",
    description: "Snaps to increments of 10.",
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 50,
  },
};

export const Disabled: Story = {
  args: {
    label: "Volume",
    description: "This control is disabled.",
    disabled: true,
    defaultValue: 40,
  },
};

export const Invalid: Story = {
  args: {
    label: "Volume",
    errorMessage: "Please choose a lower value.",
    defaultValue: 90,
  },
};

export const Validating: Story = {
  args: {
    label: "Volume",
    isValidating: true,
    isValidatingMessage: "Validating...",
    defaultValue: 40,
  },
};
