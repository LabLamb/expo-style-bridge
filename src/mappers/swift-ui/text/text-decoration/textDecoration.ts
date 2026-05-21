import {
  underline,
  strikethrough,
  ViewModifier,
} from "@expo/ui/swift-ui/modifiers";
import { TextStyle } from "@/mappers/styles";

const STYLE_MAP: Record<string, string> = {
  solid: "solid",
  dotted: "dot",
  dashed: "dash",
};

export default function convertTextDecoration(
  style: TextStyle,
): ViewModifier[] {
  const modifiers: ViewModifier[] = [];
  const line = style.textDecorationLine;

  if (line === undefined || line === "none") {
    return modifiers;
  }

  const buildParams = () => {
    const params: { isActive: boolean; color?: string; pattern?: string } = {
      isActive: true,
    };
    if (style.textDecorationColor !== undefined) {
      params.color = style.textDecorationColor;
    }
    const pattern = style.textDecorationStyle;
    if (pattern !== undefined && pattern !== "double") {
      const mappedPattern = STYLE_MAP[pattern];
      if (mappedPattern !== undefined) {
        params.pattern = mappedPattern;
      }
    }
    return params;
  };

  if (line.includes("underline")) {
    modifiers.push(underline(buildParams() as Parameters<typeof underline>[0]));
  }

  if (line.includes("line-through")) {
    modifiers.push(
      strikethrough(buildParams() as Parameters<typeof strikethrough>[0]),
    );
  }

  return modifiers;
}
