import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertHidden from "./hidden";
import type { VisibilityStyle } from "@/mappers/styles";

export function hiddenConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
): ViewModifier[] {
  if (style.display !== undefined) {
    return [...modifiers, convertHidden(style)];
  }
  return modifiers;
}
