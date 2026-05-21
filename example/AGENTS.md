# expo-style-bridge Example App — Agent Guide

## CRITICAL: SwiftUIHost `matchContents` Layout Constraint

`SwiftUIHost` from `@expo/ui/swift-ui` with the `matchContents` prop **cannot be placed inside any React Native flex container**. This is a hard native-side measurement limitation, not a bug in this codebase.

### What breaks `matchContents`

Wrapping `SwiftUIHost matchContents` in **any** of these causes it to measure zero and render as a tiny dot/circle:

- `<View style={{ alignItems: 'center' }}>` ❌
- `<View style={{ alignItems: 'flex-start' }}>` ❌
- `<View style={{ flexDirection: 'row', justifyContent: 'center' }}>` ❌
- `<View style={{ flexDirection: 'column', justifyContent: 'center' }}>` ❌
- Any flex container ancestor with non-default alignment ❌

### What works

`SwiftUIHost matchContents` must be a **direct child of a non-flex container** or placed where no ancestor flex container interferes with its measurement:

```jsx
// ✅ CORRECT — no flex wrapper
<SwiftUIHost matchContents>
  <SwiftUIText modifiers={mods}>Label</SwiftUIText>
</SwiftUIHost>

// ❌ WRONG — inside flex container
<View style={{ alignItems: 'center' }}>
  <SwiftUIHost matchContents>...</SwiftUIHost>
</View>

// ❌ WRONG — row flex container also breaks it
<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
  <SwiftUIHost matchContents>...</SwiftUIHost>
</View>
```

### Practical implication for this example app

The native buttons (which use `SwiftUIHost matchContents`) **cannot be centered** using standard RN flexbox techniques. They will align naturally within their parent column. The RN side can be centered with `alignItems: 'center'`, but do not apply the same wrapper to the native side.

### If you need centering

You have two options:

1. **Don't center** — accept natural alignment (what the example app does)
2. **Don't use `matchContents`** — let `SwiftUIHost` fill its parent, then control size via SwiftUI modifiers (`frame(width: 200)`, etc.). But this changes the semantics of the demo.

## Related code

See `App.js`:
- `NativeButton` component uses `SwiftUIHost matchContents`
- `CompareRow` intentionally does NOT wrap `nativeNode` in any flex container
- `rnWrapper` (which has `alignItems: 'center'`) is only used for the RN side
