import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../components/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "../components/dialog";

const meta = {
  title: "Components/Dialog",
  render: (args) => (
    <Dialog {...args} trigger={<Button variant="outline">Open Dialog</Button>}>
      <DialogTitle className="mb-2">Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
      <div className="flex justify-end gap-4">
        <DialogClose render={<Button variant="primary">OK</Button>} />
        <DialogClose render={<Button variant="secondary">Cancel</Button>} />
      </div>
    </Dialog>
  ),
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## Anatomy

\`\`\`jsx
import { Dialog, DialogTitle, DialogDescription, DialogClose } from "@fransek/ui";

<Dialog trigger={<button>Open</button>}>
  <DialogTitle>...</DialogTitle>
  <DialogDescription>...</DialogDescription>
  <DialogClose />
</Dialog>;
\`\`\`
`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const DisablePointerDismissal: Story = {
  args: {
    disablePointerDismissal: true,
  },
};
