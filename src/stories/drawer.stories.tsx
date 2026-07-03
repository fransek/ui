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

\`\`\`tsx
import { Drawer, DrawerTitle, DrawerDescription, DrawerClose } from "@fransek/ui";

<Drawer trigger={<button>Open</button>}>
  <DrawerTitle>...</DrawerTitle>
  <DrawerDescription>...</DrawerDescription>
  <DrawerClose />
</Drawer>;
\`\`\`

- **\`Drawer\`** – the root. Wraps Base UI's \`Drawer.Root\`, \`Drawer.Trigger\`
  (rendered from the \`trigger\` prop), \`Drawer.Portal\`, \`Drawer.Backdrop\`,
  \`Drawer.Viewport\`, \`Drawer.Popup\` (which also renders a close button
  unless \`disablePointerDismissal\` is set), and \`Drawer.Content\`. \`children\`
  is rendered inside the content area.
- **\`DrawerTitle\`** – wraps \`Drawer.Title\`.
- **\`DrawerDescription\`** – wraps \`Drawer.Description\`.
- **\`DrawerClose\`** – wraps \`Drawer.Close\`. Pass \`render\` to use a custom
  trigger element, such as a \`Button\`.
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
