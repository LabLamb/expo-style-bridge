import convertBackgroundColor from "./backgroundColor";
import { background } from "@expo/ui/swift-ui/modifiers";

describe("convertBackgroundColor", () => {
  it("should convert backgroundColor with hex value", () => {
    const style = { backgroundColor: "#FF5733" };
    const result = convertBackgroundColor(style);
    expect(result).toEqual(background("#FF5733"));
  });

  it("should convert backgroundColor with named color", () => {
    const style = { backgroundColor: "blue" };
    const result = convertBackgroundColor(style);
    expect(result).toEqual(background("blue"));
  });

  it("should convert backgroundColor with rgb value", () => {
    const style = { backgroundColor: "rgb(255, 87, 51)" };
    const result = convertBackgroundColor(style);
    expect(result).toEqual(background("rgb(255, 87, 51)"));
  });

  it("should convert backgroundColor with rgba value", () => {
    const style = { backgroundColor: "rgba(255, 87, 51, 0.5)" };
    const result = convertBackgroundColor(style);
    expect(result).toEqual(background("rgba(255, 87, 51, 0.5)"));
  });

  it("should default to transparent when backgroundColor is undefined", () => {
    const style = {};
    const result = convertBackgroundColor(style);
    expect(result).toEqual(background("transparent"));
  });

  it("should handle white background", () => {
    const style = { backgroundColor: "white" };
    const result = convertBackgroundColor(style);
    expect(result).toEqual(background("white"));
  });
});
