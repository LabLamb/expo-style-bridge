import { ModifierConfig } from "@/types";
import { DirectMappableStyle } from "@/types";
import convertOpacity from "./opacity";

export function opacityConverter(
  style: DirectMappableStyle,
  modifiers: ModifierConfig[]
): ModifierConfig[] {
  if (style.opacity !== undefined) {
    return [...modifiers, convertOpacity(style)];
  }
  return modifiers;
}
