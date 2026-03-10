import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Card className="w-80" {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="body-2 text-body">
          This is the main content area of the card.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: (args) => (
    <Card className="w-80" {...args}>
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="body-2 text-body">A card with no footer.</p>
      </CardContent>
    </Card>
  ),
};

export const WithoutHeader: Story = {
  render: (args) => (
    <Card className="w-80" {...args}>
      <CardContent className="pt-6">
        <p className="body-2 text-body">A card with only content, no header.</p>
      </CardContent>
    </Card>
  ),
};
