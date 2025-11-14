import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import convertPadding from "@/mappers/padding/padding";
import convertOpacity from "@/mappers/opacity/opacity";
import convertZIndex from "@/mappers/zIndex/zIndex";
import convertHidden from "@/mappers/hidden/hidden";
import convertClipped from "@/mappers/clipped/clipped";

type ConverterFunction = (
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
) => ViewModifier[];

const converters: ConverterFunction[] = [
  // Padding converter
  (style, modifiers) => {
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
  },
  // Opacity converter
  (style, modifiers) => {
    if (style.opacity !== undefined) {
      return [...modifiers, convertOpacity(style)];
    }
    return modifiers;
  },
  // ZIndex converter
  (style, modifiers) => {
    if (style.zIndex !== undefined) {
      return [...modifiers, convertZIndex(style)];
    }
    return modifiers;
  },
  // Hidden converter
  (style, modifiers) => {
    if (style.display !== undefined) {
      return [...modifiers, convertHidden(style)];
    }
    return modifiers;
  },
  // Clipped converter
  (style, modifiers) => {
    if (style.overflow !== undefined) {
      return [...modifiers, convertClipped(style)];
    }
    return modifiers;
  },
  // Add more converters here as they are implemented
];

export function convertToSwiftUIModifiers(
  style: DirectMappableStyle
): ViewModifier[] {
  return converters.reduce(
    (modifiers, converter) => converter(style, modifiers),
    [] as ViewModifier[]
  );
}
