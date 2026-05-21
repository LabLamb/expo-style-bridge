import { textCase, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { TextStyle } from "@/mappers/styles";

export default function convertTextCase(
  style: TextStyle,
): ViewModifier | undefined {
  const transform = style.textTransform;
  if (transform === "uppercase" || transform === "lowercase") {
    return textCase(transform);
  }
  return undefined;
}
