import { ModifierConfig } from "@/types";
import type { ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { DirectMappableStyle } from "@/types";
import {
  convertToSwiftUIModifiers,
  convertToJetpackComposeModifiers,
} from "../index";

export interface NativeStyleDescriptor {
  readonly raw: DirectMappableStyle;
  readonly swiftUI: ViewModifier[];
  readonly jetpack: ModifierConfig[];
}

export function createNativeStyleDescriptor(
  raw: DirectMappableStyle,
): NativeStyleDescriptor {
  let swiftCache: ViewModifier[] | undefined;
  let jetpackCache: ModifierConfig[] | undefined;

  return {
    get raw() {
      return raw;
    },
    get swiftUI() {
      if (swiftCache === undefined) {
        swiftCache = convertToSwiftUIModifiers(raw);
      }
      return swiftCache;
    },
    get jetpack() {
      if (jetpackCache === undefined) {
        jetpackCache = convertToJetpackComposeModifiers(raw);
      }
      return jetpackCache;
    },
  };
}
