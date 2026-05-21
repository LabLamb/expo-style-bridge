import convertTextDecoration from "./textDecoration";
import { underline, strikethrough } from "@expo/ui/swift-ui/modifiers";

describe("convertTextDecoration", () => {
  it("should convert underline", () => {
    const style = { textDecorationLine: "underline" as const };
    const result = convertTextDecoration(style);
    expect(result).toEqual([underline({ isActive: true })]);
  });

  it("should convert line-through", () => {
    const style = { textDecorationLine: "line-through" as const };
    const result = convertTextDecoration(style);
    expect(result).toEqual([strikethrough({ isActive: true })]);
  });

  it("should convert both underline and line-through", () => {
    const style = {
      textDecorationLine: "underline line-through" as const,
    };
    const result = convertTextDecoration(style);
    expect(result).toEqual([
      underline({ isActive: true }),
      strikethrough({ isActive: true }),
    ]);
  });

  it("should include color when provided", () => {
    const style = {
      textDecorationLine: "underline" as const,
      textDecorationColor: "#FF0000",
    };
    const result = convertTextDecoration(style);
    expect(result).toEqual([underline({ isActive: true, color: "#FF0000" })]);
  });

  it("should map dashed style to dash pattern", () => {
    const style = {
      textDecorationLine: "underline" as const,
      textDecorationStyle: "dashed" as const,
    };
    const result = convertTextDecoration(style);
    expect(result).toEqual([underline({ isActive: true, pattern: "dash" })]);
  });

  it("should return empty array for none", () => {
    const style = { textDecorationLine: "none" as const };
    const result = convertTextDecoration(style);
    expect(result).toEqual([]);
  });

  it("should return empty array when not defined", () => {
    const style = {};
    const result = convertTextDecoration(style);
    expect(result).toEqual([]);
  });

  it("should ignore unknown textDecorationStyle", () => {
    const style = {
      textDecorationLine: "underline" as const,
      textDecorationStyle: "foo" as any,
    };
    const result = convertTextDecoration(style);
    expect(result).toEqual([underline({ isActive: true })]);
  });
});
