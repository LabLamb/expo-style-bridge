import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertItalic from "./italic";

export function italicConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[],
): ViewModifier[] {
  const italicModifier = convertItalic(style);
  if (italicModifier !== undefined) {
    return [...modifiers, italicModifier];
  }
  return modifiers;
}
