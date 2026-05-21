import { ModifierConfig } from "@/types";
import { background } from "@expo/ui/jetpack-compose/modifiers";
import { ColorStyle } from "@/mappers/styles";
import { isGradientValue, normalizeGradient } from "../../../utils/color";

export default function convertBackgroundColor(
  style: ColorStyle,
): ModifierConfig {
  const { backgroundColor } = style;

  if (backgroundColor === undefined || backgroundColor === null) {
    return background("transparent");
  }

  if (isGradientValue(backgroundColor)) {
    // Compose background expects a string; gradients may not be fully supported yet.
    // Pass through normalized gradient object and let downstream handle it.
    return background(JSON.stringify(normalizeGradient(backgroundColor)));
  }

  return background(String(backgroundColor));
}
