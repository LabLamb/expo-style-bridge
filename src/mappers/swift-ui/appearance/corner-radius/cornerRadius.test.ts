import convertCornerRadius from "./cornerRadius";
import { cornerRadius } from "@expo/ui/swift-ui/modifiers";

describe("convertCornerRadius", () => {
  it("emits cornerRadius with given value", () => {
    const result = convertCornerRadius({ borderRadius: 8 });
    expect(result).toEqual(cornerRadius(8));
  });

  it("defaults to 0 when borderRadius is undefined", () => {
    const result = convertCornerRadius({});
    expect(result).toEqual(cornerRadius(0));
  });
});
