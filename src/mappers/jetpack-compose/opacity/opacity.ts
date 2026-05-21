import { ModifierConfig } from "@/types";
import { alpha } from "@expo/ui/jetpack-compose/modifiers";
import { OpacityStyle } from "@/mappers/styles";

export default function convertOpacity(style: OpacityStyle): ModifierConfig {
  return alpha(style.opacity ?? 1);
}
