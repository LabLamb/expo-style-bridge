export type TransformOperation =
  | { scale: number }
  | { scaleX: number }
  | { scaleY: number }
  | { rotate: string | number }
  | { rotateX: string | number }
  | { rotateY: string | number }
  | { rotateZ: string | number }
  | { translateX: number }
  | { translateY: number }
  | { perspective: number }
  | { skewX: string | number }
  | { skewY: string | number };

export type TransformStyle = {
  transform?: TransformOperation[];
};
