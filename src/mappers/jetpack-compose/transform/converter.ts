import { ModifierConfig } from "@/types";
import { DirectMappableStyle } from "@/types";
import convertTransform from "./transform";

export function transformConverter(
  style: DirectMappableStyle,
  modifiers: ModifierConfig[]
): ModifierConfig[] {
  if (style.transform !== undefined && style.transform.length > 0) {
    return [...modifiers, ...convertTransform(style)];
  }
  return modifiers;
}
