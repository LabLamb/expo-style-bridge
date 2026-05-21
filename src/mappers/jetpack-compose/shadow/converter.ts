import { ModifierConfig } from "@/types";
import { DirectMappableStyle } from "@/types";
import convertShadow from "./shadow";

export function shadowConverter(
  style: DirectMappableStyle,
  modifiers: ModifierConfig[]
): ModifierConfig[] {
  if (style.elevation !== undefined) {
    return [...modifiers, convertShadow(style)];
  }
  return modifiers;
}
