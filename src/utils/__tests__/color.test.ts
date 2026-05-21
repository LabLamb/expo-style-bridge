import {
  detectColorShape,
  isGradientValue,
  isPlatformColor,
  isDynamicColorIOS,
  resolveDynamicColorForCompose,
  normalizeGradient,
} from "../color";

describe("color utilities", () => {
  describe("detectColorShape", () => {
    it("detects plain string", () => {
      expect(detectColorShape("#FF0000")).toBe("string");
    });

    it("detects numeric", () => {
      expect(detectColorShape(0xffff0000)).toBe("numeric");
    });

    it("detects gradient", () => {
      expect(detectColorShape({ gradient: { colors: ["red", "blue"] } })).toBe(
        "gradient",
      );
    });

    it("detects platform color", () => {
      expect(detectColorShape({ semantic: "systemFill" })).toBe("platform");
    });

    it("detects dynamic ios color", () => {
      expect(
        detectColorShape({ dynamic: { light: "#FFF", dark: "#000" } }),
      ).toBe("dynamic-ios");
    });

    it("detects unknown", () => {
      expect(detectColorShape({ foo: "bar" })).toBe("unknown");
    });

    it("detects null as unknown", () => {
      expect(detectColorShape(null)).toBe("unknown");
    });

    it("detects undefined as unknown", () => {
      expect(detectColorShape(undefined)).toBe("unknown");
    });
  });

  describe("isGradientValue", () => {
    it("returns true for gradient descriptor", () => {
      expect(isGradientValue({ gradient: { colors: ["red"] } })).toBe(true);
    });

    it("returns false for non-gradient", () => {
      expect(isGradientValue("red")).toBe(false);
      expect(isGradientValue({})).toBe(false);
    });
  });

  describe("isPlatformColor", () => {
    it("returns true for semantic color", () => {
      expect(isPlatformColor({ semantic: "systemFill" })).toBe(true);
    });

    it("returns true for resource_paths color", () => {
      expect(isPlatformColor({ resource_paths: ["?attr/color"] })).toBe(true);
    });

    it("returns false for plain string", () => {
      expect(isPlatformColor("red")).toBe(false);
    });
  });

  describe("isDynamicColorIOS", () => {
    it("returns true for dynamic color", () => {
      expect(
        isDynamicColorIOS({ dynamic: { light: "#FFF", dark: "#000" } }),
      ).toBe(true);
    });

    it("returns false for non-dynamic color", () => {
      expect(isDynamicColorIOS("red")).toBe(false);
    });
  });

  describe("resolveDynamicColorForCompose", () => {
    it("falls back to light variant", () => {
      const result = resolveDynamicColorForCompose({
        dynamic: { light: "#FFF", dark: "#000" },
      });
      expect(result).toBe("#FFF");
    });

    it("passes through non-dynamic values", () => {
      expect(resolveDynamicColorForCompose("red")).toBe("red");
    });

    it("falls back to black when dynamic colors are missing", () => {
      const result = resolveDynamicColorForCompose({
        dynamic: { light: undefined, dark: undefined },
      });
      expect(result).toBe("#000000");
    });
  });

  describe("normalizeGradient", () => {
    it("fills default start/end points", () => {
      const result = normalizeGradient({
        gradient: { colors: ["red", "blue"] },
      });
      expect(result.gradient.startPoint).toEqual({ x: 0.5, y: 0 });
      expect(result.gradient.endPoint).toEqual({ x: 0.5, y: 1 });
    });

    it("preserves explicit points", () => {
      const result = normalizeGradient({
        gradient: {
          colors: ["red", "blue"],
          startPoint: { x: 0, y: 0 },
          endPoint: { x: 1, y: 1 },
        },
      });
      expect(result.gradient.startPoint).toEqual({ x: 0, y: 0 });
      expect(result.gradient.endPoint).toEqual({ x: 1, y: 1 });
    });
  });
});
