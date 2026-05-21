import { lineSpacing, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { TextStyle } from "@/mappers/styles";

export default function convertLineSpacing(
  style: TextStyle,
): ViewModifier | undefined {
  if (style.lineHeight !== undefined) {
    return lineSpacing(style.lineHeight);
  }
  return undefined;
}
