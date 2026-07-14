import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "../components/tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    defaultValue: "overview",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="projects">Projects</TabsTab>
        <TabsTab value="account">Account</TabsTab>
      </TabsList>
      <TabsPanel className="h-50" value="overview">
        Workspace stats and activity.
      </TabsPanel>
      <TabsPanel className="h-50" value="projects">
        Milestones and deadlines.
      </TabsPanel>
      <TabsPanel className="h-50" value="account">
        Profile and preferences.
      </TabsPanel>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="projects" disabled>
          Projects
        </TabsTab>
        <TabsTab value="account">Account</TabsTab>
      </TabsList>
      <TabsPanel className="h-50" value="overview">
        Workspace stats and activity.
      </TabsPanel>
      <TabsPanel className="h-50" value="projects">
        Milestones and deadlines.
      </TabsPanel>
      <TabsPanel className="h-50" value="account">
        Profile and preferences.
      </TabsPanel>
    </Tabs>
  ),
};

export const CustomStyle: Story = {
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <Tabs {...args} className="card body-sm">
      <TabsList className="border-b">
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="projects">Projects</TabsTab>
        <TabsTab value="account">Account</TabsTab>
      </TabsList>
      <TabsPanel className="h-50" value="overview">
        Workspace stats and activity.
      </TabsPanel>
      <TabsPanel className="h-50" value="projects">
        Milestones and deadlines.
      </TabsPanel>
      <TabsPanel className="h-50" value="account">
        Profile and preferences.
      </TabsPanel>
    </Tabs>
  ),
};
