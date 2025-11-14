# expo-style-bridge

Convert React Native styles into SwiftUI or Jetpack Compose modifiers.

## Installation

```bash
npm install expo-style-bridge
```

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

const modifiers = convertToSwiftUIModifiers(style);

// Use the modifiers with a SwiftUI component
<Button modifiers={modifiers}>
  Click me
</Button>
```

## Supported Style Properties

- **Padding**: `padding`, `paddingHorizontal`, `paddingVertical`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`
- **Opacity**: `opacity`
- **Layout**: `zIndex`
- **Visibility**: `display` (maps to `hidden()`)
- **Clipping**: `overflow` (maps to `clipped()`)

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

## Requirements

- `@expo/ui` >= 0.2.0-beta.7
- `react-native` >= 0.82.0

## License

MIT