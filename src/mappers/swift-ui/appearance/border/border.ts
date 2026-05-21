import { border, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { BorderStyle } from "@/mappers/styles";

export default function convertBorder(style: BorderStyle): ViewModifier {
  const width = style.borderWidth ?? 1;
  const color = style.borderColor ?? "black";
  return border({ color, width });
}
