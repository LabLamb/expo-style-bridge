import {
  multilineTextAlignment,
  ViewModifier,
} from "@expo/ui/swift-ui/modifiers";
import { TextStyle } from "@/mappers/styles";

const ALIGNMENT_MAP: Record<string, "leading" | "center" | "trailing"> = {
  left: "leading",
  right: "trailing",
  center: "center",
  justify: "leading",
};

export default function convertMultilineTextAlignment(
  style: TextStyle,
): ViewModifier | undefined {
  const align = style.textAlign;
  if (align === undefined || align === "auto") return undefined;

  const swiftUIAlign = ALIGNMENT_MAP[align];
  if (swiftUIAlign === undefined) return undefined;

  return multilineTextAlignment(swiftUIAlign);
}
