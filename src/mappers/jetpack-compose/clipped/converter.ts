import { ModifierConfig } from "@/types";
import { DirectMappableStyle } from "@/types";
import convertClipped from "./clipped";

export function clippedConverter(
  style: DirectMappableStyle,
  modifiers: ModifierConfig[]
): ModifierConfig[] {
  if (style.overflow === "hidden") {
    const modifier = convertClipped(style);
    if (modifier !== undefined) {
      return [...modifiers, modifier];
    }
  }
  return modifiers;
}
