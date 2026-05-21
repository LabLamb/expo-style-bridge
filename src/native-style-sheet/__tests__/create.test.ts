import { NativeStyleSheet } from "../index";

describe("NativeStyleSheet.create", () => {
  it("creates descriptors for each key", () => {
    const styles = NativeStyleSheet.create({
      button: { padding: 16 },
      container: { paddingHorizontal: 20 },
    });

    expect(styles.button.raw).toEqual({ padding: 16 });
    expect(styles.container.raw).toEqual({ paddingHorizontal: 20 });
  });

  it("produces swiftUI modifiers", () => {
    const styles = NativeStyleSheet.create({
      button: { padding: 16, opacity: 0.9 },
    });

    const mods = styles.button.swiftUI;
    expect(mods.length).toBeGreaterThan(0);
  });
});
