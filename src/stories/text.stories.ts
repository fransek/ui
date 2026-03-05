import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./text";

const meta = {
  title: "Theme/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
