import { ModifierConfig } from "@/types";
import { DirectMappableStyle } from "@/types";
import convertPadding from "./padding";
import type { PaddingStyle } from "@/mappers/styles";

export function paddingConverter(
  style: DirectMappableStyle,
  modifiers: ModifierConfig[]
): ModifierConfig[] {
  if (
    style.padding !== undefined ||
    style.paddingHorizontal !== undefined ||
    style.paddingVertical !== undefined ||
    style.paddingTop !== undefined ||
    style.paddingBottom !== undefined ||
    style.paddingLeft !== undefined ||
    style.paddingRight !== undefined
  ) {
    return [...modifiers, convertPadding(style)];
  }
  return modifiers;
}
