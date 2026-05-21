import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertCornerRadius from "./cornerRadius";

export function cornerRadiusConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
): ViewModifier[] {
  if (style.borderRadius !== undefined) {
    return [...modifiers, convertCornerRadius(style)];
  }
  return modifiers;
}
