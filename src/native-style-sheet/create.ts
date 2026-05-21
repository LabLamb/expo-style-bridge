import { DirectMappableStyle } from "@/types";
import { createNativeStyleDescriptor, NativeStyleDescriptor } from "./descriptor";

export function create<T extends Record<string, DirectMappableStyle>>(
  styles: T
): { [K in keyof T]: NativeStyleDescriptor } {
  const result = {} as { [K in keyof T]: NativeStyleDescriptor };
  for (const key of Object.keys(styles) as Array<keyof T>) {
    result[key] = createNativeStyleDescriptor(styles[key]);
  }
  return result;
}
