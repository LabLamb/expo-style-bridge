import convertHidden from "./hidden";

describe("convertHidden (Compose)", () => {
  it("returns undefined because hidden() is not available", () => {
    const result = convertHidden({ display: "none" });
    expect(result).toBeUndefined();
  });
});
