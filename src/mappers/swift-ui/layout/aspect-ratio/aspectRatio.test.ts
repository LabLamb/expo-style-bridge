import convertAspectRatio from "./aspectRatio";
import { aspectRatio } from "@expo/ui/swift-ui/modifiers";

describe("convertAspectRatio", () => {
  it("emits aspectRatio with fit contentMode", () => {
    const result = convertAspectRatio({ aspectRatio: 1.5 });
    expect(result).toEqual(aspectRatio({ ratio: 1.5, contentMode: "fit" }));
  });

  it("defaults to ratio 1 when undefined", () => {
    const result = convertAspectRatio({});
    expect(result).toEqual(aspectRatio({ ratio: 1, contentMode: "fit" }));
  });
});
