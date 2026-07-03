import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../components/button";
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerTitle,
} from "../components/drawer";

const meta = {
  title: "Components/Drawer",
  render: (args) => (
    <Drawer {...args} trigger={<Button variant="outline">Open drawer</Button>}>
      <DrawerTitle>Drawer</DrawerTitle>
      <DrawerDescription>
        This is a drawer that slides in from the side. You can swipe to dismiss
        it.
      </DrawerDescription>
      <div className="mt-4 flex justify-end gap-4">
        <DrawerClose render={<Button variant="secondary">Cancel</Button>} />
        <DrawerClose render={<Button variant="primary">Confirm</Button>} />
      </div>
    </Drawer>
  ),
  component: Drawer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## Anatomy

\`\`\`jsx
import { Drawer, DrawerTitle, DrawerDescription, DrawerClose } from "@fransek/ui";

<Drawer trigger={<button>Open</button>}>
  <DrawerTitle>...</DrawerTitle>
  <DrawerDescription>...</DrawerDescription>
  <DrawerClose />
</Drawer>;
\`\`\`
`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const DisablePointerDismissal: Story = {
  args: {
    disablePointerDismissal: true,
  },
};

export const CustomWidth: Story = {
  args: {
    width: "40rem",
  },
};
