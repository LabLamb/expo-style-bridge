import { ModifierConfig } from "@/types";
import { shadow } from "@expo/ui/jetpack-compose/modifiers";
import { ShadowStyle } from "@/mappers/styles";

export default function convertShadow(style: ShadowStyle): ModifierConfig {
  const elevation = style.elevation ?? 0;
  return shadow(elevation);
}
