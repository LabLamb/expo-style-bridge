import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertAspectRatio from "./aspectRatio";

export function aspectRatioConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
): ViewModifier[] {
  if (style.aspectRatio !== undefined) {
    return [...modifiers, convertAspectRatio(style)];
  }
  return modifiers;
}
