import { aspectRatio, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DimensionStyle } from "@/mappers/styles";

export default function convertAspectRatio(
  style: DimensionStyle,
): ViewModifier {
  const ratio = typeof style.aspectRatio === "number" ? style.aspectRatio : 1;
  return aspectRatio({
    ratio,
    contentMode: "fit",
  });
}
