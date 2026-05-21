import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertForegroundColor from "./foregroundColor";
import type { ColorStyle } from "@/mappers/styles";

export function foregroundColorConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
): ViewModifier[] {
  if (style.color !== undefined) {
    return [...modifiers, convertForegroundColor(style)];
  }
  return modifiers;
}
