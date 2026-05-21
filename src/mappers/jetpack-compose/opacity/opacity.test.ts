import convertOpacity from "./opacity";
import { alpha } from "@expo/ui/jetpack-compose/modifiers";
import { OpacityStyle } from "../../../types";

describe("convertOpacity (Compose)", () => {
  it("should convert opacity value", () => {
    const style: OpacityStyle = { opacity: 0.5 };
    expect(convertOpacity(style)).toEqual(alpha(0.5));
  });

  it("should default to 1 when undefined", () => {
    const style: OpacityStyle = {};
    expect(convertOpacity(style)).toEqual(alpha(1));
  });
});
