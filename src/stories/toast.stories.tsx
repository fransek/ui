import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../components/button";
import { ToastProvider, ToastType, useToast } from "../components/toast";

function ToastButtons() {
  const toast = useToast();

  const notify = (type?: ToastType) =>
    toast.add({
      type,
      title: type ? `${type[0].toUpperCase()}${type.slice(1)}` : "Notification",
      description: "This is a toast notification.",
    });

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => notify()}>
        Default
      </Button>
      <Button variant="outline" onClick={() => notify("info")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => notify("success")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => notify("warning")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => notify("error")}>
        Error
      </Button>
    </div>
  );
}

const meta = {
  title: "Components/Toast",
  component: ToastProvider,
  render: (args) => (
    <ToastProvider {...args}>
      <ToastButtons />
    </ToastProvider>
  ),
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## Anatomy

\`\`\`tsx
import { ToastProvider, useToast } from "@fransek/ui";

// Once, near the root of your app:
<ToastProvider>
  <App />
</ToastProvider>;

// Anywhere inside <ToastProvider>:
const toast = useToast();
toast.add({ type: "success", title: "...", description: "..." });
\`\`\`

- **\`ToastProvider\`** – the root. Wraps Base UI's \`Toast.Provider\`,
  \`Toast.Portal\`, and \`Toast.Viewport\`, positioned by the \`position\` prop.
  For each active toast it renders a \`Toast.Root\` containing \`Toast.Content\`
  (with a type icon, \`Toast.Title\`, and \`Toast.Description\`) and a
  \`Toast.Close\` button — these parts are managed internally and aren't
  composed directly.
- **\`useToast\`** – returns the toast manager (\`BaseUIToast.useToastManager\`)
  used to \`add\`, \`update\`, or \`close\` toasts from anywhere inside
  \`ToastProvider\`.
- **\`createToastManager\`** – creates a toast manager outside of React, e.g. to
  share across multiple \`ToastProvider\` instances.
`,
      },
    },
  },
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
    timeout: { control: "number" },
    limit: { control: "number" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    timeout: 5000,
  },
};

export const TopCenter: Story = {
  args: {
    position: "top-center",
  },
};

export const Persistent: Story = {
  args: {
    timeout: 0,
  },
};
