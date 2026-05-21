import { ModifierConfig } from "@/types";
import { DirectMappableStyle } from "@/types";
import convertHidden from "./hidden";

export function hiddenConverter(
  style: DirectMappableStyle,
  modifiers: ModifierConfig[]
): ModifierConfig[] {
  if (style.display === "none") {
    const modifier = convertHidden(style);
    if (modifier !== undefined) {
      return [...modifiers, modifier];
    }
  }
  return modifiers;
}
