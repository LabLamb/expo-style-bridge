import { clipped, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { ClippingStyle } from "@/types";

export default function convertClipped(style: ClippingStyle): ViewModifier {
  return clipped(style.overflow === "hidden");
}
