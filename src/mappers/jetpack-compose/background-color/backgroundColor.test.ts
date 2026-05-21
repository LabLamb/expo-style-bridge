import convertBackgroundColor from "./backgroundColor";
import { background } from "@expo/ui/jetpack-compose/modifiers";

describe("convertBackgroundColor (Compose)", () => {
  it("should convert backgroundColor", () => {
    const result = convertBackgroundColor({ backgroundColor: "#FF5733" });
    expect(result).toEqual(background("#FF5733"));
  });

  it("should default to transparent when undefined", () => {
    const result = convertBackgroundColor({});
    expect(result).toEqual(background("transparent"));
  });

  it("should handle gradient value", () => {
    const gradient = { gradient: { colors: ["red", "blue"] } };
    const result = convertBackgroundColor({ backgroundColor: gradient as any });
    expect(result).toEqual(background(JSON.stringify({ gradient: { colors: ["red", "blue"], startPoint: { x: 0.5, y: 0 }, endPoint: { x: 0.5, y: 1 } } })));
  });
});
