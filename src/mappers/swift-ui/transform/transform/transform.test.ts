import convertTransform from "./transform";
import {
  scaleEffect,
  rotationEffect,
  offset,
} from "@expo/ui/swift-ui/modifiers";

describe("convertTransform", () => {
  it("emits scaleEffect for scale operation", () => {
    const result = convertTransform({ transform: [{ scale: 2 }] });
    expect(result).toEqual([scaleEffect(2)]);
  });

  it("emits scaleEffect for scaleX operation", () => {
    const result = convertTransform({ transform: [{ scaleX: 3 }] });
    expect(result).toEqual([scaleEffect(3)]);
  });

  it("emits scaleEffect for scaleY operation", () => {
    const result = convertTransform({ transform: [{ scaleY: 4 }] });
    expect(result).toEqual([scaleEffect(4)]);
  });

  it("emits rotationEffect for rotate operation", () => {
    const result = convertTransform({ transform: [{ rotate: "45deg" }] });
    expect(result).toEqual([rotationEffect(45)]);
  });

  it("emits offset for translateX and translateY", () => {
    const result = convertTransform({
      transform: [{ translateX: 10 }, { translateY: 20 }],
    });
    expect(result).toEqual([offset({ x: 10, y: 0 }), offset({ x: 0, y: 20 })]);
  });

  it("preserves order of operations", () => {
    const result = convertTransform({
      transform: [{ translateX: 10 }, { scale: 2 }, { rotate: "90deg" }],
    });
    expect(result).toEqual([
      offset({ x: 10, y: 0 }),
      scaleEffect(2),
      rotationEffect(90),
    ]);
  });

  it("returns empty array for unsupported operations", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const result = convertTransform({ transform: [{ perspective: 100 }] });
    expect(result).toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("perspective")
    );
    warnSpy.mockRestore();
  });

  it("returns empty array when transform is undefined", () => {
    const result = convertTransform({});
    expect(result).toEqual([]);
  });

  it("parses rotation without deg suffix", () => {
    const result = convertTransform({ transform: [{ rotate: "45" }] });
    expect(result).toEqual([rotationEffect(45)]);
  });

  it("falls back to 0 for invalid rotation string", () => {
    const result = convertTransform({ transform: [{ rotate: "abc" }] });
    expect(result).toEqual([rotationEffect(0)]);
  });

  it("parses numeric rotation angle", () => {
    const result = convertTransform({ transform: [{ rotate: 45 }] });
    expect(result).toEqual([rotationEffect(45)]);
  });
});

describe("convertTransform with __DEV__ false", () => {
  const originalDev = (global as any).__DEV__;

  beforeEach(() => {
    (global as any).__DEV__ = false;
  });

  afterEach(() => {
    (global as any).__DEV__ = originalDev;
  });

  it("does not warn for unsupported operations when __DEV__ is false", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const result = convertTransform({ transform: [{ perspective: 100 }] });
    expect(result).toEqual([]);
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
