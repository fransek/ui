import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "./typography";

const meta = {
  title: "Theme/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
