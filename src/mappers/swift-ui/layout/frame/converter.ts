import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertFrame from "./frame";

export function frameConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
): ViewModifier[] {
  if (
    style.width !== undefined ||
    style.height !== undefined ||
    style.minWidth !== undefined ||
    style.maxWidth !== undefined ||
    style.minHeight !== undefined ||
    style.maxHeight !== undefined
  ) {
    return [...modifiers, convertFrame(style)];
  }
  return modifiers;
}
