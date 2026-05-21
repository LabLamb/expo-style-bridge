import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertKerning from "./kerning";

export function kerningConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[],
): ViewModifier[] {
  const kerningModifier = convertKerning(style);
  if (kerningModifier !== undefined) {
    return [...modifiers, kerningModifier];
  }
  return modifiers;
}
