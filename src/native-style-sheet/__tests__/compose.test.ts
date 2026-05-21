import { NativeStyleSheet } from "../index";

describe("NativeStyleSheet.compose", () => {
  it("composes multiple descriptors", () => {
    const styles = NativeStyleSheet.create({
      base: { padding: 10 },
      active: { opacity: 0.8 },
    });

    const composed = NativeStyleSheet.compose(styles.base, styles.active);
    expect(composed.raw).toEqual({ padding: 10, opacity: 0.8 });
  });

  it("skips undefined and false values", () => {
    const styles = NativeStyleSheet.create({
      base: { padding: 10 },
    });

    const composed = NativeStyleSheet.compose(
      styles.base,
      undefined,
      false,
      null,
      { opacity: 0.5 }
    );
    expect(composed.raw).toEqual({ padding: 10, opacity: 0.5 });
  });

  it("last write wins for overlapping keys", () => {
    const composed = NativeStyleSheet.compose(
      { padding: 10, opacity: 0.5 },
      { opacity: 0.9 }
    );
    expect(composed.raw).toEqual({ padding: 10, opacity: 0.9 });
  });
});
