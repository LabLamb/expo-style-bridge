import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertZIndex from "./zIndex";
import type { ZIndexStyle } from "@/mappers/styles";

export function zIndexConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
): ViewModifier[] {
  if (style.zIndex !== undefined) {
    return [...modifiers, convertZIndex(style)];
  }
  return modifiers;
}
