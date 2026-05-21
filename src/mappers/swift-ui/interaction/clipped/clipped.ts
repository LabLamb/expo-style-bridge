import { clipped, clipShape, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";

export default function convertClipped(
  style: DirectMappableStyle,
): ViewModifier {
  const shouldClip = style.overflow === "hidden";
  const borderRadius =
    typeof style.borderRadius === "number" ? style.borderRadius : 0;
  if (shouldClip && borderRadius > 0) {
    return clipShape("roundedRectangle", borderRadius);
  }
  return clipped(shouldClip);
}
