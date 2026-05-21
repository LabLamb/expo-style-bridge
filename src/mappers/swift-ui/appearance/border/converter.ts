import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertBorder from "./border";

export function borderConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
): ViewModifier[] {
  if (style.borderWidth !== undefined || style.borderColor !== undefined) {
    if ((style.borderWidth ?? 0) > 0) {
      return [...modifiers, convertBorder(style)];
    }
  }
  return modifiers;
}
