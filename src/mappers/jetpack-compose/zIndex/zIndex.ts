import { ModifierConfig } from "@/types";
import { zIndex } from "@expo/ui/jetpack-compose/modifiers";
import { ZIndexStyle } from "@/mappers/styles";

export default function convertZIndex(style: ZIndexStyle): ModifierConfig {
  return zIndex(style.zIndex ?? 0);
}
