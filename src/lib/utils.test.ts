import React from "react";
import { describe, expect, it, vi } from "vitest";
import { InputProps } from "../components/input";
import { mergeProps } from "./utils";

// mergeProps returns the intersection of its two argument types, so members
// whose static type is a union (e.g. `string | (state) => string`) aren't
// directly callable. This casts to the runtime shape we're asserting against.
const asFn = <T>(value: unknown) => value as (state: unknown) => T;

describe("mergeProps", () => {
  it("should merge string className and style props correctly", () => {
    const defaultRef = { current: null };
    const propsRef = { current: null };
    const node = {} as HTMLInputElement;

    const defaultProps = {
      className: "bg-red-500",
      style: { backgroundColor: "red" },
      ref: defaultRef,
    };

    const props = {
      className: "bg-blue-500 text-white",
      style: { backgroundColor: "blue", color: "white" },
      ref: propsRef,
    };

    const mergedProps = mergeProps<InputProps>(props, defaultProps);
    asFn<void>(mergedProps.ref)(node);

    expect(defaultRef.current).toBe(node);
    expect(propsRef.current).toBe(node);
    expect(mergedProps).toEqual({
      className: "bg-blue-500 text-white",
      style: { backgroundColor: "blue", color: "white" },
      ref: expect.any(Function),
    });
  });

  it("should merge function className and style props correctly", () => {
    const defaultRef = vi.fn();
    const propsRef = vi.fn();
    const node = {} as HTMLInputElement;

    const defaultProps = {
      className: () => "bg-red-500",
      style: () => ({ backgroundColor: "red" }),
      ref: defaultRef,
    };

    const props = {
      className: () => "bg-blue-500 text-white",
      style: () => ({ backgroundColor: "blue", color: "white" }),
      ref: propsRef,
    };

    const mergedProps = mergeProps<InputProps>(props, defaultProps);
    asFn<void>(mergedProps.ref)(node);

    expect(defaultRef).toHaveBeenCalledWith(node);
    expect(propsRef).toHaveBeenCalledWith(node);
    expect(asFn<string>(mergedProps.className)(null)).toBe(
      "bg-blue-500 text-white",
    );
    expect(asFn<React.CSSProperties>(mergedProps.style)(null)).toEqual({
      backgroundColor: "blue",
      color: "white",
    });
  });

  it("should merge a string default with a function override", () => {
    const mergedProps = mergeProps<InputProps>(
      { className: () => "bg-blue-500", style: () => ({ color: "white" }) },
      { className: "bg-red-500 p-2", style: { backgroundColor: "red" } },
    );

    expect(typeof mergedProps.className).toBe("function");
    // tailwind-merge drops the conflicting bg-red-500, keeps p-2 and bg-blue-500.
    expect(asFn<string>(mergedProps.className)(null)).toBe("p-2 bg-blue-500");
    expect(asFn<React.CSSProperties>(mergedProps.style)(null)).toEqual({
      backgroundColor: "red",
      color: "white",
    });
  });

  it("should merge a function default with a string override", () => {
    const mergedProps = mergeProps<InputProps>(
      { className: "bg-blue-500", style: { color: "white" } },
      {
        className: () => "bg-red-500 p-2",
        style: () => ({ backgroundColor: "red" }),
      },
    );

    expect(typeof mergedProps.className).toBe("function");
    expect(asFn<string>(mergedProps.className)(null)).toBe("p-2 bg-blue-500");
    expect(asFn<React.CSSProperties>(mergedProps.style)(null)).toEqual({
      backgroundColor: "red",
      color: "white",
    });
  });

  it("should keep the default when props are undefined", () => {
    const defaultRef = vi.fn();
    const node = {} as HTMLInputElement;

    // Sub-props like `labelProps` are typed `Props | undefined`, so model that
    // rather than a bare `undefined` (which would make `P & D` collapse).
    const props = undefined as unknown as InputProps;
    const mergedProps = mergeProps<InputProps>(props, {
      className: "bg-red-500",
      style: { backgroundColor: "red" },
      ref: defaultRef,
    });

    asFn<void>(mergedProps.ref)(node);

    expect(defaultRef).toHaveBeenCalledWith(node);
    expect(mergedProps.className).toBe("bg-red-500");
    expect(mergedProps.style).toEqual({ backgroundColor: "red" });
  });

  it("should not fabricate className, style, or ref when neither side has them", () => {
    const mergedProps = mergeProps<InputProps>(
      { id: "input" },
      { "data-testid": "field" },
    );

    expect(mergedProps).toEqual({ id: "input", "data-testid": "field" });
    expect("className" in mergedProps).toBe(false);
    expect("style" in mergedProps).toBe(false);
    expect("ref" in mergedProps).toBe(false);
  });
});
