# expo-style-bridge

[![npm version](https://badge.fury.io/js/expo-style-bridge.svg)](https://www.npmjs.com/package/expo-style-bridge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`expo-style-bridge` is a **style transformation library** that automatically converts React Native StyleSheet properties into native **SwiftUI modifiers** (iOS) and **Jetpack Compose modifiers** (Android). Perfect for developers building **cross-platform apps** with Expo who need to integrate native UI components while maintaining consistent styling.

### Why use expo-style-bridge?

- 🔄 **Seamless conversion** from React Native styles to native platform modifiers
- 📱 **Cross-platform support** for iOS (SwiftUI) and Android (Jetpack Compose)
- 🎨 **Type-safe** styling with full TypeScript support
- ⚡ **Zero runtime overhead** - compile-time transformations
- 🧩 **Modular architecture** - use only what you need
- 🔧 **Extensible** - easily add custom style converters

## Usage

```typescript
import { convertToSwiftUIModifiers } from 'expo-style-bridge';
import { Button } from '@expo/ui/swift-ui';

const style = {
  padding: 16,
  opacity: 0.8,
  zIndex: 10,
  display: 'none',
  overflow: 'hidden'
};

const modifiers = convertToSwiftUIModifiers(style); // modifiers is an array

// Use the modifiers with a SwiftUI component
<Button modifiers={modifiers}>
  Click me
</Button>
```


## Installation

Install via npm, yarn, or pnpm:

```bash
npm install expo-style-bridge
# or
yarn add expo-style-bridge
# or
pnpm add expo-style-bridge
```

## Supported Style Properties

Transform React Native StyleSheet properties into native platform equivalents:

- **Padding**: `padding`, `paddingHorizontal`, `paddingVertical`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight` → SwiftUI `.padding()` 
- **Opacity**: `opacity` → SwiftUI `.opacity()`
- **Layout**: `zIndex` → SwiftUI `.zIndex()`
- **Visibility**: `display` → SwiftUI `.hidden()`
- **Clipping**: `overflow` → SwiftUI `.clipped()`
- **Colors**: `backgroundColor`, `color` → SwiftUI `.background()` / `.foregroundColor()`

### Roadmap

Upcoming style property support:
- Gradients
- Border styling (width, radius, color)
- Shadow and elevation
- Transforms (rotate, scale, translate)
- Flexbox layout properties
- Jetpack compose

## Project Structure

```
src/
├── index.ts              # Main converter with reducer pattern
├── types.ts              # TypeScript type definitions
└── mappers/              # Individual style converters
    ├── padding/
    ├── opacity/
    ├── zIndex/
    ├── hidden/
    └── clipped/
```

Each mapper is a self-contained converter with tests. To add a new converter:
1. Create a folder in `src/mappers/`
2. Implement the converter function
3. Add tests
4. Integrate into the reducer chain in `src/index.ts`

## Use Cases

- **Expo Native Modules**: Integrate custom native UI components with React Native styling
- **Hybrid Apps**: Build apps that mix React Native and native views seamlessly
- **Migration Projects**: Gradually migrate from React Native to native platforms
- **Design Systems**: Maintain consistent styling across React Native and native components
- **Performance Optimization**: Leverage native rendering while keeping React Native DX

## Requirements

- `@expo/ui` >= 0.2.0-beta.7
- `react-native` >= 0.82.0
- TypeScript >= 4.0 (recommended)

## Related Projects

- [@expo/ui](https://www.npmjs.com/package/@expo/ui) - Expo's native UI component library
- [React Native](https://reactnative.dev) - Build native apps using React
- [Expo](https://expo.dev) - Framework for universal React applications

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit PRs for new style converters or improvements.

## License

MIT © [LabLamb](https://github.com/LabLamb)