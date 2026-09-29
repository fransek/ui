import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Tabs } from "../components/tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    defaultValue: "overview",
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="projects">Projects</Tabs.Tab>
        <Tabs.Tab value="account">Account</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel className="h-50" value="overview">
        Workspace stats and activity.
      </Tabs.Panel>
      <Tabs.Panel className="h-50" value="projects">
        Milestones and deadlines.
      </Tabs.Panel>
      <Tabs.Panel className="h-50" value="account">
        Profile and preferences.
      </Tabs.Panel>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="projects" disabled>
          Projects
        </Tabs.Tab>
        <Tabs.Tab value="account">Account</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel className="h-50" value="overview">
        Workspace stats and activity.
      </Tabs.Panel>
      <Tabs.Panel className="h-50" value="projects">
        Milestones and deadlines.
      </Tabs.Panel>
      <Tabs.Panel className="h-50" value="account">
        Profile and preferences.
      </Tabs.Panel>
    </Tabs>
  ),
};

export const CustomStyle: Story = {
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <Tabs {...args} className="card body-sm">
      <Tabs.List className="border-b">
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="projects">Projects</Tabs.Tab>
        <Tabs.Tab value="account">Account</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel className="h-50" value="overview">
        Workspace stats and activity.
      </Tabs.Panel>
      <Tabs.Panel className="h-50" value="projects">
        Milestones and deadlines.
      </Tabs.Panel>
      <Tabs.Panel className="h-50" value="account">
        Profile and preferences.
      </Tabs.Panel>
    </Tabs>
  ),
};
