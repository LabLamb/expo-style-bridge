# expo-style-bridge Example

This example app demonstrates how to use `expo-style-bridge` to convert React Native styles into native SwiftUI / Jetpack Compose modifiers for `@expo/ui` components.

It uses [`expo-dev-client`](https://docs.expo.dev/develop/development-builds/introduction/) so you get the fast iteration of Expo Go while still being able to run native code.

## Prerequisites

- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Xcode (for iOS) or Android Studio (for Android)

## Setup

```bash
cd example
pnpm install
```

## Build the development client (one time)

You need a native development build because `@expo/ui` contains native code that cannot run inside Expo Go.

### iOS
```bash
npx expo run:ios
```

### Android
```bash
npx expo run:android
```

> If you get CocoaPods or Gradle errors, make sure you have Xcode / Android Studio set up.

## Run

Once the development client is installed on your simulator or device, start the dev server:

```bash
pnpm start     # runs: expo start --dev-client
```

Then scan the QR code with your device, or press `i` / `a` to open on iOS / Android simulator.

## What is showcased

| Section | API | Description |
|---------|-----|-------------|
| **1. NativeStyleSheet** | `NativeStyleSheet.create()` | Type-safe style descriptors (like `StyleSheet` but scoped to mappable properties) |
| **2. createNativeComponent** | `createNativeComponent()` | Factory that wraps a native component and auto-converts a `style` prop into platform modifiers |
| **3. Shadows & Cards** | `NativeStyleSheet` with shadow props | `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius` |
| **4. useStyleConversion** | `useStyleConversion(style, platform)` | Hook for dynamic style → modifier conversion |
| **5. Direct Conversion** | `convertToSwiftUIModifiers()` / `convertToJetpackComposeModifiers()` | Manual conversion when you need full control |
| **6. Borders** | Inline style objects | `borderWidth` + `borderColor` on native buttons |

## Type safety demo

Try adding a blocked property (e.g. `margin: 16`) to any style object in `App.js` — TypeScript will emit an error at build time, preventing runtime surprises.
