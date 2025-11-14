import { opacity, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { OpacityStyle } from "@/mappers/styles";

export default function convertOpacity(style: OpacityStyle): ViewModifier {
  return opacity(style.opacity ?? 1);
}
