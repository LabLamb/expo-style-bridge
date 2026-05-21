import { frame, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DimensionStyle } from "@/mappers/styles";

function isValidDimension(
  value: unknown,
): value is number | string | null | undefined {
  return (
    value === undefined ||
    value === null ||
    typeof value === "number" ||
    typeof value === "string"
  );
}

function parseDimensionValue(value: unknown): number | undefined {
  if (!isValidDimension(value)) return undefined;
  if (value === undefined || value === null || value === "auto")
    return undefined;
  if (typeof value === "number") return value;
  if (value === "100%") return Infinity;
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.warn(
      `[expo-style-bridge] Unsupported dimension value: ${value}. Only numbers, "auto", and "100%" are supported.`,
    );
  }
  return undefined;
}

function parseNumber(value: unknown): number | undefined {
  if (!isValidDimension(value)) return undefined;
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number") return value;
  return undefined;
}

export default function convertFrame(style: DimensionStyle): ViewModifier {
  const width = parseDimensionValue(style.width);
  const height = parseDimensionValue(style.height);
  const minWidth = parseNumber(style.minWidth);
  const maxWidth = parseNumber(style.maxWidth);
  const minHeight = parseNumber(style.minHeight);
  const maxHeight = parseNumber(style.maxHeight);

  const params: Record<string, number> = {};
  if (width !== undefined) params.width = width;
  if (height !== undefined) params.height = height;
  if (minWidth !== undefined) params.minWidth = minWidth;
  if (maxWidth !== undefined) params.maxWidth = maxWidth;
  if (minHeight !== undefined) params.minHeight = minHeight;
  if (maxHeight !== undefined) params.maxHeight = maxHeight;

  return frame(params);
}
