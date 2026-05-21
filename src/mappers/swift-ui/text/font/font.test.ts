import convertFont from "./font";
import { font } from "@expo/ui/swift-ui/modifiers";

describe("convertFont", () => {
  it("should convert fontSize to font modifier", () => {
    const style = { fontSize: 16 };
    const result = convertFont(style);
    expect(result).toEqual(font({ size: 16 }));
  });

  it("should return undefined when no font properties are defined", () => {
    const style = {};
    const result = convertFont(style);
    expect(result).toBeUndefined();
  });

  it("should map numeric fontWeight to Expo UI weight names", () => {
    expect(convertFont({ fontWeight: "100" })).toEqual(
      font({ weight: "ultraLight" }),
    );
    expect(convertFont({ fontWeight: "400" })).toEqual(
      font({ weight: "regular" }),
    );
    expect(convertFont({ fontWeight: "700" })).toEqual(
      font({ weight: "bold" }),
    );
    expect(convertFont({ fontWeight: "900" })).toEqual(
      font({ weight: "black" }),
    );
  });

  it("should map named fontWeight to Expo UI weight names", () => {
    expect(convertFont({ fontWeight: "normal" })).toEqual(
      font({ weight: "regular" }),
    );
    expect(convertFont({ fontWeight: "bold" })).toEqual(
      font({ weight: "bold" }),
    );
  });

  it("should include fontFamily when provided", () => {
    const style = { fontSize: 12, fontFamily: "Courier" };
    const result = convertFont(style);
    expect(result).toEqual(font({ size: 12, family: "Courier" }));
  });

  it("should combine fontSize, weight, and family", () => {
    const style = { fontSize: 14, fontWeight: "600", fontFamily: "Inter" };
    const result = convertFont(style);
    expect(result).toEqual(
      font({ size: 14, weight: "semibold", family: "Inter" }),
    );
  });
});
