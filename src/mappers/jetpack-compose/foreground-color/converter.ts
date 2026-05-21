import { ModifierConfig } from "@/types";
import { DirectMappableStyle } from "@/types";
import convertForegroundColor from "./foregroundColor";

export function foregroundColorConverter(
  style: DirectMappableStyle,
  modifiers: ModifierConfig[]
): ModifierConfig[] {
  if (style.color !== undefined) {
    const modifier = convertForegroundColor(style);
    if (modifier !== undefined) {
      return [...modifiers, modifier];
    }
  }
  return modifiers;
}
