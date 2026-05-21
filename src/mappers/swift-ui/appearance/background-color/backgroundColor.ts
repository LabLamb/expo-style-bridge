import { background, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { ColorStyle } from "@/mappers/styles";
import { isGradientValue, normalizeGradient } from "../../../../utils/color";

export default function convertBackgroundColor(
  style: ColorStyle,
): ViewModifier {
  const { backgroundColor } = style;

  if (backgroundColor === undefined || backgroundColor === null) {
    return background("transparent");
  }

  if (isGradientValue(backgroundColor)) {
    // @ts-expect-error @expo/ui types don't include GradientValue for background() yet
    return background(normalizeGradient(backgroundColor));
  }

  return background(backgroundColor);
}
