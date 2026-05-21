import { italic, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { TextStyle } from "@/mappers/styles";

export default function convertItalic(
  style: TextStyle,
): ViewModifier | undefined {
  if (style.fontStyle === "italic") {
    return italic();
  }
  return undefined;
}
