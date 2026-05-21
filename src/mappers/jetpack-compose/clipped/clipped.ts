import { ModifierConfig } from "@/types";
import { ClippingStyle } from "@/mappers/styles";

// Jetpack Compose does not expose a clip() modifier in the current API.
export default function convertClipped(_style: ClippingStyle): ModifierConfig | undefined {
  return undefined;
}
