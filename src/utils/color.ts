import type { ColorValue } from "react-native";
import type { GradientValue } from "@/mappers/styles";

export type ColorShape =
  | "string"
  | "numeric"
  | "platform"
  | "dynamic-ios"
  | "gradient"
  | "unknown";

export function detectColorShape(value: unknown): ColorShape {
  if (value === undefined || value === null) return "unknown";
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "numeric";
  if (isGradientValue(value)) return "gradient";
  if (isPlatformColor(value)) return "platform";
  if (isDynamicColorIOS(value)) return "dynamic-ios";
  return "unknown";
}

export function isGradientValue(value: unknown): value is GradientValue {
  return (
    typeof value === "object" &&
    value !== null &&
    "gradient" in value &&
    typeof (value as Record<string, unknown>).gradient === "object" &&
    (value as Record<string, unknown>).gradient !== null &&
    "colors" in ((value as Record<string, unknown>).gradient as Record<string, unknown>)
  );
}

export function isPlatformColor(value: unknown): boolean {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    ("semantic" in obj && typeof obj.semantic === "string") ||
    ("resource_paths" in obj && Array.isArray(obj.resource_paths))
  );
}

export function isDynamicColorIOS(value: unknown): boolean {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  if ("dynamic" in obj && typeof obj.dynamic === "object" && obj.dynamic !== null) {
    const dynamic = obj.dynamic as Record<string, unknown>;
    return "light" in dynamic && "dark" in dynamic;
  }
  return false;
}

export function resolveDynamicColorForCompose(
  value: unknown,
  _colorScheme: "light" | "dark" = "light"
): ColorValue {
  if (isDynamicColorIOS(value)) {
    const dynamic = (value as Record<string, Record<string, unknown>>).dynamic;
    return (dynamic?.[_colorScheme] ?? dynamic?.light ?? "#000000") as ColorValue;
  }
  return value as ColorValue;
}

export function normalizeGradient(value: GradientValue): GradientValue {
  const { gradient } = value;
  return {
    gradient: {
      colors: gradient.colors,
      locations: gradient.locations,
      startPoint: gradient.startPoint ?? { x: 0.5, y: 0 },
      endPoint: gradient.endPoint ?? { x: 0.5, y: 1 },
    },
  };
}
