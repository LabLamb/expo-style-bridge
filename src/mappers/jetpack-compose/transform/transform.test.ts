import convertTransform from "./transform";
import { rotate, offset } from "@expo/ui/jetpack-compose/modifiers";

describe("convertTransform (Compose)", () => {
  it("emits rotate for rotate operation", () => {
    const result = convertTransform({ transform: [{ rotate: "45deg" }] });
    expect(result).toEqual([rotate(45)]);
  });

  it("emits offset for translateX and translateY", () => {
    const result = convertTransform({
      transform: [{ translateX: 10 }, { translateY: 20 }],
    });
    expect(result).toEqual([offset(10, 0), offset(0, 20)]);
  });

  it("returns empty array for unsupported operations", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const result = convertTransform({ transform: [{ scale: 2 }] });
    expect(result).toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("scale"));
    warnSpy.mockRestore();
  });

  it("returns empty array when transform is undefined", () => {
    const result = convertTransform({});
    expect(result).toEqual([]);
  });

  it("parses rotation without deg suffix", () => {
    const result = convertTransform({ transform: [{ rotate: "45" }] });
    expect(result).toEqual([rotate(45)]);
  });

  it("falls back to 0 for invalid rotation string", () => {
    const result = convertTransform({ transform: [{ rotate: "abc" }] });
    expect(result).toEqual([rotate(0)]);
  });

  it("parses numeric rotation angle", () => {
    const result = convertTransform({ transform: [{ rotate: 45 }] });
    expect(result).toEqual([rotate(45)]);
  });
});

describe("convertTransform (Compose) with __DEV__ false", () => {
  const originalDev = (global as any).__DEV__;

  beforeEach(() => {
    (global as any).__DEV__ = false;
  });

  afterEach(() => {
    (global as any).__DEV__ = originalDev;
  });

  it("does not warn for unsupported operations when __DEV__ is false", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const result = convertTransform({ transform: [{ scale: 2 }] });
    expect(result).toEqual([]);
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
