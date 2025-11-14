import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertOpacity from "./opacity";
import type { OpacityStyle } from "@/mappers/styles";

export function opacityConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
): ViewModifier[] {
  if (style.opacity !== undefined) {
    return [...modifiers, convertOpacity(style)];
  }
  return modifiers;
}
