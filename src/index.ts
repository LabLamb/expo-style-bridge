import { ViewModifier } from "@expo/ui/swift-ui/modifiers";

import { DirectMappableStyle, ConverterFunction } from "@/types";
import { swiftUI } from "@/mappers";

const converters: ConverterFunction[] = [
  swiftUI.paddingConverter,
  swiftUI.opacityConverter,
  swiftUI.zIndexConverter,
  swiftUI.hiddenConverter,
  swiftUI.clippedConverter,
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

export function convertToJetpackComposeModifiers(
  style: DirectMappableStyle
): ViewModifier[] {
  return [];
}
