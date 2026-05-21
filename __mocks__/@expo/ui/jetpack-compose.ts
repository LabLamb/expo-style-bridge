import { ExpoModifier } from "@expo/ui/build/types";

export const padding = jest.fn((all: number): ExpoModifier => ({ type: "padding", all } as any));
export const size = jest.fn((width: number, height: number): ExpoModifier => ({ type: "size", width, height } as any));
export const fillMaxSize = jest.fn((): ExpoModifier => ({ type: "fillMaxSize" } as any));
export const offset = jest.fn((x: number, y: number): ExpoModifier => ({ type: "offset", x, y } as any));
export const background = jest.fn((color: string): ExpoModifier => ({ type: "background", color } as any));
export const border = jest.fn((borderWidth: number, borderColor: string): ExpoModifier => ({ type: "border", borderWidth, borderColor } as any));
export const shadow = jest.fn((elevation: number): ExpoModifier => ({ type: "shadow", elevation } as any));
export const alpha = jest.fn((alpha: number): ExpoModifier => ({ type: "alpha", alpha } as any));
export const blur = jest.fn((radius: number): ExpoModifier => ({ type: "blur", radius } as any));
export const clickable = jest.fn((callback: () => void): ExpoModifier => ({ type: "clickable", callback } as any));
export const rotate = jest.fn((degrees: number): ExpoModifier => ({ type: "rotate", degrees } as any));
export const zIndex = jest.fn((index: number): ExpoModifier => ({ type: "zIndex", index } as any));
