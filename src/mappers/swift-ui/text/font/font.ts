import { font, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { TextStyle } from "@/mappers/styles";

const FONT_WEIGHT_MAP: Record<string, string> = {
  "100": "ultraLight",
  "200": "thin",
  "300": "light",
  "400": "regular",
  normal: "regular",
  "500": "medium",
  "600": "semibold",
  "700": "bold",
  bold: "bold",
  "800": "heavy",
  "900": "black",
};

function mapFontWeight(weight: TextStyle["fontWeight"]): string | undefined {
  if (weight === undefined) return undefined;
  return FONT_WEIGHT_MAP[weight];
}

export default function convertFont(
  style: TextStyle,
): ViewModifier | undefined {
  const size = style.fontSize;
  if (
    size === undefined &&
    style.fontWeight === undefined &&
    style.fontFamily === undefined
  ) {
    return undefined;
  }

  const params: Record<string, unknown> = {};

  if (size !== undefined) {
    params.size = size;
  }

  const weight = mapFontWeight(style.fontWeight);
  if (weight !== undefined) {
    params.weight = weight;
  }

  const family = style.fontFamily;
  if (family !== undefined) {
    params.family = family;
  }

  return font(params as { size: number });
}
