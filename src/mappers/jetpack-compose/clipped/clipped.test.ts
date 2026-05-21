import convertClipped from "./clipped";

describe("convertClipped (Compose)", () => {
  it("returns undefined because clip() is not available", () => {
    const result = convertClipped({ overflow: "hidden" });
    expect(result).toBeUndefined();
  });
});
