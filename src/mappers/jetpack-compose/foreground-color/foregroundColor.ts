import { ModifierConfig } from "@/types";
import { ColorStyle } from "@/mappers/styles";

// Jetpack Compose does not expose a tint() modifier in the current API.
export default function convertForegroundColor(
  _style: ColorStyle,
): ModifierConfig | undefined {
  return undefined;
}
