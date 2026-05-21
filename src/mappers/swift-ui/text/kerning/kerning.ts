import { kerning, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { TextStyle } from "@/mappers/styles";

export default function convertKerning(
  style: TextStyle,
): ViewModifier | undefined {
  if (style.letterSpacing !== undefined) {
    return kerning(style.letterSpacing);
  }
  return undefined;
}
