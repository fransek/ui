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

\`\`\`tsx
import { Dialog, DialogTitle, DialogDescription, DialogClose } from "@fransek/ui";

<Dialog trigger={<button>Open</button>}>
  <DialogTitle>...</DialogTitle>
  <DialogDescription>...</DialogDescription>
  <DialogClose />
</Dialog>;
\`\`\`

- **\`Dialog\`** – the root. Wraps Base UI's \`Dialog.Root\`, \`Dialog.Trigger\`
  (rendered from the \`trigger\` prop), \`Dialog.Portal\`, \`Dialog.Backdrop\`,
  and \`Dialog.Popup\` (which also renders a close button unless
  \`disablePointerDismissal\` is set). \`children\` is rendered inside the popup.
- **\`DialogTitle\`** – wraps \`Dialog.Title\`.
- **\`DialogDescription\`** – wraps \`Dialog.Description\`.
- **\`DialogClose\`** – wraps \`Dialog.Close\`. Pass \`render\` to use a custom
  trigger element, such as a \`Button\`.
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
