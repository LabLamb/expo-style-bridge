import { ModifierConfig } from "@/types";
import type { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle, ConverterFunction } from "@/types";
import { swiftUI, jetpackCompose } from "@/mappers";

const swiftUIConverters: ConverterFunction<ViewModifier>[] = [
  // 1. Layout
  swiftUI.frameConverter,
  swiftUI.aspectRatioConverter,
  swiftUI.paddingConverter,
  // 2. Appearance
  swiftUI.backgroundColorConverter,
  swiftUI.foregroundColorConverter,
  swiftUI.fontConverter,
  swiftUI.italicConverter,
  swiftUI.kerningConverter,
  swiftUI.lineSpacingConverter,
  swiftUI.multilineTextAlignmentConverter,
  swiftUI.textCaseConverter,
  swiftUI.textDecorationConverter,
  swiftUI.borderConverter,
  swiftUI.cornerRadiusConverter,
  swiftUI.tintConverter,
  // 3. Shadow
  swiftUI.shadowConverter,
  // 4. Effects
  swiftUI.opacityConverter,
  // 5. Transforms — MUST come after appearance/shadow so they affect
  // the entire composed view (background + text), not just the raw text.
  swiftUI.transformConverter,
  // 6. Clipping
  swiftUI.clippedConverter,
  // 7. Visibility
  swiftUI.zIndexConverter,
  swiftUI.hiddenConverter,
];

const composeConverters: ConverterFunction<ModifierConfig>[] = [
  // 1. Layout
  jetpackCompose.paddingConverter,
  // 2. Transforms
  // 3. Appearance
  jetpackCompose.backgroundColorConverter,
  jetpackCompose.foregroundColorConverter,
  jetpackCompose.borderConverter,
  // jetpackCompose.cornerRadiusConverter, // not available in current @expo/ui API
  // 4. Shadow
  jetpackCompose.shadowConverter,
  // 5. Effects
  jetpackCompose.opacityConverter,
  // 6. Clipping
  jetpackCompose.clippedConverter,
  // 7. Visibility
  jetpackCompose.zIndexConverter,
  jetpackCompose.hiddenConverter,
];

export function convertToSwiftUIModifiers(
  style: DirectMappableStyle,
): ViewModifier[] {
  return swiftUIConverters.reduce(
    (modifiers, converter) => converter(style, modifiers),
    [] as ViewModifier[],
  );
}

export function convertToJetpackComposeModifiers(
  style: DirectMappableStyle,
): ModifierConfig[] {
  return composeConverters.reduce(
    (modifiers, converter) => converter(style, modifiers),
    [] as ModifierConfig[],
  );
}

// Re-export NativeStyleSheet
export { NativeStyleSheet } from "@/native-style-sheet";
export type { NativeStyleDescriptor } from "@/native-style-sheet";

// Re-export component factory
export { createNativeComponent, useStyleConversion } from "@/components";
export type { WithStyleProp } from "@/components";

// Export types for external use
export type {
  DirectMappableStyle,
  ConverterFunction,
  SwiftUIConverterFunction,
  ComposeConverterFunction,
  PaddingStyle,
  OpacityStyle,
  ZIndexStyle,
  VisibilityStyle,
  ClippingStyle,
  ColorStyle,
  DimensionStyle,
  BorderStyle,
  ShadowStyle,
  TransformStyle,
  TextStyle,
  TintStyle,
} from "@/types";
