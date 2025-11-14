import convertZIndex from "./zIndex";
import { zIndex } from "@expo/ui/swift-ui/modifiers";

describe("convertZIndex", () => {
  it("should convert positive zIndex value", () => {
    const style = { zIndex: 10 };
    const result = convertZIndex(style);
    expect(result).toEqual(zIndex(10));
  });

  it("should convert negative zIndex value", () => {
    const style = { zIndex: -5 };
    const result = convertZIndex(style);
    expect(result).toEqual(zIndex(-5));
  });

  it("should convert zero zIndex value", () => {
    const style = { zIndex: 0 };
    const result = convertZIndex(style);
    expect(result).toEqual(zIndex(0));
  });

  it("should default to 0 when zIndex is undefined", () => {
    const style = {};
    const result = convertZIndex(style);
    expect(result).toEqual(zIndex(0));
  });

  it("should handle large zIndex values", () => {
    const style = { zIndex: 9999 };
    const result = convertZIndex(style);
    expect(result).toEqual(zIndex(9999));
  });
});
