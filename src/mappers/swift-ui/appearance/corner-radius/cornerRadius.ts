import { cornerRadius, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { BorderStyle } from "@/mappers/styles";

export default function convertCornerRadius(style: BorderStyle): ViewModifier {
  const radius =
    typeof style.borderRadius === "number" ? style.borderRadius : 0;
  return cornerRadius(radius);
}
