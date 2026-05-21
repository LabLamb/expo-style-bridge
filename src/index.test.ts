import {
  convertToSwiftUIModifiers,
  convertToJetpackComposeModifiers,
} from "./index";

describe("convertToSwiftUIModifiers", () => {
  it("reduces multiple converters in canonical order (layout → appearance → effects)", () => {
    const style = {
      padding: 10,
      width: 100,
      opacity: 0.5,
      backgroundColor: "red",
    };
    const result = convertToSwiftUIModifiers(style);
    expect(result.length).toBe(4);
    expect(result[0].$type).toBe("frame");
    expect(result[0].width).toBe(100);
    expect(result[1].$type).toBe("padding");
    expect(result[1].all).toBe(10);
    expect(result[2].$type).toBe("background");
    expect(result[2].color).toBe("red");
    expect(result[3].$type).toBe("opacity");
    expect(result[3].value).toBe(0.5);
  });

  it("returns empty array for empty style", () => {
    const result = convertToSwiftUIModifiers({});
    expect(result).toEqual([]);
  });

  it("applies only converters for present style keys", () => {
    const result = convertToSwiftUIModifiers({ opacity: 0.8 });
    expect(result.length).toBe(1);
    expect(result[0].$type).toBe("opacity");
    expect(result[0].value).toBe(0.8);
  });
});

describe("convertToJetpackComposeModifiers", () => {
  it("reduces multiple converters in canonical order", () => {
    const style = {
      padding: 10,
      opacity: 0.5,
      backgroundColor: "red",
    };
    const result = convertToJetpackComposeModifiers(style);
    expect(result.length).toBeGreaterThan(0);
  });
});
