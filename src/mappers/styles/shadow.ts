import type { ViewStyle } from "react-native";

export type ShadowOffset = { width: number; height: number };

export type ShadowStyle = Pick<
  ViewStyle,
  "shadowColor" | "shadowOffset" | "shadowOpacity" | "shadowRadius" | "elevation"
>;
