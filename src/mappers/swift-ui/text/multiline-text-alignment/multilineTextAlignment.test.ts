import convertMultilineTextAlignment from "./multilineTextAlignment";
import { multilineTextAlignment } from "@expo/ui/swift-ui/modifiers";

describe("convertMultilineTextAlignment", () => {
  it("should map 'left' to 'leading'", () => {
    const style = { textAlign: "left" as const };
    const result = convertMultilineTextAlignment(style);
    expect(result).toEqual(multilineTextAlignment("leading"));
  });

  it("should map 'right' to 'trailing'", () => {
    const style = { textAlign: "right" as const };
    const result = convertMultilineTextAlignment(style);
    expect(result).toEqual(multilineTextAlignment("trailing"));
  });

  it("should map 'center' to 'center'", () => {
    const style = { textAlign: "center" as const };
    const result = convertMultilineTextAlignment(style);
    expect(result).toEqual(multilineTextAlignment("center"));
  });

  it("should map 'justify' to 'leading' (fallback)", () => {
    const style = { textAlign: "justify" as const };
    const result = convertMultilineTextAlignment(style);
    expect(result).toEqual(multilineTextAlignment("leading"));
  });

  it("should return undefined for 'auto'", () => {
    const style = { textAlign: "auto" as const };
    const result = convertMultilineTextAlignment(style);
    expect(result).toBeUndefined();
  });

  it("should return undefined when textAlign is not defined", () => {
    const style = {};
    const result = convertMultilineTextAlignment(style);
    expect(result).toBeUndefined();
  });

  it("should return undefined for unknown alignment", () => {
    const style = { textAlign: "foo" as any };
    const result = convertMultilineTextAlignment(style);
    expect(result).toBeUndefined();
  });
});
