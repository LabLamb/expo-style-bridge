import type { FlexStyle } from "react-native";

export type DimensionStyle = Pick<
  FlexStyle,
  "width" | "height" | "minWidth" | "maxWidth" | "minHeight" | "maxHeight" | "aspectRatio"
>;
