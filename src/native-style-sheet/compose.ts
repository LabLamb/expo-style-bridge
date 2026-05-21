import { createNativeStyleDescriptor, NativeStyleDescriptor } from "./descriptor";
import { flatten, StyleInput } from "./flatten";

export function compose(...styles: StyleInput[]): NativeStyleDescriptor {
  return createNativeStyleDescriptor(flatten(...styles));
}
