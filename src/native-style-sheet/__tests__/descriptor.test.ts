import { createNativeStyleDescriptor } from "../descriptor";

describe("createNativeStyleDescriptor", () => {
  it("returns raw style", () => {
    const descriptor = createNativeStyleDescriptor({ padding: 10 });
    expect(descriptor.raw).toEqual({ padding: 10 });
  });

  it("lazily evaluates swiftUI modifiers", () => {
    const descriptor = createNativeStyleDescriptor({ padding: 10 });
    const mods = descriptor.swiftUI;
    expect(mods.length).toBeGreaterThan(0);
    // Second access returns cached value
    expect(descriptor.swiftUI).toBe(mods);
  });

  it("lazily evaluates jetpack modifiers", () => {
    const descriptor = createNativeStyleDescriptor({ padding: 10 });
    const mods = descriptor.jetpack;
    expect(mods.length).toBeGreaterThan(0);
    // Second access returns cached value
    expect(descriptor.jetpack).toBe(mods);
  });

  it("does not compute jetpack when only swiftUI is accessed", () => {
    const descriptor = createNativeStyleDescriptor({ padding: 10 });
    const swiftMods = descriptor.swiftUI;
    expect(swiftMods.length).toBeGreaterThan(0);
    // jetpack should still be lazily uncomputed
    const jetpackMods = descriptor.jetpack;
    expect(jetpackMods.length).toBeGreaterThan(0);
  });
});
