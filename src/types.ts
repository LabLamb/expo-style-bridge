import type {
  FlexStyle,
  TransformsStyle,
  ViewStyle,
  ImageStyle,
} from "react-native";

/**
 * Strict type containing ONLY the directly mappable style properties
 * from SwiftUI modifiers to React Native styles.
 * All property types are derived from React Native's official types.
 */

/**
 * Padding values that can be used with SwiftUI modifiers.
 * These are strictly numeric (no percentages or strings allowed).
 */
export type PaddingStyle = {
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
};

/**
 * Opacity value for SwiftUI modifiers.
 * Must be a number between 0 and 1.
 */
export type OpacityStyle = {
  opacity?: number;
};

/**
 * Z-index value for SwiftUI modifiers.
 * Controls the stacking order of views.
 */
export type ZIndexStyle = {
  zIndex?: number;
};

/**
 * Visibility style for SwiftUI modifiers.
 * Maps display property to hidden modifier.
 */
export type VisibilityStyle = {
  display?: "none" | "flex";
};

/**
 * Clipping style for SwiftUI modifiers.
 * Maps overflow property to clipped modifier.
 */
export type ClippingStyle = {
  overflow?: "visible" | "hidden" | "scroll";
};

export type DimensionStyle =
  | "width"
  | "height"
  | "minWidth"
  | "maxWidth"
  | "minHeight"
  | "maxHeight";

export type DirectMappableStyle = PaddingStyle &
  OpacityStyle &
  ZIndexStyle &
  VisibilityStyle &
  ClippingStyle &
  DimensionStyle &
  Pick<FlexStyle, "aspectRatio"> &
  Pick<TransformsStyle, "transform"> &
  Pick<ViewStyle, "borderColor" | "borderWidth">;
