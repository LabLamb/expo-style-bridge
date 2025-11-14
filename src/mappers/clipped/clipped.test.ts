import convertClipped from "./clipped";
import { clipped } from "@expo/ui/swift-ui/modifiers";

describe("convertClipped", () => {
  it("should convert overflow hidden to clipped true", () => {
    const style = { overflow: "hidden" as const };
    const result = convertClipped(style);
    expect(result).toEqual(clipped(true));
  });

  it("should convert overflow visible to clipped false", () => {
    const style = { overflow: "visible" as const };
    const result = convertClipped(style);
    expect(result).toEqual(clipped(false));
  });

  it("should convert overflow scroll to clipped false", () => {
    const style = { overflow: "scroll" as const };
    const result = convertClipped(style);
    expect(result).toEqual(clipped(false));
  });

  it("should default to clipped false when overflow is undefined", () => {
    const style = {};
    const result = convertClipped(style);
    expect(result).toEqual(clipped(false));
  });
});
