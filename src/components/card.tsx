import React from "react";
import { cn } from "../lib/utils";

export type CardProps = React.ComponentPropsWithoutRef<"div">;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("bg-card text-foreground rounded-xl border", className)}
      {...props}
    />
  );
}

export type CardHeaderProps = React.ComponentPropsWithoutRef<"div">;

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
  );
}

export type CardTitleProps = React.ComponentPropsWithoutRef<"div">;

export function CardTitle({ className, ...props }: CardTitleProps) {
  return <div className={cn("heading-6", className)} {...props} />;
}

export type CardDescriptionProps = React.ComponentPropsWithoutRef<"div">;

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div className={cn("body-2 text-muted-foreground", className)} {...props} />
  );
}

export type CardContentProps = React.ComponentPropsWithoutRef<"div">;

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export type CardFooterProps = React.ComponentPropsWithoutRef<"div">;

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
  );
}
