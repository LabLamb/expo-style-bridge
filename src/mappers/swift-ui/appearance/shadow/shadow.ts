import { shadow, ViewModifier } from "@expo/ui/swift-ui/modifiers";
import { ShadowStyle } from "@/mappers/styles";

function colorToString(color: unknown): string | undefined {
  if (color === undefined || color === null) return undefined;
  if (typeof color === "string") return color;
  return undefined;
}

/**
 * Blend opacity into a hex color string.
 * RN uses separate shadowColor + shadowOpacity.
 * SwiftUI shadow() takes a single color with alpha.
 *
 * Supports: #RGB, #RRGGBB, #AARRGGBB
 * Returns #AARRGGBB with blended alpha.
 */
function blendOpacity(color: string, opacity: number): string {
  const sanitized = color.trim();

  let r: number, g: number, b: number, a: number;

  if (sanitized.length === 4) {
    // #RGB
    r = parseInt(sanitized[1] + sanitized[1], 16);
    g = parseInt(sanitized[2] + sanitized[2], 16);
    b = parseInt(sanitized[3] + sanitized[3], 16);
    a = 255;
  } else if (sanitized.length === 7) {
    // #RRGGBB
    r = parseInt(sanitized.slice(1, 3), 16);
    g = parseInt(sanitized.slice(3, 5), 16);
    b = parseInt(sanitized.slice(5, 7), 16);
    a = 255;
  } else if (sanitized.length === 9) {
    // #AARRGGBB
    a = parseInt(sanitized.slice(1, 3), 16);
    r = parseInt(sanitized.slice(3, 5), 16);
    g = parseInt(sanitized.slice(5, 7), 16);
    b = parseInt(sanitized.slice(7, 9), 16);
  } else {
    // Unrecognized format — pass through as-is and let native handle it
    return sanitized;
  }

  const blendedAlpha = Math.round(a * Math.max(0, Math.min(1, opacity)));
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(blendedAlpha)}${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export default function convertShadow(style: ShadowStyle): ViewModifier {
  const params: { radius: number; x?: number; y?: number; color?: string } = {
    radius:
      style.shadowRadius ??
      (style.elevation !== undefined ? style.elevation * 0.5 : 0),
    x: style.shadowOffset?.width ?? 0,
    y:
      style.shadowOffset?.height ??
      (style.elevation !== undefined ? style.elevation * 0.3 : 0),
  };

  const color = colorToString(style.shadowColor);
  if (color !== undefined) {
    const opacity =
      style.shadowOpacity !== undefined ? (style.shadowOpacity as number) : 1;
    params.color = blendOpacity(color, opacity);
  }

  return shadow(params);
}
