import { ModifierConfig } from "@/types";
import { rotate, offset } from "@expo/ui/jetpack-compose/modifiers";
import { TransformStyle, TransformOperation } from "@/mappers/styles";

function parseRotation(angle: string | number): number {
  if (typeof angle === "number") return angle;
  const match = angle.match(/^(-?\d+(?:\.\d+)?)\s*deg$/);
  if (match) return parseFloat(match[1]);
  return parseFloat(angle) || 0;
}

function convertTransformOperation(
  op: TransformOperation,
): ModifierConfig | undefined {
  if ("rotate" in op) return rotate(parseRotation(op.rotate));
  if ("translateX" in op) return offset(op.translateX, 0);
  if ("translateY" in op) return offset(0, op.translateY);

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    const key = Object.keys(op)[0];
    console.warn(
      `[expo-style-bridge] Unsupported Compose transform operation: ${key}. Skipping.`,
    );
  }
  return undefined;
}

export default function convertTransform(
  style: TransformStyle,
): ModifierConfig[] {
  const modifiers: ModifierConfig[] = [];
  for (const op of style.transform ?? []) {
    const modifier = convertTransformOperation(op);
    if (modifier !== undefined) {
      modifiers.push(modifier);
    }
  }
  return modifiers;
}
