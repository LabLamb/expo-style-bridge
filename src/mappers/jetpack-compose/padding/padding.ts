import { ModifierConfig } from "@/types";
import { paddingAll } from "@expo/ui/jetpack-compose/modifiers";
import { PaddingStyle } from "@/mappers/styles";

export default function convertPadding(style: PaddingStyle): ModifierConfig {
  return paddingAll(style.padding ?? 0);
}
