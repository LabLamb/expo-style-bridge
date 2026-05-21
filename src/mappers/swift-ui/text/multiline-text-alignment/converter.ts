import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertMultilineTextAlignment from "./multilineTextAlignment";

export function multilineTextAlignmentConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[],
): ViewModifier[] {
  const alignmentModifier = convertMultilineTextAlignment(style);
  if (alignmentModifier !== undefined) {
    return [...modifiers, alignmentModifier];
  }
  return modifiers;
}
