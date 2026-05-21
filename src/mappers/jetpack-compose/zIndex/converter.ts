import { ModifierConfig } from "@/types";
import { DirectMappableStyle } from "@/types";
import convertZIndex from "./zIndex";

export function zIndexConverter(
  style: DirectMappableStyle,
  modifiers: ModifierConfig[]
): ModifierConfig[] {
  if (style.zIndex !== undefined) {
    return [...modifiers, convertZIndex(style)];
  }
  return modifiers;
}
