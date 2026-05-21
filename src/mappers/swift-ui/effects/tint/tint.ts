import { tint, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { TintStyle } from "@/mappers/styles";

export default function convertTint(style: TintStyle): ViewModifier {
  return tint(style.tintColor ?? "black");
}
