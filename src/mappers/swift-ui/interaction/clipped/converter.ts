import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertClipped from "./clipped";

export function clippedConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[],
): ViewModifier[] {
  if (style.overflow !== undefined) {
    return [...modifiers, convertClipped(style)];
  }
  return modifiers;
}
