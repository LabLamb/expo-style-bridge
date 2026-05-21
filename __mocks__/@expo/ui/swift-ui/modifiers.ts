/**
 * Mock for @expo/ui/swift-ui/modifiers
 *
 * Each modifier function returns a flat ModifierConfig-like object that tests
 * can compare with strict equality. This avoids needing to load the real
 * native module (which pulls in expo-asset ESM and breaks Jest).
 */

export type ViewModifier = Record<string, unknown>;
export type ModifierConfig = Record<string, unknown>;

function mod(type: string, rest?: Record<string, unknown>): ModifierConfig {
  return rest ? { $type: type, ...rest } : { $type: type };
}

// Layout
export const padding = (params: unknown) =>
  mod("padding", params as Record<string, unknown>);
export const frame = (params: unknown) =>
  mod("frame", params as Record<string, unknown>);
export const aspectRatio = (params: unknown) =>
  mod("aspectRatio", params as Record<string, unknown>);

// Appearance
export const background = (color: unknown, shape?: unknown) =>
  shape ? mod("background", { color, shape }) : mod("background", { color });
export const border = (params: unknown) =>
  mod("border", params as Record<string, unknown>);
export const cornerRadius = (radius: number) => mod("cornerRadius", { radius });
export const tint = (color: string) => mod("tint", { color });

// Text
export const font = (params: unknown) =>
  mod("font", params as Record<string, unknown>);
export const foregroundColor = (color: string) =>
  mod("foregroundColor", { color });
export const foregroundStyle = (style: unknown) =>
  mod("foregroundStyle", { style });
export const italic = () => mod("italic");
export const bold = () => mod("bold");
export const kerning = (value: number) => mod("kerning", { value });
export const lineSpacing = (value: number) => mod("lineSpacing", { value });
export const multilineTextAlignment = (alignment: string) =>
  mod("multilineTextAlignment", { alignment });
export const textCase = (value: string) => mod("textCase", { value });
export const underline = (params: unknown) =>
  mod("underline", params as Record<string, unknown>);
export const strikethrough = (params: unknown) =>
  mod("strikethrough", params as Record<string, unknown>);
export const lineLimit = (limit: unknown, options?: unknown) =>
  options ? mod("lineLimit", { limit, options }) : mod("lineLimit", { limit });

// Shadow
export const shadow = (params: unknown) =>
  mod("shadow", params as Record<string, unknown>);

// Effects
export const opacity = (value: number) => mod("opacity", { value });
export const grayscale = (amount: number) => mod("grayscale", { amount });
export const blur = (radius: number) => mod("blur", { radius });
export const brightness = (amount: number) => mod("brightness", { amount });
export const contrast = (amount: number) => mod("contrast", { amount });
export const saturation = (amount: number) => mod("saturation", { amount });
export const hueRotation = (angle: number) => mod("hueRotation", { angle });
export const colorInvert = (inverted?: boolean) =>
  mod("colorInvert", { inverted });

// Transform
export const scaleEffect = (scale: unknown) => mod("scaleEffect", { scale });
export const rotationEffect = (angle: number) =>
  mod("rotationEffect", { angle });
export const offset = (params: unknown) =>
  mod("offset", params as Record<string, unknown>);
export const rotation3DEffect = (params: unknown) =>
  mod("rotation3DEffect", params as Record<string, unknown>);

// Interaction
export const clipped = (clipped?: boolean) => mod("clipped", { clipped });
export const clipShape = (shape: string, cornerRadius?: number) =>
  mod("clipShape", { shape, cornerRadius });
export const onTapGesture = (handler: unknown) =>
  mod("onTapGesture", { handler });
export const onLongPressGesture = (
  handler: unknown,
  minimumDuration?: number,
) => mod("onLongPressGesture", { handler, minimumDuration });
export const contentShape = (shape: unknown) => mod("contentShape", { shape });

// Visibility
export const hidden = (hidden?: boolean) => mod("hidden", { hidden });
export const zIndex = (index: number) => mod("zIndex", { index });

// Animation / Misc
export const animation = (animationObject: unknown, animatedValue: unknown) =>
  mod("animation", { animationObject, animatedValue });
export const mask = (shape: string, cornerRadius?: number) =>
  mod("mask", { shape, cornerRadius });
export const overlay = (params: unknown) =>
  mod("overlay", params as Record<string, unknown>);
export const backgroundOverlay = (params: unknown) =>
  mod("backgroundOverlay", params as Record<string, unknown>);
export const layoutPriority = (priority: number) =>
  mod("layoutPriority", { priority });
export const fixedSize = (params: unknown) =>
  mod("fixedSize", params as Record<string, unknown>);
export const environment = (config: unknown) => mod("environment", { config });
export const disabled = (disabled?: boolean) => mod("disabled", { disabled });
export const controlSize = (size: string) => mod("controlSize", { size });
export const containerShape = (shape: unknown) =>
  mod("containerShape", { shape });
export const tag = (tag: unknown) => mod("tag", { tag });
export const resizable = (capInsets?: unknown, resizingMode?: string) =>
  mod("resizable", { capInsets, resizingMode });
export const monospacedDigit = () => mod("monospacedDigit");
export const textSelection = (value: boolean) =>
  mod("textSelection", { value });
export const truncationMode = (mode: string) => mod("truncationMode", { mode });
export const submitLabel = (submitLabel: string) =>
  mod("submitLabel", { submitLabel });
export const textContentType = (textContentType: string) =>
  mod("textContentType", { textContentType });
export const textFieldStyle = (style: string) =>
  mod("textFieldStyle", { style });
export const toggleStyle = (style: string) => mod("toggleStyle", { style });
export const buttonStyle = (style: string) => mod("buttonStyle", { style });
export const pickerStyle = (style: string) => mod("pickerStyle", { style });
export const datePickerStyle = (style: string) =>
  mod("datePickerStyle", { style });
export const gaugeStyle = (style: string) => mod("gaugeStyle", { style });
export const progressViewStyle = (style: string) =>
  mod("progressViewStyle", { style });
export const listStyle = (style: string) => mod("listStyle", { style });
export const refreshable = (handler: unknown) =>
  mod("refreshable", { handler });
export const presentationDetents = (detents: unknown, options?: unknown) =>
  mod("presentationDetents", { detents, options });
export const presentationDragIndicator = (visibility: string) =>
  mod("presentationDragIndicator", { visibility });
export const presentationBackgroundInteraction = (interaction: unknown) =>
  mod("presentationBackgroundInteraction", { interaction });
export const interactiveDismissDisabled = (isDisabled?: boolean) =>
  mod("interactiveDismissDisabled", { isDisabled });
export const scrollDisabled = (disabled?: boolean) =>
  mod("scrollDisabled", { disabled });
export const scrollDismissesKeyboard = (mode: string) =>
  mod("scrollDismissesKeyboard", { mode });
export const scrollTargetBehavior = (behavior: string) =>
  mod("scrollTargetBehavior", { behavior });
export const scrollTargetLayout = () => mod("scrollTargetLayout");
export const defaultScrollAnchor = (anchor: unknown) =>
  mod("defaultScrollAnchor", { anchor });
export const scrollContentBackground = (visible: string) =>
  mod("scrollContentBackground", { visible });
export const deleteDisabled = (disabled?: boolean) =>
  mod("deleteDisabled", { disabled });
export const moveDisabled = (disabled?: boolean) =>
  mod("moveDisabled", { disabled });
export const onAppear = (handler: unknown) => mod("onAppear", { handler });
export const onDisappear = (handler: unknown) =>
  mod("onDisappear", { handler });
export const onSubmit = (handler: unknown) => mod("onSubmit", { handler });
export const matchedGeometryEffect = (id: string, namespaceId: string) =>
  mod("matchedGeometryEffect", { id, namespaceId });
export const accessibilityHint = (hint: string) =>
  mod("accessibilityHint", { hint });
export const accessibilityLabel = (label: string) =>
  mod("accessibilityLabel", { label });
export const accessibilityValue = (value: string) =>
  mod("accessibilityValue", { value });
export const allowsTightening = (value: boolean) =>
  mod("allowsTightening", { value });
export const autocorrectionDisabled = (disabled?: boolean) =>
  mod("autocorrectionDisabled", { disabled });
export const keyboardType = (keyboardType: string) =>
  mod("keyboardType", { keyboardType });
export const textInputAutocapitalization = (autocapitalization: string) =>
  mod("textInputAutocapitalization", { autocapitalization });
export const labelsHidden = () => mod("labelsHidden");
export const labelStyle = (style: string) => mod("labelStyle", { style });
export const listRowBackground = (color: string) =>
  mod("listRowBackground", { color });
export const listRowInsets = (params: unknown) =>
  mod("listRowInsets", params as Record<string, unknown>);
export const listRowSeparator = (visibility: string, edges?: string) =>
  mod("listRowSeparator", { visibility, edges });
export const listSectionMargins = (params?: unknown) =>
  mod("listSectionMargins", params as Record<string, unknown>);
export const listSectionSpacing = (spacing: unknown) =>
  mod("listSectionSpacing", { spacing });
export const headerProminence = (prominence: string) =>
  mod("headerProminence", { prominence });
export const badge = (value?: string) => mod("badge", { value });
export const badgeProminence = (badgeType: string) =>
  mod("badgeProminence", { badgeType });
export const widgetURL = (url: string) => mod("widgetURL", { url });
export const widgetAccentedRenderingMode = (renderingMode: string) =>
  mod("widgetAccentedRenderingMode", { renderingMode });
export const glassEffect = (params?: unknown) =>
  mod("glassEffect", params as Record<string, unknown>);
export const glassEffectId = (id: string, namespaceId: string) =>
  mod("glassEffectId", { id, namespaceId });
export const luminanceToAlpha = () => mod("luminanceToAlpha");
export const ignoreSafeArea = (params?: unknown) =>
  mod("ignoreSafeArea", params as Record<string, unknown>);
export const contentTransition = (transitionType: string, params?: unknown) =>
  mod("contentTransition", { transitionType, params });
export const containerRelativeFrame = (params: unknown) =>
  mod("containerRelativeFrame", params as Record<string, unknown>);
export const gridCellAnchor = (anchor: unknown) =>
  mod("gridCellAnchor", { anchor });
export const gridCellColumns = (count?: number) =>
  mod("gridCellColumns", { count });
export const gridCellUnsizedAxes = (axes?: string) =>
  mod("gridCellUnsizedAxes", { axes });
export const gridColumnAlignment = (alignment?: string) =>
  mod("gridColumnAlignment", { alignment });

// Factory
export const createModifier = (type: string, params?: unknown) =>
  params === undefined
    ? { $type: type }
    : {
        $type: type,
        ...(typeof params === "object" && params !== null
          ? params
          : { params }),
      };

export const createModifierWithEventListener = (
  type: string,
  eventListener: unknown,
  params?: unknown,
) => createModifier(type, { eventListener, params });

export const createViewModifierEventListener = (modifiers: unknown) =>
  createModifier("createViewModifierEventListener", modifiers);

// Constants
export const Animation = {
  default: { $type: "Animation.default" },
  easeInOut: { $type: "Animation.easeInOut" },
  easeIn: { $type: "Animation.easeIn" },
  easeOut: { $type: "Animation.easeOut" },
  linear: { $type: "Animation.linear" },
  spring: (params: unknown) => ({ $type: "Animation.spring", params }),
  interpolatingSpring: (params: unknown) => ({
    $type: "Animation.interpolatingSpring",
    params,
  }),
};

export const shapes = {
  roundedRectangle: (params?: unknown) => ({
    $type: "Shape.roundedRectangle",
    params,
  }),
  capsule: () => ({ $type: "Shape.capsule" }),
  rectangle: () => ({ $type: "Shape.rectangle" }),
  ellipse: () => ({ $type: "Shape.ellipse" }),
  circle: () => ({ $type: "Shape.circle" }),
};
