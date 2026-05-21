import convertTextCase from "./textCase";
import { textCase } from "@expo/ui/swift-ui/modifiers";

describe("convertTextCase", () => {
  it("should convert uppercase to textCase modifier", () => {
    const style = { textTransform: "uppercase" as const };
    const result = convertTextCase(style);
    expect(result).toEqual(textCase("uppercase"));
  });

  it("should convert lowercase to textCase modifier", () => {
    const style = { textTransform: "lowercase" as const };
    const result = convertTextCase(style);
    expect(result).toEqual(textCase("lowercase"));
  });

  it("should return undefined for capitalize", () => {
    const style = { textTransform: "capitalize" as const };
    const result = convertTextCase(style);
    expect(result).toBeUndefined();
  });

  it("should return undefined for none", () => {
    const style = { textTransform: "none" as const };
    const result = convertTextCase(style);
    expect(result).toBeUndefined();
  });

  it("should return undefined when textTransform is not defined", () => {
    const style = {};
    const result = convertTextCase(style);
    expect(result).toBeUndefined();
  });
});
