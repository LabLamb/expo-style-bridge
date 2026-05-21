import type { DirectMappableStyle } from "@/types";

export type WithStyleProp<NativeProps extends object> = Omit<
  NativeProps,
  "modifiers"
> & {
  style?: DirectMappableStyle | DirectMappableStyle[];
};
