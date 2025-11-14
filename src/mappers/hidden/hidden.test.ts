import convertHidden from "./hidden";
import { hidden } from "@expo/ui/swift-ui/modifiers";

describe("convertHidden", () => {
  it("should convert display none to hidden true", () => {
    const style = { display: "none" as const };
    const result = convertHidden(style);
    expect(result).toEqual(hidden(true));
  });

  it("should convert display flex to hidden false", () => {
    const style = { display: "flex" as const };
    const result = convertHidden(style);
    expect(result).toEqual(hidden(false));
  });

  it("should default to hidden false when display is undefined", () => {
    const style = {};
    const result = convertHidden(style);
    expect(result).toEqual(hidden(false));
  });

  it("should handle other display values as not hidden", () => {
    const style = { display: "flex" as const };
    const result = convertHidden(style);
    expect(result).toEqual(hidden(false));
  });
});
