import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertPadding from "./padding";
import type { PaddingStyle } from "@/mappers/styles";

export function paddingConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
): ViewModifier[] {
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
