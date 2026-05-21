import { ModifierConfig } from "@/types";
import { border } from "@expo/ui/jetpack-compose/modifiers";
import { BorderStyle } from "@/mappers/styles";

export default function convertBorder(style: BorderStyle): ModifierConfig {
  const width = style.borderWidth ?? 1;
  const color = String(style.borderColor ?? "black");
  return border(width, color);
}
