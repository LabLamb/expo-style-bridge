import convertBorder from "./border";
import { border } from "@expo/ui/jetpack-compose/modifiers";

describe("convertBorder (Compose)", () => {
  it("should convert border with width and color", () => {
    const result = convertBorder({ borderWidth: 2, borderColor: "red" });
    expect(result).toEqual(border(2, "red"));
  });

  it("should default to black when color is undefined", () => {
    const result = convertBorder({ borderWidth: 1 });
    expect(result).toEqual(border(1, "black"));
  });

  it("should default width to 1 when undefined", () => {
    const result = convertBorder({ borderColor: "red" });
    expect(result).toEqual(border(1, "red"));
  });

  it("handles null borderColor", () => {
    const result = convertBorder({ borderWidth: 1, borderColor: null as any });
    expect(result).toEqual(border(1, "black"));
  });
});
