import convertPadding from "./padding";
import { padding } from "@expo/ui/swift-ui/modifiers";

describe("convertPadding", () => {
  it("emits padding with all property", () => {
    const result = convertPadding({ padding: 10 });
    expect(result).toEqual(padding({ all: 10 }));
  });

  it("emits padding with horizontal and vertical", () => {
    const result = convertPadding({ paddingHorizontal: 16, paddingVertical: 12 });
    expect(result).toEqual(padding({ horizontal: 16, vertical: 12 }));
  });

  it("emits padding with directional properties", () => {
    const result = convertPadding({
      paddingTop: 10,
      paddingBottom: 12,
      paddingLeft: 14,
      paddingRight: 16,
    });
    expect(result).toEqual(
      padding({ top: 10, bottom: 12, leading: 14, trailing: 16 })
    );
  });
});
