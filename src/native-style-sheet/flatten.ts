import { DirectMappableStyle } from "@/types";
import { NativeStyleDescriptor } from "./descriptor";

export type StyleInput = NativeStyleDescriptor | DirectMappableStyle | undefined | false | null;

export function flatten(...styles: StyleInput[]): DirectMappableStyle {
  const result: Record<string, unknown> = {};
  for (const style of styles) {
    if (!style) continue;
    const raw = "raw" in style ? style.raw : style;
    Object.assign(result, raw);
  }
  return result as DirectMappableStyle;
}
