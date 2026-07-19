import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CheckCircle,
  ChevronRight,
  Info,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";
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

export const LinkCard: Story = {
  render: () => (
    <Card
      className="group max-w-100 transition-transform hover:-translate-y-1"
      render={<a href="/" />}
    >
      <CardContent className="flex-row items-center gap-4">
        <div className="flex flex-col gap-2">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardBody>
            <CardDescription>{description}</CardDescription>
          </CardBody>
        </div>
        <div>
          <ChevronRight className="text-muted-fg transition-transform group-active:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  ),
};

export const ColoredCards: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="bg-primary/5 border-primary-fg max-w-100">
        <CardContent>
          <CardHeader>
            <CardTitle className="text-primary-fg flex items-center gap-2">
              <Info className="size-5" />
              Primary
            </CardTitle>
          </CardHeader>
          <CardBody>
            <CardDescription className="text-primary-fg">
              {description}
            </CardDescription>
          </CardBody>
        </CardContent>
      </Card>
      <Card className="bg-success/5 border-success-fg max-w-100">
        <CardContent>
          <CardHeader>
            <CardTitle className="text-success-fg flex items-center gap-2">
              <CheckCircle className="size-5" />
              Success
            </CardTitle>
          </CardHeader>
          <CardBody>
            <CardDescription className="text-success-fg">
              {description}
            </CardDescription>
          </CardBody>
        </CardContent>
      </Card>
      <Card className="bg-warning/5 border-warning-fg max-w-100">
        <CardContent>
          <CardHeader>
            <CardTitle className="text-warning-fg flex items-center gap-2">
              <TriangleAlert className="size-5" />
              Warning
            </CardTitle>
          </CardHeader>
          <CardBody>
            <CardDescription className="text-warning-fg">
              {description}
            </CardDescription>
          </CardBody>
        </CardContent>
      </Card>
      <Card className="bg-danger/5 border-danger-fg max-w-100">
        <CardContent>
          <CardHeader>
            <CardTitle className="text-danger-fg flex items-center gap-2">
              <ShieldAlert className="size-5" />
              Danger
            </CardTitle>
          </CardHeader>
          <CardBody>
            <CardDescription className="text-danger-fg">
              {description}
            </CardDescription>
          </CardBody>
        </CardContent>
      </Card>
    </div>
  ),
};
