import * as swiftUI from "./swift-ui";
import * as jetpackCompose from "./jetpack-compose";

describe.each([
  [
    "SwiftUI",
    swiftUI,
    [
      "frameConverter",
      "aspectRatioConverter",
      "paddingConverter",
      "backgroundColorConverter",
      "foregroundColorConverter",
      "fontConverter",
      "italicConverter",
      "kerningConverter",
      "lineSpacingConverter",
      "multilineTextAlignmentConverter",
      "textCaseConverter",
      "textDecorationConverter",
      "borderConverter",
      "cornerRadiusConverter",
      "tintConverter",
      "shadowConverter",
      "opacityConverter",
      "transformConverter",
      "clippedConverter",
      "zIndexConverter",
      "hiddenConverter",
    ],
  ],
  [
    "Jetpack Compose",
    jetpackCompose,
    [
      "paddingConverter",
      "backgroundColorConverter",
      "foregroundColorConverter",
      "borderConverter",
      "shadowConverter",
      "opacityConverter",
      "transformConverter",
      "clippedConverter",
      "zIndexConverter",
      "hiddenConverter",
    ],
  ],
])("%s converters — no-op when property absent", (_, namespace, names) => {
  names.forEach((name) => {
    it(`${name} returns modifiers unchanged`, () => {
      const converter = namespace[name];
      const mods = [{ $type: "test" }];
      expect(converter({}, mods)).toBe(mods);
    });
  });
});

describe("SwiftUI converters — present property branches", () => {
  it("frameConverter adds frame modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.frameConverter({ width: 100 }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "frame" });
  });

  it("aspectRatioConverter adds aspectRatio modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.aspectRatioConverter({ aspectRatio: 1.5 }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "aspectRatio" });
  });

  it("paddingConverter adds padding modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.paddingConverter({ padding: 10 }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "padding" });
  });

  it("paddingConverter adds horizontal/vertical padding", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.paddingConverter(
      { paddingHorizontal: 16, paddingVertical: 12 },
      mods,
    );
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "padding" });
  });

  it("backgroundColorConverter adds background modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.backgroundColorConverter(
      { backgroundColor: "red" },
      mods,
    );
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "background" });
  });

  it("foregroundColorConverter adds foregroundColor modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.foregroundColorConverter({ color: "blue" }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "foregroundColor" });
  });

  it("fontConverter adds font modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.fontConverter({ fontSize: 16 }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "font" });
  });

  it("italicConverter adds italic modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.italicConverter({ fontStyle: "italic" }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "italic" });
  });

  it("italicConverter returns modifiers unchanged when fontStyle is not italic", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.italicConverter({ fontStyle: "normal" }, mods);
    expect(result).toBe(mods);
  });

  it("kerningConverter adds kerning modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.kerningConverter({ letterSpacing: 2 }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "kerning" });
  });

  it("lineSpacingConverter adds lineSpacing modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.lineSpacingConverter({ lineHeight: 20 }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "lineSpacing" });
  });

  it("multilineTextAlignmentConverter adds multilineTextAlignment modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.multilineTextAlignmentConverter(
      { textAlign: "center" },
      mods,
    );
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "multilineTextAlignment" });
  });

  it("multilineTextAlignmentConverter returns modifiers for auto", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.multilineTextAlignmentConverter(
      { textAlign: "auto" },
      mods,
    );
    expect(result).toBe(mods);
  });

  it("textCaseConverter adds textCase modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.textCaseConverter(
      { textTransform: "uppercase" },
      mods,
    );
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "textCase" });
  });

  it("textDecorationConverter adds textDecoration modifiers", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.textDecorationConverter(
      { textDecorationLine: "underline" },
      mods,
    );
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "underline" });
  });

  it("borderConverter adds border modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.borderConverter(
      { borderWidth: 1, borderColor: "red" },
      mods,
    );
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "border" });
  });

  it("borderConverter skips when borderWidth is 0", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.borderConverter(
      { borderWidth: 0, borderColor: "red" },
      mods,
    );
    expect(result).toBe(mods);
  });

  it("borderConverter skips when only borderColor is provided", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.borderConverter({ borderColor: "red" }, mods);
    expect(result).toBe(mods);
  });

  it("cornerRadiusConverter adds cornerRadius modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.cornerRadiusConverter({ borderRadius: 8 }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "cornerRadius" });
  });

  it("tintConverter adds tint modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.tintConverter({ tintColor: "red" }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "tint" });
  });

  it("shadowConverter adds shadow modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.shadowConverter({ shadowColor: "black" }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "shadow" });
  });

  it("opacityConverter adds opacity modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.opacityConverter({ opacity: 0.5 }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "opacity" });
  });

  it("transformConverter adds transform modifiers", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.transformConverter(
      { transform: [{ scale: 2 }] },
      mods,
    );
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "scaleEffect" });
  });

  it("transformConverter returns modifiers unchanged for empty transform", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.transformConverter({ transform: [] }, mods);
    expect(result).toBe(mods);
  });

  it("clippedConverter adds clipped modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.clippedConverter({ overflow: "hidden" }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "clipped" });
  });

  it("zIndexConverter adds zIndex modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.zIndexConverter({ zIndex: 5 }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "zIndex" });
  });

  it("hiddenConverter adds hidden modifier", () => {
    const mods = [{ $type: "test" }];
    const result = swiftUI.hiddenConverter({ display: "none" }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "hidden" });
  });
});

describe("Jetpack Compose converters — present property branches", () => {
  it("paddingConverter adds padding modifier", () => {
    const mods = [{ $type: "test" }];
    const result = jetpackCompose.paddingConverter({ padding: 10 }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "paddingAll" });
  });

  it("paddingConverter falls back to 0 when padding is absent", () => {
    const mods = [{ $type: "test" }];
    const result = jetpackCompose.paddingConverter(
      { paddingHorizontal: 10 },
      mods,
    );
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "paddingAll" });
  });

  it("backgroundColorConverter adds background modifier", () => {
    const mods = [{ $type: "test" }];
    const result = jetpackCompose.backgroundColorConverter(
      { backgroundColor: "red" },
      mods,
    );
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "background" });
  });

  it("foregroundColorConverter returns modifiers unchanged (not supported)", () => {
    const mods = [{ $type: "test" }];
    const result = jetpackCompose.foregroundColorConverter(
      { color: "blue" },
      mods,
    );
    expect(result).toBe(mods);
  });

  it("borderConverter adds border modifier", () => {
    const mods = [{ $type: "test" }];
    const result = jetpackCompose.borderConverter(
      { borderWidth: 1, borderColor: "red" },
      mods,
    );
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "border" });
  });

  it("borderConverter skips when borderWidth is 0", () => {
    const mods = [{ $type: "test" }];
    const result = jetpackCompose.borderConverter(
      { borderWidth: 0, borderColor: "red" },
      mods,
    );
    expect(result).toBe(mods);
  });

  it("borderConverter skips when only borderColor is provided", () => {
    const mods = [{ $type: "test" }];
    const result = jetpackCompose.borderConverter({ borderColor: "red" }, mods);
    expect(result).toBe(mods);
  });

  it("shadowConverter adds shadow modifier", () => {
    const mods = [{ $type: "test" }];
    const result = jetpackCompose.shadowConverter({ elevation: 4 }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "shadow" });
  });

  it("opacityConverter adds opacity modifier", () => {
    const mods = [{ $type: "test" }];
    const result = jetpackCompose.opacityConverter({ opacity: 0.5 }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "alpha" });
  });

  it("transformConverter adds transform modifiers", () => {
    const mods = [{ $type: "test" }];
    const result = jetpackCompose.transformConverter(
      { transform: [{ rotate: "45deg" }] },
      mods,
    );
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "rotate" });
  });

  it("transformConverter returns modifiers unchanged for empty transform", () => {
    const mods = [{ $type: "test" }];
    const result = jetpackCompose.transformConverter({ transform: [] }, mods);
    expect(result).toBe(mods);
  });

  it("clippedConverter returns modifiers unchanged (not supported)", () => {
    const mods = [{ $type: "test" }];
    const result = jetpackCompose.clippedConverter(
      { overflow: "hidden" },
      mods,
    );
    expect(result).toBe(mods);
  });

  it("zIndexConverter adds zIndex modifier", () => {
    const mods = [{ $type: "test" }];
    const result = jetpackCompose.zIndexConverter({ zIndex: 5 }, mods);
    expect(result.length).toBe(2);
    expect(result[1]).toMatchObject({ $type: "zIndex" });
  });

  it("hiddenConverter returns modifiers unchanged (not supported)", () => {
    const mods = [{ $type: "test" }];
    const result = jetpackCompose.hiddenConverter({ display: "none" }, mods);
    expect(result).toBe(mods);
  });
});
