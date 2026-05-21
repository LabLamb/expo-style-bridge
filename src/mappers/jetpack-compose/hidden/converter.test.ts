jest.mock("./hidden", () => jest.fn(() => ({ type: "hidden" })));

import { hiddenConverter } from "./converter";

describe("hiddenConverter (Compose)", () => {
  it("adds modifier when display is none", () => {
    const mods = [{ $type: "test" }];
    const result = hiddenConverter({ display: "none" }, mods);
    expect(result.length).toBe(2);
  });

  it("returns modifiers unchanged when display is absent", () => {
    const mods = [{ $type: "test" }];
    const result = hiddenConverter({}, mods);
    expect(result).toBe(mods);
  });
});
