import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertTextCase from "./textCase";

export function textCaseConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[],
): ViewModifier[] {
  const textCaseModifier = convertTextCase(style);
  if (textCaseModifier !== undefined) {
    return [...modifiers, textCaseModifier];
  }
  return modifiers;
}
