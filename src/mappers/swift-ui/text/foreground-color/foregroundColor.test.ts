import convertForegroundColor from "./foregroundColor";
import { foregroundColor } from "@expo/ui/swift-ui/modifiers";

describe("convertForegroundColor", () => {
  it("should convert color with hex value", () => {
    const style = { color: "#FF5733" };
    const result = convertForegroundColor(style);
    expect(result).toEqual(foregroundColor("#FF5733"));
  });

  it("should convert color with named color", () => {
    const style = { color: "red" };
    const result = convertForegroundColor(style);
    expect(result).toEqual(foregroundColor("red"));
  });

  it("should convert color with rgb value", () => {
    const style = { color: "rgb(255, 87, 51)" };
    const result = convertForegroundColor(style);
    expect(result).toEqual(foregroundColor("rgb(255, 87, 51)"));
  });

  it("should convert color with rgba value", () => {
    const style = { color: "rgba(255, 87, 51, 0.5)" };
    const result = convertForegroundColor(style);
    expect(result).toEqual(foregroundColor("rgba(255, 87, 51, 0.5)"));
  });

  it("should default to black when color is undefined", () => {
    const style = {};
    const result = convertForegroundColor(style);
    expect(result).toEqual(foregroundColor("black"));
  });

  it("should handle transparent color", () => {
    const style = { color: "transparent" };
    const result = convertForegroundColor(style);
    expect(result).toEqual(foregroundColor("transparent"));
  });
});
