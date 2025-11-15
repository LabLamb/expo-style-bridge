import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertBackgroundColor from "./backgroundColor";
import type { ColorStyle } from "@/mappers/styles";

export function backgroundColorConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
): ViewModifier[] {
  if (style.backgroundColor !== undefined) {
    return [...modifiers, convertBackgroundColor(style)];
  }
  return modifiers;
}
