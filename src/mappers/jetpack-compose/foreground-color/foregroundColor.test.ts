import convertForegroundColor from "./foregroundColor";

describe("convertForegroundColor (Compose)", () => {
  it("returns undefined because tint() is not available", () => {
    const result = convertForegroundColor({ color: "red" });
    expect(result).toBeUndefined();
  });
});
