import { hidden, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { VisibilityStyle } from "@/types";

export default function convertHidden(style: VisibilityStyle): ViewModifier {
  return hidden(style.display === "none");
}
