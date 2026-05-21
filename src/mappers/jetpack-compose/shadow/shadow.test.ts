import convertShadow from "./shadow";
import { shadow } from "@expo/ui/jetpack-compose/modifiers";

describe("convertShadow (Compose)", () => {
  it("should convert elevation to shadow", () => {
    const result = convertShadow({ elevation: 8 });
    expect(result).toEqual(shadow(8));
  });

  it("should default to 0 when no elevation", () => {
    const result = convertShadow({});
    expect(result).toEqual(shadow(0));
  });
});
