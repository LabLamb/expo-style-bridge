import convertPadding from "./padding";
import { paddingAll } from "@expo/ui/jetpack-compose/modifiers";

describe("convertPadding (Compose)", () => {
  it("should convert padding", () => {
    const result = convertPadding({ padding: 10 });
    expect(result).toEqual(paddingAll(10));
  });

  it("should default to 0 when undefined", () => {
    const result = convertPadding({});
    expect(result).toEqual(paddingAll(0));
  });
});
