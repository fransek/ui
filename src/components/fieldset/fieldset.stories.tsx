import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Input } from "../input";
import { Fieldset } from "./fieldset";

const meta = {
  title: "Components/Fieldset",
  component: Fieldset,
  render: (args) => (
    <Fieldset {...args}>
      <Input label="Street Address" />
      <Input label="City" />
      <Input label="State" />
      <Input label="Zip Code" />
    </Fieldset>
  ),
  args: {
    legend: "Address",
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
