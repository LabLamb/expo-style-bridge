import { NativeStyleSheet } from "../index";

describe("NativeStyleSheet.flatten", () => {
  it("flattens descriptors into raw object", () => {
    const styles = NativeStyleSheet.create({
      base: { padding: 10 },
      active: { opacity: 0.8 },
    });

    const flat = NativeStyleSheet.flatten(styles.base, styles.active);
    expect(flat).toEqual({ padding: 10, opacity: 0.8 });
  });

  it("returns plain object, not descriptor", () => {
    const flat = NativeStyleSheet.flatten({ padding: 10 });
    expect(flat).not.toHaveProperty("swiftUI");
    expect(flat).not.toHaveProperty("jetpack");
  });
});
