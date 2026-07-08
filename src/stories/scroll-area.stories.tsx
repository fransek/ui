import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ScrollArea } from "../components/scroll-area";

const loremIpsum = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, ipsam
        vitae non quibusdam atque labore voluptas nulla culpa molestiae sed nemo
        repudiandae recusandae quisquam, odit unde laborum perferendis quod
        nihil quaerat excepturi eum obcaecati ad ut reiciendis. Harum, quisquam
        ipsum quidem consequuntur tempore ratione et quasi odio soluta
        distinctio repellat excepturi perspiciatis ex ea iure laborum suscipit
        veritatis officiis error aperiam quos. Aliquam soluta ex autem placeat
        dolorem earum, vitae deleniti numquam quae ullam commodi rem,
        dignissimos libero, molestias reiciendis dicta nisi laudantium quasi
        accusantium. Perspiciatis doloremque a veniam perferendis nihil
        aspernatur corrupti repellendus ea. Obcaecati ratione doloremque
        accusantium qui.`;

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    viewportProps: {
      className: "h-64 w-64 card",
    },
  },
  render: (args) => (
    <ScrollArea {...args}>
      <p>{loremIpsum}</p>
    </ScrollArea>
  ),
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <ScrollArea {...args}>
      <p className="w-[50rem]">{loremIpsum}</p>
    </ScrollArea>
  ),
};

export const Both: Story = {
  args: {
    orientation: "both",
  },
  render: (args) => (
    <ScrollArea {...args}>
      <p className="w-[24rem]">{loremIpsum}</p>
    </ScrollArea>
  ),
};
