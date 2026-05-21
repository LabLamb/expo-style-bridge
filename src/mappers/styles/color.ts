import type { ColorValue } from "react-native";

export interface GradientValue {
  gradient: {
    colors: ColorValue[];
    locations?: number[];
    startPoint?: { x: number; y: number };
    endPoint?: { x: number; y: number };
  };
}

export type ColorStyle = {
  backgroundColor?: ColorValue | GradientValue;
  color?: ColorValue;
};
