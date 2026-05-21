import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertTextDecoration from "./textDecoration";

export function textDecorationConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[],
): ViewModifier[] {
  const decorationModifiers = convertTextDecoration(style);
  if (decorationModifiers.length > 0) {
    return [...modifiers, ...decorationModifiers];
  }
  return modifiers;
}
