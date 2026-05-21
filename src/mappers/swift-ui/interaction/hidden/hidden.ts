import { hidden, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { VisibilityStyle } from "@/mappers/styles";

export default function convertHidden(style: VisibilityStyle): ViewModifier {
  return hidden(style.display === "none");
}
