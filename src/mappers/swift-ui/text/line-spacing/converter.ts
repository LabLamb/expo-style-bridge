import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertLineSpacing from "./lineSpacing";

export function lineSpacingConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[],
): ViewModifier[] {
  const lineSpacingModifier = convertLineSpacing(style);
  if (lineSpacingModifier !== undefined) {
    return [...modifiers, lineSpacingModifier];
  }
  return modifiers;
}
