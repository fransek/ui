import type { Meta, StoryObj } from "@storybook/react-vite";

import { InfoPopover } from "../components/info-popover";

const meta = {
  title: "Components/InfoPopover",
  component: InfoPopover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
  },
  args: {
    children:
      "Info popovers provide additional context or information about a field. They can be used to explain complex concepts, provide tips, or offer guidance to users.",
  },
} satisfies Meta<typeof InfoPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
