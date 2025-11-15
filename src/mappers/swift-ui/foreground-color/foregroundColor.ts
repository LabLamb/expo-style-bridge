import { foregroundColor, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { ColorStyle } from "@/mappers/styles";

export default function convertForegroundColor(
  style: ColorStyle
): ViewModifier {
  return foregroundColor(style.color ?? "black");
}
