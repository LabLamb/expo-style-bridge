import type { ViewStyle } from "react-native";

export type BorderStyle = Pick<
  ViewStyle,
  "borderWidth" | "borderColor" | "borderRadius"
>;
