import type {
  FlexStyle,
  TransformsStyle,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import type {
  PaddingStyle,
  OpacityStyle,
  ZIndexStyle,
  VisibilityStyle,
  ClippingStyle,
  ColorStyle,
} from "@/mappers";

/**
 * Strict type containing ONLY the directly mappable style properties
 * from SwiftUI modifiers to React Native styles.
 * All property types are derived from React Native's official types.
 */

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
  ColorStyle &
  DimensionStyle &
  Pick<FlexStyle, "aspectRatio"> &
  Pick<TransformsStyle, "transform"> &
  Pick<ViewStyle, "borderColor" | "borderWidth">;

/**
 * Function type for style converters.
 * Takes a style object and current modifiers array, returns updated modifiers array.
 */
export type ConverterFunction = (
  style: DirectMappableStyle,
  modifiers: ViewModifier[]
) => ViewModifier[];

