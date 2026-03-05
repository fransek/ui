import type { Meta, StoryObj } from "@storybook/react-vite";
import { Colors } from "./colors";

const meta = {
  title: "Theme/Colors",
  component: Colors,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
