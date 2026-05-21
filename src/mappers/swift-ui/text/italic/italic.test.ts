import convertItalic from "./italic";
import { italic } from "@expo/ui/swift-ui/modifiers";

describe("convertItalic", () => {
  it("should return italic modifier when fontStyle is italic", () => {
    const style = { fontStyle: "italic" as const };
    const result = convertItalic(style);
    expect(result).toEqual(italic());
  });

  it("should return undefined when fontStyle is normal", () => {
    const style = { fontStyle: "normal" as const };
    const result = convertItalic(style);
    expect(result).toBeUndefined();
  });

  it("should return undefined when fontStyle is not defined", () => {
    const style = {};
    const result = convertItalic(style);
    expect(result).toBeUndefined();
  });
});
