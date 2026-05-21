import React, { useMemo } from "react";
import { Platform } from "react-native";
import type { DirectMappableStyle } from "@/types";
import {
  convertToSwiftUIModifiers,
  convertToJetpackComposeModifiers,
} from "@/index";

export interface CreateNativeComponentOptions<
  NativeProps extends object,
  NativeModifier extends object,
> {
  nativeComponent: React.ComponentType<any>;
  convertStyle: (style: DirectMappableStyle) => NativeModifier[];
  propFilter?: (key: string) => boolean;
  postProcessModifiers?: (
    modifiers: NativeModifier[],
    props: any,
  ) => NativeModifier[];
}

function flattenStyle(
  style: DirectMappableStyle | DirectMappableStyle[] | undefined,
): DirectMappableStyle | undefined {
  if (!style) return undefined;
  if (!Array.isArray(style)) return style;
  return style.reduce(
    (acc, s) => (s ? { ...acc, ...s } : acc),
    {} as DirectMappableStyle,
  );
}

export function createNativeComponent<
  NativeProps extends object,
  NativeModifier extends object,
>(
  options: CreateNativeComponentOptions<NativeProps, NativeModifier>,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<any> & React.RefAttributes<any>
> {
  const {
    nativeComponent: NativeComponent,
    convertStyle,
    propFilter,
    postProcessModifiers,
  } = options;

  return React.forwardRef<any, any>(({ style, ...rest }, ref) => {
    const flattened = flattenStyle(style);
    const modifiers = useMemo(() => {
      if (!flattened) return undefined;
      let mods = convertStyle(flattened);
      if (postProcessModifiers) {
        mods = postProcessModifiers(mods, rest);
      }
      return mods;
    }, [flattened, rest]);

    const filteredProps = useMemo(() => {
      if (!propFilter) return rest;
      const filtered: Record<string, unknown> = {};
      for (const key of Object.keys(rest)) {
        if (propFilter(key)) {
          filtered[key] = rest[key];
        }
      }
      return filtered;
    }, [rest]);

    return React.createElement(NativeComponent, {
      ref,
      ...filteredProps,
      modifiers,
    });
  });
}

export function useStyleConversion(
  style: DirectMappableStyle | undefined,
  platform: "ios" | "android",
) {
  const flattened = useMemo(() => flattenStyle(style), [style]);
  const modifiers = useMemo(() => {
    if (!flattened) return undefined;
    return platform === "ios"
      ? convertToSwiftUIModifiers(flattened)
      : convertToJetpackComposeModifiers(flattened);
  }, [flattened, platform]);
  return modifiers;
}
