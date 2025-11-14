import { padding, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { PaddingStyle } from "@/mappers/styles";

export default function convertPadding(style: PaddingStyle): ViewModifier {
  return padding({
    all: style.padding,
    horizontal: style.paddingHorizontal,
    vertical: style.paddingVertical,
    top: style.paddingTop,
    bottom: style.paddingBottom,
    leading: style.paddingLeft,
    trailing: style.paddingRight,
  });
}
