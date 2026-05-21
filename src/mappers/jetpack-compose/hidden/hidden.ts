import { ModifierConfig } from "@/types";
import { VisibilityStyle } from "@/mappers/styles";

// Jetpack Compose does not expose a hidden() modifier.
// We return undefined and let the converter skip it.
export default function convertHidden(_style: VisibilityStyle): ModifierConfig | undefined {
  return undefined;
}
