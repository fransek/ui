import * as BaseUI from "@base-ui/react/avatar";
import * as BaseUIRender from "@base-ui/react/use-render";
import { User } from "lucide-react";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";

export interface AvatarProps extends BaseUI.AvatarRootProps {
  /** The image source. When omitted or failing to load, the fallback is shown. */
  src?: string;
  /** Alternative text for the image. Also used to derive fallback initials. */
  alt?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  shape?: AvatarShape;
  /**
   * Milliseconds to wait before showing the fallback, avoiding a flash of
   * fallback content while the image loads.
   */
  fallbackDelay?: number;
  /** Props forwarded to the image. */
  imageProps?: BaseUI.AvatarImageProps;
  /** Props forwarded to the fallback. */
  fallbackProps?: BaseUI.AvatarFallbackProps;
}

/**
 * Displays a user image, falling back to `children`, initials derived from
 * `alt`, or a generic user icon when no image is available.
 */
export function Avatar(props: AvatarProps) {
  const {
    src,
    alt,
    size = "md",
    variant = "muted",
    shape = "circle",
    fallbackDelay,
    imageProps,
    fallbackProps,
    children,
    ...restProps
  } = props;

  const initials = alt ? getInitials(alt) : "";

  return (
    <BaseUI.Avatar.Root
      {...mergeProps(restProps, {
        className: avatarStyles({ size, variant, shape }),
      })}
    >
      {src && (
        <BaseUI.Avatar.Image
          src={src}
          alt={alt}
          {...mergeProps(imageProps, {
            className: tw("size-full object-cover"),
          })}
        />
      )}
      <BaseUI.Avatar.Fallback
        delay={fallbackDelay}
        role={alt ? "img" : undefined}
        aria-label={alt}
        {...mergeProps(fallbackProps, {
          className: tw("flex size-full items-center justify-center"),
        })}
      >
        {children ?? (initials || <User className="size-[55%]" aria-hidden />)}
      </BaseUI.Avatar.Fallback>
    </BaseUI.Avatar.Root>
  );
}

export type AvatarGroupProps = BaseUIRender.useRender.ComponentProps<"div">;

/** Stacks avatars with a slight overlap. */
export function AvatarGroup(props: AvatarGroupProps) {
  const { render, ...restProps } = props;

  return BaseUIRender.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw("*:ring-background flex items-center -space-x-2 *:ring-2"),
    }),
  });
}

Avatar.Group = AvatarGroup;

/** Returns up to two uppercase initials from a name, e.g. "Ada Lovelace" → "AL". */
export function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

const baseAvatarStyles = tw(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden align-middle font-medium select-none",
);

const variantStyles = {
  primary: tw("primary"),
  secondary: tw("secondary"),
  tertiary: tw("tertiary"),
  muted: tw("muted"),
  danger: tw("danger"),
  "danger-subtle": tw("danger-subtle"),
  warning: tw("warning"),
  "warning-subtle": tw("warning-subtle"),
  success: tw("success"),
  "success-subtle": tw("success-subtle"),
};

const sizeStyles = {
  xs: tw("size-6 text-[0.625rem]"),
  sm: tw("size-8 text-xs"),
  md: tw("size-10 text-sm"),
  lg: tw("size-12 text-base"),
  xl: tw("size-16 text-xl"),
};

const shapeStyles = {
  circle: tw("rounded-full"),
  square: tw("rounded-md"),
};

export const avatarStyles = ({
  size = "md",
  variant = "muted",
  shape = "circle",
  extend,
}: {
  size?: AvatarSize;
  variant?: AvatarVariant;
  shape?: AvatarShape;
  extend?: string;
}) =>
  cn(
    baseAvatarStyles,
    variantStyles[variant],
    sizeStyles[size],
    shapeStyles[shape],
    extend,
  );

export type AvatarSize = keyof typeof sizeStyles;
export type AvatarVariant = keyof typeof variantStyles;
export type AvatarShape = keyof typeof shapeStyles;
