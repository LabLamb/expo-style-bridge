import convertShadow from "./shadow";
import { shadow } from "@expo/ui/swift-ui/modifiers";

describe("convertShadow", () => {
  it("emits shadow with all properties (hex color + opacity blending)", () => {
    const result = convertShadow({
      shadowColor: "#000000",
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    });
    expect(result).toEqual(
      shadow({ radius: 8, x: 2, y: 4, color: "#26000000" }),
    );
  });

  it("passes through rgba colors unchanged", () => {
    const result = convertShadow({
      shadowColor: "rgba(0,0,0,0.5)",
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    });
    expect(result).toEqual(
      shadow({ radius: 8, x: 2, y: 4, color: "rgba(0,0,0,0.5)" }),
    );
  });

  it("uses full opacity when shadowOpacity is omitted", () => {
    const result = convertShadow({
      shadowColor: "#FF0000",
      shadowRadius: 4,
    });
    expect(result).toEqual(
      shadow({ radius: 4, x: 0, y: 0, color: "#ffff0000" }),
    );
  });

  it("approximates elevation when only elevation is provided", () => {
    const result = convertShadow({ elevation: 10 });
    expect(result).toEqual(shadow({ radius: 5, x: 0, y: 3, color: undefined }));
  });

  it("defaults to 0 radius when no shadow props provided", () => {
    const result = convertShadow({});
    expect(result).toEqual(shadow({ radius: 0, x: 0, y: 0, color: undefined }));
  });

  it("ignores non-string shadowColor", () => {
    const result = convertShadow({ shadowColor: 12345 as any });
    expect(result).toEqual(shadow({ radius: 0, x: 0, y: 0, color: undefined }));
  });

  it("blends opacity for #RGB shorthand", () => {
    const result = convertShadow({
      shadowColor: "#F00",
      shadowOpacity: 0.5,
    });
    expect(result).toEqual(
      shadow({ radius: 0, x: 0, y: 0, color: "#80ff0000" }),
    );
  });

  it("blends opacity for #AARRGGBB color", () => {
    const result = convertShadow({
      shadowColor: "#80FF0000",
      shadowOpacity: 0.5,
    });
    // 0x80 * 0.5 = 0x40
    expect(result).toEqual(
      shadow({ radius: 0, x: 0, y: 0, color: "#40ff0000" }),
    );
  });
});
