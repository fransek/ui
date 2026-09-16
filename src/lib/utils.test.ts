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
    const defaultProps = {
      className: "bg-red-500",
      style: { backgroundColor: "red" },
    };

    const props = {
      className: "bg-blue-500 text-white",
      style: { backgroundColor: "blue", color: "white" },
    };

    const mergedProps = mergeProps<InputProps>(props, defaultProps);

    expect(mergedProps).toEqual({
      className: "bg-blue-500 text-white",
      style: { backgroundColor: "blue", color: "white" },
    });
  });

  it("should merge function className and style props correctly", () => {
    const defaultProps = {
      className: () => "bg-red-500",
      style: () => ({ backgroundColor: "red" }),
    };

    const props = {
      className: () => "bg-blue-500 text-white",
      style: () => ({ backgroundColor: "blue", color: "white" }),
    };

    const mergedProps = mergeProps<InputProps>(props, defaultProps);

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

    // Sub-props like `labelProps` are typed `Props | undefined`, so model that
    // rather than a bare `undefined` (which would make `P & D` collapse).
    const props = undefined as unknown as InputProps;
    const mergedProps = mergeProps<InputProps>(props, {
      className: "bg-red-500",
      style: { backgroundColor: "red" },
      ref: defaultRef,
    });

    expect(mergedProps.ref).toBe(defaultRef);
    expect(mergedProps.className).toBe("bg-red-500");
    expect(mergedProps.style).toEqual({ backgroundColor: "red" });
  });

  it("should spread refs without ever merging them", () => {
    // A merged ref has to be built during render, so it would arrive with a new
    // identity every render and React would detach and reattach it on every
    // commit. Base UI primitives register their trigger element from that
    // callback ref and write the registration into a store, which loops back
    // into another render. Combining refs is `useMergeProps`'s job.
    const propsRef = vi.fn();
    const defaultRef = vi.fn();

    expect(mergeProps<InputProps>({ ref: propsRef }, {}).ref).toBe(propsRef);
    expect(mergeProps<InputProps>({}, { ref: defaultRef }).ref).toBe(
      defaultRef,
    );
    expect(
      mergeProps<InputProps>({ ref: propsRef }, { ref: defaultRef }).ref,
    ).toBe(propsRef);
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
