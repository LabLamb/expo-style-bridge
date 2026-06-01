import type { ModifierConfig } from "@expo/ui/jetpack-compose/modifiers";

export const padding = jest.fn(
  (all: number): ModifierConfig => ({ type: "padding", all }) as any,
);
export const size = jest.fn(
  (width: number, height: number): ModifierConfig =>
    ({ type: "size", width, height }) as any,
);
export const fillMaxSize = jest.fn(
  (): ModifierConfig => ({ type: "fillMaxSize" }) as any,
);
export const offset = jest.fn(
  (x: number, y: number): ModifierConfig => ({ type: "offset", x, y }) as any,
);
export const background = jest.fn(
  (color: string): ModifierConfig => ({ type: "background", color }) as any,
);
export const border = jest.fn(
  (borderWidth: number, borderColor: string): ModifierConfig =>
    ({ type: "border", borderWidth, borderColor }) as any,
);
export const shadow = jest.fn(
  (elevation: number): ModifierConfig => ({ type: "shadow", elevation }) as any,
);
export const alpha = jest.fn(
  (alpha: number): ModifierConfig => ({ type: "alpha", alpha }) as any,
);
export const blur = jest.fn(
  (radius: number): ModifierConfig => ({ type: "blur", radius }) as any,
);
export const clickable = jest.fn(
  (callback: () => void): ModifierConfig =>
    ({ type: "clickable", callback }) as any,
);
export const rotate = jest.fn(
  (degrees: number): ModifierConfig => ({ type: "rotate", degrees }) as any,
);
export const zIndex = jest.fn(
  (index: number): ModifierConfig => ({ type: "zIndex", index }) as any,
);
