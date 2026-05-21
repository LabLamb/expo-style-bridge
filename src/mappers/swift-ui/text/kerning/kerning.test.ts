import convertKerning from "./kerning";
import { kerning } from "@expo/ui/swift-ui/modifiers";

describe("convertKerning", () => {
  it("should convert letterSpacing to kerning modifier", () => {
    const style = { letterSpacing: 2 };
    const result = convertKerning(style);
    expect(result).toEqual(kerning(2));
  });

  it("should return undefined when letterSpacing is not defined", () => {
    const style = {};
    const result = convertKerning(style);
    expect(result).toBeUndefined();
  });
});
