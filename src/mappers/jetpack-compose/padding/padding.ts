import { padding } from "@expo/ui/jetpack-compose";
import { PaddingStyle } from "@/mappers/styles";
import { ExpoModifier } from "@expo/ui/build/types";

export default function convertPadding(style: PaddingStyle): ExpoModifier {
  return padding(0);
}
