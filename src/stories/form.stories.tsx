import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ToastProvider } from "../components/toast";
import { Form as FormComponent } from "./form";

const meta: Meta<typeof FormComponent> = {
  title: "Examples/Form",
  component: FormComponent,
  render: () => (
    <ToastProvider>
      <FormComponent />
    </ToastProvider>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Form: Story = {};
