jest.mock("./foregroundColor", () => jest.fn(() => ({ type: "foreground" })));

import { foregroundColorConverter } from "./converter";

describe("foregroundColorConverter (Compose)", () => {
  it("adds modifier when color is present", () => {
    const mods = [{ $type: "test" }];
    const result = foregroundColorConverter({ color: "red" }, mods);
    expect(result.length).toBe(2);
  });

  it("returns modifiers unchanged when color is absent", () => {
    const mods = [{ $type: "test" }];
    const result = foregroundColorConverter({}, mods);
    expect(result).toBe(mods);
  });
});
