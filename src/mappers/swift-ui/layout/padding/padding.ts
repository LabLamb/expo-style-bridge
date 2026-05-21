import { padding, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { PaddingStyle } from "@/mappers/styles";

export default function convertPadding(style: PaddingStyle): ViewModifier {
  const params: Record<string, number> = {};
  if (style.padding !== undefined) params.all = style.padding;
  if (style.paddingHorizontal !== undefined)
    params.horizontal = style.paddingHorizontal;
  if (style.paddingVertical !== undefined)
    params.vertical = style.paddingVertical;
  if (style.paddingTop !== undefined) params.top = style.paddingTop;
  if (style.paddingBottom !== undefined) params.bottom = style.paddingBottom;
  if (style.paddingLeft !== undefined) params.leading = style.paddingLeft;
  if (style.paddingRight !== undefined) params.trailing = style.paddingRight;
  return padding(params);
}
