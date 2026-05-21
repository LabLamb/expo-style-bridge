import convertZIndex from "./zIndex";
import { zIndex } from "@expo/ui/jetpack-compose/modifiers";

describe("convertZIndex (Compose)", () => {
  it("should convert zIndex value", () => {
    const result = convertZIndex({ zIndex: 10 });
    expect(result).toEqual(zIndex(10));
  });

  it("should default to 0 when undefined", () => {
    const result = convertZIndex({});
    expect(result).toEqual(zIndex(0));
  });
});
