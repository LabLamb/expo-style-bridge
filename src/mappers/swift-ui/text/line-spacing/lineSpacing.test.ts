import convertLineSpacing from "./lineSpacing";
import { lineSpacing } from "@expo/ui/swift-ui/modifiers";

describe("convertLineSpacing", () => {
  it("should convert lineHeight to lineSpacing modifier", () => {
    const style = { lineHeight: 24 };
    const result = convertLineSpacing(style);
    expect(result).toEqual(lineSpacing(24));
  });

  it("should return undefined when lineHeight is not defined", () => {
    const style = {};
    const result = convertLineSpacing(style);
    expect(result).toBeUndefined();
  });
});
