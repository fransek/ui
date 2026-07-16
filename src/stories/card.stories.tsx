import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../components/button";
import {
  Card,
  CardBody,
  CardClose,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "../components/card";
import { useMediaQuery } from "../lib/utils";

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

const description =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, possimus praesentium? Possimus ullam laudantium nisi, laboriosam illum voluptatem nesciunt quidem?";

export const Basic: Story = {
  render: () => (
    <Card className="max-w-100">
      <CardClose />
      <CardContent>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardBody>
          <CardDescription>{description}</CardDescription>
        </CardBody>
        <CardFooter>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </CardFooter>
      </CardContent>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="max-w-100">
      <CardImage src="https://picsum.photos/800/400" alt="Card image" />
      <CardClose variant="secondary" />
      <CardContent>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardBody>
          <CardDescription>{description}</CardDescription>
        </CardBody>
        <CardFooter>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </CardFooter>
      </CardContent>
    </Card>
  ),
};

export const Responsive: Story = {
  render: () => {
    const sm = useMediaQuery("sm");
    return (
      <Card className="max-w-100 sm:max-w-180 sm:flex-row">
        <CardImage
          src="https://picsum.photos/400/400"
          className="hidden size-60 sm:block"
          alt="Card image"
        />
        <CardImage
          src="https://picsum.photos/800/400"
          className="sm:hidden"
          alt="Card image"
        />
        <CardClose variant={sm ? "ghost" : "secondary"} />
        <CardContent>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardBody>
            <CardDescription>{description}</CardDescription>
          </CardBody>
          <CardFooter>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save</Button>
          </CardFooter>
        </CardContent>
      </Card>
    );
  },
};

export const InfoCard: Story = {
  render: () => (
    <Card className="max-w-100">
      <CardClose />
      <CardContent className="pr-10">
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  ),
};
