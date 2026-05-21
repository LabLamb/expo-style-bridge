import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertFont from "./font";

export function fontConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[],
): ViewModifier[] {
  const fontModifier = convertFont(style);
  if (fontModifier !== undefined) {
    return [...modifiers, fontModifier];
  }
  return modifiers;
}
