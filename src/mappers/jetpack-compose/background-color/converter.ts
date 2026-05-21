import { ModifierConfig } from "@/types";
import { DirectMappableStyle } from "@/types";
import convertBackgroundColor from "./backgroundColor";

export function backgroundColorConverter(
  style: DirectMappableStyle,
  modifiers: ModifierConfig[]
): ModifierConfig[] {
  if (style.backgroundColor !== undefined) {
    return [...modifiers, convertBackgroundColor(style)];
  }
  return modifiers;
}
