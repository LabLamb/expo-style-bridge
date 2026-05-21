import convertBorder from "./border";
import { border } from "@expo/ui/swift-ui/modifiers";

describe("convertBorder", () => {
  it("emits border with color and width", () => {
    const result = convertBorder({ borderWidth: 2, borderColor: "red" });
    expect(result).toEqual(border({ color: "red", width: 2 }));
  });

  it("defaults to black when color is undefined", () => {
    const result = convertBorder({ borderWidth: 1 });
    expect(result).toEqual(border({ color: "black", width: 1 }));
  });

  it("defaults to width 1 when width is undefined", () => {
    const result = convertBorder({ borderColor: "blue" });
    expect(result).toEqual(border({ color: "blue", width: 1 }));
  });

  it("handles null borderColor", () => {
    const result = convertBorder({ borderWidth: 1, borderColor: null as any });
    expect(result).toEqual(border({ color: "black", width: 1 }));
  });
});
