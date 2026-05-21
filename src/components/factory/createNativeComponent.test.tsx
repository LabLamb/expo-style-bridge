import React from "react";
import {
  createNativeComponent,
  useStyleConversion,
} from "./createNativeComponent";

jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return {
    ...actual,
    useMemo: (fn: any) => fn(),
    forwardRef: (render: any) => render,
  };
});

describe("createNativeComponent", () => {
  let createElementSpy: jest.SpyInstance;

  beforeEach(() => {
    createElementSpy = jest.spyOn(React, "createElement");
  });

  afterEach(() => {
    createElementSpy.mockRestore();
  });

  function getNativeProps() {
    // The wrapper calls React.createElement(NativeComponent, props)
    return createElementSpy.mock.calls[0][1];
  }

  it("renders and passes modifiers for style prop", () => {
    const convertStyle = jest.fn(() => [{ $type: "opacity", value: 0.5 }]);
    const NativeComponent = () => null;
    const Wrapper = createNativeComponent({
      nativeComponent: NativeComponent as any,
      convertStyle,
    });

    const ref = { current: null };
    Wrapper({ style: { opacity: 0.5 } }, ref);

    expect(getNativeProps().modifiers).toEqual([
      { $type: "opacity", value: 0.5 },
    ]);
    expect(convertStyle).toHaveBeenCalledWith({ opacity: 0.5 });
  });

  it("returns undefined modifiers when style is undefined", () => {
    const convertStyle = jest.fn(() => []);
    const NativeComponent = () => null;
    const Wrapper = createNativeComponent({
      nativeComponent: NativeComponent as any,
      convertStyle,
    });

    Wrapper({}, null);

    expect(getNativeProps().modifiers).toBeUndefined();
    expect(convertStyle).not.toHaveBeenCalled();
  });

  it("flattens array style", () => {
    const convertStyle = jest.fn(() => []);
    const NativeComponent = () => null;
    const Wrapper = createNativeComponent({
      nativeComponent: NativeComponent as any,
      convertStyle,
    });

    Wrapper({ style: [{ opacity: 0.5 }, { padding: 10 }] }, null);

    expect(convertStyle).toHaveBeenCalledWith({ opacity: 0.5, padding: 10 });
  });

  it("filters props with propFilter", () => {
    const convertStyle = jest.fn(() => []);
    const NativeComponent = () => null;
    const Wrapper = createNativeComponent({
      nativeComponent: NativeComponent as any,
      convertStyle,
      propFilter: (key) => key !== "excluded",
    });

    Wrapper({ style: {}, included: "yes", excluded: "no" }, null);

    const props = getNativeProps();
    expect(props.included).toBe("yes");
    expect(props.excluded).toBeUndefined();
  });

  it("applies postProcessModifiers", () => {
    const convertStyle = jest.fn(() => [{ $type: "a" }]);
    const postProcess = jest.fn((mods) => [...mods, { $type: "b" }]);
    const NativeComponent = () => null;
    const Wrapper = createNativeComponent({
      nativeComponent: NativeComponent as any,
      convertStyle,
      postProcessModifiers: postProcess,
    });

    Wrapper({ style: { opacity: 0.5 } }, null);

    expect(getNativeProps().modifiers).toEqual([
      { $type: "a" },
      { $type: "b" },
    ]);
    expect(postProcess).toHaveBeenCalledWith(
      [{ $type: "a" }],
      expect.any(Object),
    );
  });

  it("forwards ref", () => {
    const NativeComponent = () => null;
    const Wrapper = createNativeComponent({
      nativeComponent: NativeComponent as any,
      convertStyle: () => [],
    });

    const ref = { current: null };
    Wrapper({ style: {} }, ref);

    expect(getNativeProps().ref).toBe(ref);
  });

  it("passes other props through", () => {
    const NativeComponent = () => null;
    const Wrapper = createNativeComponent({
      nativeComponent: NativeComponent as any,
      convertStyle: () => [],
    });

    Wrapper({ style: {}, foo: "bar", num: 42 }, null);

    const props = getNativeProps();
    expect(props.foo).toBe("bar");
    expect(props.num).toBe(42);
  });

  it("handles null entries in style array", () => {
    const convertStyle = jest.fn(() => []);
    const NativeComponent = () => null;
    const Wrapper = createNativeComponent({
      nativeComponent: NativeComponent as any,
      convertStyle,
    });

    Wrapper({ style: [{ opacity: 0.5 }, null, { padding: 10 }] }, null);

    expect(convertStyle).toHaveBeenCalledWith({ opacity: 0.5, padding: 10 });
  });

  it("handles empty style array", () => {
    const convertStyle = jest.fn(() => []);
    const NativeComponent = () => null;
    const Wrapper = createNativeComponent({
      nativeComponent: NativeComponent as any,
      convertStyle,
    });

    Wrapper({ style: [] }, null);

    // flattenStyle([]) returns {}, which is truthy, so convertStyle IS called with {}
    expect(convertStyle).toHaveBeenCalledWith({});
    expect(getNativeProps().modifiers).toEqual([]);
  });
});

describe("useStyleConversion", () => {
  it("returns undefined for undefined style", () => {
    expect(useStyleConversion(undefined, "ios")).toBeUndefined();
  });

  it("returns SwiftUI modifiers for ios", () => {
    const mods = useStyleConversion({ opacity: 0.5 }, "ios");
    expect(mods).toBeDefined();
    expect(mods!.length).toBeGreaterThan(0);
    expect(mods![0]).toMatchObject({ $type: "opacity" });
  });

  it("returns Jetpack Compose modifiers for android", () => {
    const mods = useStyleConversion({ opacity: 0.5 }, "android");
    expect(mods).toBeDefined();
    expect(mods!.length).toBeGreaterThan(0);
  });

  it("flattens array style", () => {
    const mods = useStyleConversion([{ opacity: 0.5 }, { padding: 10 }], "ios");
    expect(mods).toBeDefined();
    expect(mods!.length).toBeGreaterThanOrEqual(2);
  });

  it("returns modifiers for empty array style", () => {
    // flattenStyle([]) returns {}, which is truthy and produces empty modifiers
    const mods = useStyleConversion([], "ios");
    expect(mods).toEqual([]);
  });
});
