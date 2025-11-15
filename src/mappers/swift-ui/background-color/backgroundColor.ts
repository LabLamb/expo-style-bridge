import { background, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { ColorStyle } from "@/mappers/styles";

export default function convertBackgroundColor(
  style: ColorStyle
): ViewModifier {
  return background(style.backgroundColor ?? "transparent");
}
