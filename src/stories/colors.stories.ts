import type { Meta, StoryObj } from "@storybook/react-vite";
import { Colors as ColorsComponent } from "./colors";

const meta = {
  title: "Theme/Colors",
  component: ColorsComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ColorsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {};
