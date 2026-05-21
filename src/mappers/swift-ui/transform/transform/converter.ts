import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertTransform from "./transform";

export function transformConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
): ViewModifier[] {
  if (style.transform !== undefined && style.transform.length > 0) {
    return [...modifiers, ...convertTransform(style)];
  }
  return modifiers;
}
