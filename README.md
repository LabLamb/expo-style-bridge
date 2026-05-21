# expo-style-bridge

[![npm version](https://badge.fury.io/js/expo-style-bridge.svg)](https://www.npmjs.com/package/expo-style-bridge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`expo-style-bridge` is a **style transformation library** that converts React Native **Sizing** and **Style** properties into native **SwiftUI modifiers** (iOS) and **Jetpack Compose modifiers** (Android). It does **not** handle Layout or Behaviour properties — by design.

## Why this library exists

React Native developers are familiar with `StyleSheet` objects. `@expo/ui` (SwiftUI / Jetpack Compose) requires composing modifier arrays by hand. This library bridges that gap: **drop your existing style objects onto native UI components**.

### What it does

- 🔄 Converts RN **Sizing** properties (`width`, `height`, `aspectRatio`, etc.) to native sizing modifiers
- 🎨 Converts RN **Style** properties (`padding`, `borderRadius`, `backgroundColor`, `transform`, etc.) to native visual modifiers
- 📱 Cross-platform: same style object produces SwiftUI modifiers on iOS, Compose modifiers on Android
- 🎨 **Type-safe** — blocked properties are rejected at build time
- 🔧 Extensible reducer pattern for adding new converters

### What it does NOT do (by design)

- ❌ **Layout** (`margin`, `flex`, `position`, `top`/`left`/`right`/`bottom`) — these require parent container cooperation (Stacks, Rows, Columns, Boxes). A child modifier cannot control its parent's layout engine.
- ❌ **Behaviour** (`pointerEvents`, `onLayout`, `accessibility*`, `hitSlop`) — these are component-level interaction concerns, not visual modifiers.
- ❌ **Style gaps** — properties that have no native modifier equivalent (`skewX`, per-edge borders, `backfaceVisibility`) are type-blocked.

> **The rule:** If a property requires parent container cooperation or has no native modifier equivalent, it is **type-blocked**. You get a TypeScript error at build time, not a surprise at runtime.

---

## Usage

```typescript
import { convertToSwiftUIModifiers, convertToJetpackComposeModifiers } from 'expo-style-bridge';
import { Button } from '@expo/ui/swift-ui';

const style = {
  padding: 16,
  backgroundColor: '#007AFF',
  borderRadius: 8,
  opacity: 0.9,
};

// iOS
const swiftModifiers = convertToSwiftUIModifiers(style);
<Button modifiers={swiftModifiers}>Click me</Button>

// Android
const composeModifiers = convertToJetpackComposeModifiers(style);
<Button modifiers={composeModifiers}>Click me</Button>
```

**Blocked properties are rejected at build time:**

```typescript
// ❌ TypeScript error: 'margin' does not exist in type 'DirectMappableStyle'
convertToSwiftUIModifiers({ margin: 16 });

// ❌ TypeScript error: 'flex' does not exist in type 'DirectMappableStyle'
convertToSwiftUIModifiers({ flex: 1 });
```

---

## Installation

```bash
npm install expo-style-bridge
# or
yarn add expo-style-bridge
# or
pnpm add expo-style-bridge
```

---

## Supported Properties

### ✅ Sizing (1:1 mappable)

| Property | SwiftUI | Compose |
|----------|---------|---------|
| `width` / `height` | `frame(width:)` / `frame(height:)` | `width()` / `height()` |
| `minWidth` / `maxWidth` | `frame(minWidth:)` / `frame(maxWidth:)` | `widthIn(min=)` / `widthIn(max=)` |
| `minHeight` / `maxHeight` | `frame(minHeight:)` / `frame(maxHeight:)` | `heightIn(min=)` / `heightIn(max=)` |
| `aspectRatio` | `aspectRatio()` | `aspectRatio()` |
| `width: '100%'` / `height: '100%'` | `frame(maxWidth: .infinity)` | `fillMaxWidth()` |

### ✅ Style (1:1 mappable)

| Property | SwiftUI | Compose | Notes |
|----------|---------|---------|-------|
| `padding*` | `padding()` | `padding()` | All padding variants |
| `borderWidth` + `borderColor` | `border()` | `border()` | Uniform only |
| `borderRadius` | `cornerRadius()` | `cornerRadius()` | Uniform only |
| `backgroundColor` | `background()` | `background()` | |
| `color` | `foregroundStyle()` | `tint()` | |
| `opacity` | `opacity()` | `alpha()` | |
| `overflow: 'hidden'` | `clipped()` | `clip()` | `'visible'` is default, `'scroll'` blocked |
| `display: 'none'` | `hidden()` | `hidden()` | `'flex'` is default |
| `zIndex` | `zIndex()` | `zIndex()` | |
| `transform` | `scaleEffect()`, `rotationEffect()`, `offset()` | `scaleEffect()`, `rotate()`, `offset()` | Scale, rotate, translate only |
| `shadowColor` + `offset` + `opacity` + `radius` | `shadow()` | `shadow()` | Parameter remapping |
| `elevation` | — | `shadow()` / elevation | Android only; blocked on iOS |
| `fontFamily` / `fontSize` / `fontWeight` | `font()` | `font()` | |
| `letterSpacing` | `kerning()` | `letterSpacing()` | |
| `lineHeight` | `lineHeight()` / `lineSpacing()` | `lineHeight()` | |
| `textAlign` | `multilineTextAlignment()` | `textAlign()` | |
| `textDecorationLine` | `underline()` / `strikethrough()` | — | SwiftUI only |
| `textTransform` | `textCase()` | — | SwiftUI only |

### ❌ Type-Blocked Properties

These properties are **rejected at build time** by TypeScript. If bypassed with `as any`, they are silently ignored at runtime (dev-only warning).

**Layout (blocked):**
`margin*`, `flex*`, `flexDirection`, `justifyContent`, `alignItems`, `alignSelf`, `position`, `top`, `left`, `right`, `bottom`, `start`, `end`, `gap*`, `rowGap`, `columnGap`

> Why: These require parent container cooperation. Modifiers alone cannot implement flexbox, margins, or absolute positioning.

**Behaviour (blocked):**
`pointerEvents`, `onLayout`, `testID`, `accessibility*`, `hitSlop`, `role`, `nativeID`, `collapsable`

> Why: These are component-level interaction/accessibility concerns, not visual modifiers.

**Style gaps (blocked — no native modifier equivalent):**
`borderTopWidth` / per-edge borders, `borderTopLeftRadius` / per-corner radius, `borderStyle`, `borderCurve`, `transform: skewX` / `skewY`, `transform: matrix`, `backfaceVisibility`, `writingDirection`, `includeFontPadding`

> Why: SwiftUI / Jetpack Compose do not expose modifiers for these properties.

---

## Scope Rationale

React Native styles conflate four independent concerns into a single `StyleSheet` object:

| Concern | What it controls | In scope? | Example |
|---------|------------------|-----------|---------|
| **Sizing** | Intrinsic dimensions | ✅ Yes | `width`, `height`, `aspectRatio` |
| **Style** | Visual appearance | ✅ Yes | `backgroundColor`, `borderRadius`, `transform` |
| **Layout** | Position relative to parent/siblings | ❌ No | `margin`, `flex`, `position` |
| **Behaviour** | Interaction & accessibility | ❌ No | `pointerEvents`, `onLayout`, `accessibility*` |

**Why Layout is out of scope:**
- `margin` has no modifier — spacing between siblings is controlled by the parent stack (`spacing:` parameter, `Spacer`).
- `flex: 1` only works inside a `VStack`/`HStack`/`Row`/`Column`. A child modifier cannot force its parent to be a stack.
- `position: 'absolute'` requires the parent to be a `ZStack`/`Box`. Modifiers alone cannot break out of layout flow.

**Why Behaviour is out of scope:**
- `pointerEvents` has no modifier equivalent — SwiftUI only has `.allowsHitTesting(bool)`, not RN's enum.
- `onLayout` is an event callback, not a visual property.
- `accessibility*` are component properties, not modifiers.

**Why some Style properties are blocked:**
- Per-edge borders (`borderTopWidth`) — SwiftUI `.border()` is uniform only. Per-edge requires overlay shapes.
- Per-corner radius (`borderTopLeftRadius`) — `cornerRadius()` is uniform. `UnevenRoundedRectangle` is not exposed by `@expo/ui`.
- `skewX` / `skewY` — No native skew modifier in SwiftUI.

---

## Project Structure

```
src/
├── index.ts              # Main converter with reducer pattern
├── types.ts              # TypeScript type definitions & scope boundary
└── mappers/              # Individual style converters
    ├── swift-ui/         # iOS converters
    ├── jetpack-compose/  # Android converters
    └── styles/           # Shared style type definitions
```

Each mapper is a self-contained converter with tests. To add a new converter:
1. Create a folder in `src/mappers/swift-ui/` or `src/mappers/jetpack-compose/`
2. Implement the converter function
3. Add tests
4. Integrate into the reducer chain in `src/index.ts`

---

## Use Cases

- **Expo Native Modules**: Integrate custom native UI components with React Native styling
- **Hybrid Apps**: Build apps that mix React Native and native views seamlessly
- **Migration Projects**: Gradually migrate from React Native to native platforms
- **Design Systems**: Maintain consistent styling across React Native and native components
- **Performance Optimization**: Leverage native rendering while keeping React Native DX

---

## Requirements

- `@expo/ui` >= 0.2.0-beta.7
- `react-native` >= 0.81.5
- TypeScript >= 4.0 (recommended)

---

## Related Projects

- [@expo/ui](https://www.npmjs.com/package/@expo/ui) - Expo's native UI component library
- [React Native](https://reactnative.dev) - Build native apps using React
- [Expo](https://expo.dev) - Framework for universal React applications

---

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit PRs for new style converters or improvements.

---

## License

MIT © [LabLamb](https://github.com/LabLamb)
