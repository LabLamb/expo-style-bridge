import {
  scaleEffect,
  rotationEffect,
  offset,
  ViewModifier,
} from "@expo/ui/swift-ui/modifiers";
import { TransformStyle, TransformOperation } from "@/mappers/styles";

function parseRotation(angle: string | number): number {
  if (typeof angle === "number") return angle;
  const match = angle.match(/^(-?\d+(?:\.\d+)?)\s*deg$/);
  if (match) return parseFloat(match[1]);
  return parseFloat(angle) || 0;
}

function convertTransformOperation(op: TransformOperation): ViewModifier | undefined {
  if ("scale" in op) return scaleEffect(op.scale);
  if ("scaleX" in op) return scaleEffect(op.scaleX);
  if ("scaleY" in op) return scaleEffect(op.scaleY);
  if ("rotate" in op) return rotationEffect(parseRotation(op.rotate));
  if ("translateX" in op) return offset({ x: op.translateX, y: 0 });
  if ("translateY" in op) return offset({ x: 0, y: op.translateY });

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    const key = Object.keys(op)[0];
    console.warn(
      `[expo-style-bridge] Unsupported transform operation: ${key}. Skipping.`
    );
  }
  return undefined;
}

export default function convertTransform(
  style: TransformStyle
): ViewModifier[] {
  const modifiers: ViewModifier[] = [];
  for (const op of style.transform ?? []) {
    const modifier = convertTransformOperation(op);
    if (modifier !== undefined) {
      modifiers.push(modifier);
    }
  }
  return modifiers;
}
