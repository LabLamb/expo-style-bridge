import { clipped, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { ClippingStyle } from "@/mappers/styles";

export default function convertClipped(style: ClippingStyle): ViewModifier {
  return clipped(style.overflow === "hidden");
}
