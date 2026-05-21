import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertShadow from "./shadow";

export function shadowConverter(
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
): ViewModifier[] {
  if (
    style.shadowColor !== undefined ||
    style.shadowOffset !== undefined ||
    style.shadowOpacity !== undefined ||
    style.shadowRadius !== undefined ||
    style.elevation !== undefined
  ) {
    return [...modifiers, convertShadow(style)];
  }
  return modifiers;
}
