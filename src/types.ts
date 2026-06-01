import type { FlexStyle, TransformsStyle, ViewStyle } from "react-native";
import type { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import type {
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
} from "@/mappers/styles";

// Local copy of ModifierConfig for backward compatibility with @expo/ui 55.
// v56+ exports ModifierConfig from public paths, but keeping a local copy ensures
// the library works across both versions without forcing consumers to upgrade.
export interface ModifierConfig {
  $type: string;
  $scope?: string;
  [key: string]: unknown;
}

// Re-export style types for external use
export type {
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
};

// =============================================================================
// DirectMappableStyle
// The strict intersection of all sizing and style properties supported by
// expo-style-bridge.
//
// EXPLICITLY EXCLUDED (Layout & Behaviour):
//   margin*, flex*, flexDirection, justifyContent, alignItems, alignSelf,
//   position, top, left, right, bottom, start, end, gap*, rowGap, columnGap,
//   pointerEvents, onLayout, testID, accessibility*, hitSlop, role, etc.
//
// These are blocked at the type level so users get build-time errors.
// =============================================================================

export type DirectMappableStyle =
  // Sizing
  DimensionStyle &
    // Box model (internal)
    PaddingStyle &
    // Visual style
    OpacityStyle &
    ZIndexStyle &
    VisibilityStyle &
    ClippingStyle &
    ColorStyle &
    BorderStyle &
    ShadowStyle &
    TransformStyle &
    TintStyle &
    TextStyle;

// =============================================================================
// Converter Function Type
// =============================================================================

export type ConverterFunction<M = ViewModifier> = (
  style: DirectMappableStyle,
  modifiers: M[],
) => M[];

// Platform-specific aliases for readability
export type SwiftUIConverterFunction = ConverterFunction<ViewModifier>;
export type ComposeConverterFunction = ConverterFunction<ModifierConfig>;
