import { zIndex, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { ZIndexStyle } from "@/mappers/styles";

export default function convertZIndex(style: ZIndexStyle): ViewModifier {
  return zIndex(style.zIndex ?? 0);
}
