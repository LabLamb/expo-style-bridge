import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertTint from "./tint";

export function tintConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
): ViewModifier[] {
  if (style.tintColor !== undefined) {
    return [...modifiers, convertTint(style)];
  }
  return modifiers;
}
