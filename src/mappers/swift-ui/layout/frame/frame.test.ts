import convertFrame from "./frame";
import { frame } from "@expo/ui/swift-ui/modifiers";

describe("convertFrame", () => {
  it("emits frame with width and height", () => {
    const result = convertFrame({ width: 100, height: 200 });
    expect(result).toEqual(frame({ width: 100, height: 200 }));
  });

  it("ignores 'auto' dimensions", () => {
    const result = convertFrame({ width: "auto" as any, height: 200 });
    expect(result).toEqual(frame({ height: 200 }));
  });

  it("includes min/max constraints", () => {
    const result = convertFrame({
      width: 100,
      minWidth: 50,
      maxWidth: 200,
    });
    expect(result).toEqual(frame({ width: 100, minWidth: 50, maxWidth: 200 }));
  });

  it("maps 100% width to Infinity", () => {
    const result = convertFrame({ width: "100%" as any });
    expect(result).toEqual(frame({ width: Infinity }));
  });

  it("maps 100% height to Infinity", () => {
    const result = convertFrame({ height: "100%" as any });
    expect(result).toEqual(frame({ height: Infinity }));
  });

  it("returns frame with all constraints when present", () => {
    const result = convertFrame({
      width: 100,
      height: 200,
      minWidth: 50,
      maxWidth: 300,
      minHeight: 100,
      maxHeight: 400,
    });
    expect(result).toEqual(
      frame({
        width: 100,
        height: 200,
        minWidth: 50,
        maxWidth: 300,
        minHeight: 100,
        maxHeight: 400,
      }),
    );
  });

  it("warns and ignores unsupported dimension strings", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const result = convertFrame({ width: "50%" as any });
    expect(result).toEqual(frame({}));
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Unsupported dimension value: 50%"),
    );
    warnSpy.mockRestore();
  });

  it("ignores string values for min/max constraints", () => {
    const result = convertFrame({ minWidth: "100" as any });
    expect(result).toEqual(frame({}));
  });

  it("ignores non-string non-number dimensions", () => {
    const result = convertFrame({ width: true as any });
    expect(result).toEqual(frame({}));
  });

  it("ignores invalid types for min/max constraints", () => {
    const result = convertFrame({
      minWidth: true as any,
      maxHeight: {} as any,
    });
    expect(result).toEqual(frame({}));
  });
});

describe("convertFrame with __DEV__ false", () => {
  const originalDev = (global as any).__DEV__;

  beforeEach(() => {
    (global as any).__DEV__ = false;
  });

  afterEach(() => {
    (global as any).__DEV__ = originalDev;
  });

  it("does not warn for unsupported dimensions when __DEV__ is false", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const result = convertFrame({ width: "50%" as any });
    expect(result).toEqual(frame({}));
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
