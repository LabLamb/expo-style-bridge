jest.mock("./clipped", () => jest.fn(() => ({ type: "clip" })));

import { clippedConverter } from "./converter";

describe("clippedConverter (Compose)", () => {
  it("adds modifier when overflow is hidden", () => {
    const mods = [{ $type: "test" }];
    const result = clippedConverter({ overflow: "hidden" }, mods);
    expect(result.length).toBe(2);
  });

  it("returns modifiers unchanged when overflow is not hidden", () => {
    const mods = [{ $type: "test" }];
    const result = clippedConverter({}, mods);
    expect(result).toBe(mods);
  });
});
