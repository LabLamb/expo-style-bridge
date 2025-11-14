import { opacity } from "@expo/ui/swift-ui/modifiers";
import convertOpacity from "./opacity";
import { OpacityStyle } from "../../types";

describe("convertOpacity", () => {
  it("should convert opacity value", () => {
    const style: OpacityStyle = { opacity: 0.5 };
    const result = convertOpacity(style);

    expect(result).toEqual(opacity(0.5));
  });

  it("should handle opacity of 0", () => {
    const style: OpacityStyle = { opacity: 0 };
    const result = convertOpacity(style);

    expect(result).toEqual(opacity(0));
  });

  it("should handle opacity of 1 (fully opaque)", () => {
    const style: OpacityStyle = { opacity: 1 };
    const result = convertOpacity(style);

    expect(result).toEqual(opacity(1));
  });

  it("should handle partial opacity values", () => {
    const style: OpacityStyle = { opacity: 0.75 };
    const result = convertOpacity(style);

    expect(result).toEqual(opacity(0.75));
  });

  it("should default to 1 when opacity is undefined", () => {
    const style: OpacityStyle = {};
    const result = convertOpacity(style);

    expect(result).toEqual(opacity(1));
  });
});
