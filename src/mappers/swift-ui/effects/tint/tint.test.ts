import convertTint from "./tint";
import { tint } from "@expo/ui/swift-ui/modifiers";

describe("convertTint", () => {
  it("emits tint with given color", () => {
    const result = convertTint({ tintColor: "blue" });
    expect(result).toEqual(tint("blue"));
  });

  it("defaults to black when tintColor is undefined", () => {
    const result = convertTint({});
    expect(result).toEqual(tint("black"));
  });
});
