import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  View,
  Text as RNText,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  NativeStyleSheet,
  convertToSwiftUIModifiers,
  convertToJetpackComposeModifiers,
  createNativeComponent,
  useStyleConversion,
} from "expo-style-bridge";

const isIOS = Platform.OS === "ios";

let SwiftUIText;
let SwiftUISlider;
let SwiftUIHost;
let ComposeButton;
let ComposeSlider;
let ComposeText;

try {
  if (isIOS) {
    const SwiftUI = require("@expo/ui/swift-ui");
    SwiftUIText = SwiftUI.Text;
    SwiftUISlider = SwiftUI.Slider;
    SwiftUIHost = SwiftUI.Host;
  } else {
    const Compose = require("@expo/ui/jetpack-compose");
    ComposeButton = Compose.Button;
    ComposeSlider = Compose.Slider;
    ComposeText = Compose.Text;
  }
} catch {
  // Native components not available
}

const StyledNativeText = isIOS
  ? createNativeComponent({
      nativeComponent: SwiftUIText,
      convertStyle: convertToSwiftUIModifiers,
    })
  : createNativeComponent({
      nativeComponent: ComposeButton,
      convertStyle: convertToJetpackComposeModifiers,
    });

const nativeStyles = NativeStyleSheet.create({
  pill: {
    padding: 16,
    backgroundColor: "#007AFF",
    borderRadius: 24,
    opacity: 1,
    color: "#FFFFFF",
  },
  card: {
    padding: 20,
    backgroundColor: "#F2F2F7",
    borderRadius: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    color: "#000000",
  },
  destructive: {
    padding: 14,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    opacity: 0.95,
    color: "#FFFFFF",
  },
  bordered: {
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 8,
    opacity: 1,
    color: "#007AFF",
  },
  transformed: {
    padding: 16,
    backgroundColor: "#FF9500",
    borderRadius: 24,
    opacity: 0.9,
    transform: [{ rotate: "5deg" }],
    color: "#FFFFFF",
  },
});

// Native "button" using Text + onTapGesture inside Host matchContents.
// CRITICAL: SwiftUIHost must NOT be inside any flex container with
// alignItems:'center' — matchContents measures zero in that context.
function NativeButton({ label, modifiers, onPress }) {
  if (isIOS) {
    const { onTapGesture } = require("@expo/ui/swift-ui/modifiers");
    const tapMods = [...(modifiers || []), onTapGesture(onPress)];
    return (
      <SwiftUIHost matchContents>
        <SwiftUIText modifiers={tapMods}>{label}</SwiftUIText>
      </SwiftUIHost>
    );
  }
  return (
    <ComposeButton label={label} modifiers={modifiers} onPress={onPress} />
  );
}

export default function App() {
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);

  const dynamicStyle = {
    padding: 16,
    backgroundColor: "#5856D6",
    borderRadius: 12,
    opacity,
    transform: [{ scale }],
    color: "#FFFFFF",
  };

  const dynamicModifiers = useStyleConversion(
    dynamicStyle,
    isIOS ? "ios" : "android",
  );

  if (!isIOS ? !ComposeButton : !SwiftUIText) {
    return (
      <View style={styles.container}>
        <RNText style={styles.warning}>
          Native UI components are not available in Expo Go.{"\n"}
          Run with `npx expo run:ios` or `npx expo run:android`.
        </RNText>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <RNText style={styles.title}>expo-style-bridge</RNText>
      <RNText style={styles.subtitle}>
        Same style object → RN Views vs Native Modifiers
      </RNText>

      {/* Sections 1-5: Two-column comparison */}
      <View style={styles.compareSection}>
        <View style={styles.row}>
          {/* RN Column */}
          <View style={[styles.column, styles.rnColumn]}>
            <RNText style={styles.columnLabel}>React Native</RNText>

            <RNText style={styles.sectionLabel}>1. Background</RNText>
            <TouchableOpacity
              style={nativeStyles.pill.raw}
              onPress={() => alert("RN pill!")}
              activeOpacity={0.8}
            >
              <RNText style={styles.rnButtonText}>Pill Button</RNText>
            </TouchableOpacity>

            <RNText style={styles.sectionLabel}>2. Component</RNText>
            <TouchableOpacity
              style={nativeStyles.destructive.raw}
              onPress={() => alert("RN destructive!")}
              activeOpacity={0.8}
            >
              <RNText style={styles.rnButtonText}>Delete</RNText>
            </TouchableOpacity>

            <RNText style={styles.sectionLabel}>3. Shadow</RNText>
            <View style={nativeStyles.card.raw}>
              <RNText style={styles.rnCardText}>RN Card</RNText>
            </View>

            <RNText style={styles.sectionLabel}>4. Borders</RNText>
            <TouchableOpacity
              style={nativeStyles.bordered.raw}
              onPress={() => alert("RN bordered!")}
              activeOpacity={0.8}
            >
              <RNText style={styles.rnBorderedText}>Bordered</RNText>
            </TouchableOpacity>

            <RNText style={styles.sectionLabel}>5. Transform</RNText>
            <TouchableOpacity
              style={nativeStyles.transformed.raw}
              onPress={() => alert("RN rotated!")}
              activeOpacity={0.8}
            >
              <RNText style={styles.rnButtonText}>Rotated</RNText>
            </TouchableOpacity>
          </View>

          {/* Native Column */}
          <View style={[styles.column, styles.nativeColumn]}>
            {isIOS ? (
              <SwiftUIHost>
                <SwiftUIText
                  modifiers={convertToSwiftUIModifiers({
                    fontSize: 11,
                    color: "#888",
                    textAlign: "center",
                  })}
                >
                  SwiftUI
                </SwiftUIText>
              </SwiftUIHost>
            ) : (
              <RNText style={styles.columnLabel}>Jetpack Compose</RNText>
            )}

            <RNText style={styles.sectionLabel}>1. Background</RNText>
            <NativeButton
              label="Pill Button"
              modifiers={
                isIOS ? nativeStyles.pill.swiftUI : nativeStyles.pill.jetpack
              }
              onPress={() => alert("Native pill!")}
            />

            <RNText style={styles.sectionLabel}>2. Component</RNText>
            <SwiftUIHost matchContents>
              <StyledNativeText
                style={nativeStyles.destructive.raw}
                modifiers={[
                  require("@expo/ui/swift-ui/modifiers").onTapGesture(() =>
                    alert("Native destructive!"),
                  ),
                ]}
              >
                Delete
              </StyledNativeText>
            </SwiftUIHost>

            <RNText style={styles.sectionLabel}>3. Shadow</RNText>
            <NativeButton
              label="Native Card"
              modifiers={
                isIOS ? nativeStyles.card.swiftUI : nativeStyles.card.jetpack
              }
              onPress={() => alert("Native card!")}
            />

            <RNText style={styles.sectionLabel}>4. Borders</RNText>
            <NativeButton
              label="Bordered"
              modifiers={
                isIOS
                  ? nativeStyles.bordered.swiftUI
                  : nativeStyles.bordered.jetpack
              }
              onPress={() => alert("Native bordered!")}
            />

            <RNText style={styles.sectionLabel}>5. Transform</RNText>
            <NativeButton
              label="Rotated"
              modifiers={
                isIOS
                  ? nativeStyles.transformed.swiftUI
                  : nativeStyles.transformed.jetpack
              }
              onPress={() => alert("Native rotated!")}
            />
          </View>
        </View>
      </View>

      {/* Section 6: Dynamic */}
      <View style={styles.compareSection}>
        <RNText style={styles.compareLabel}>
          6. Dynamic (Opacity & Scale)
        </RNText>
        <RNText style={styles.caption}>Opacity: {opacity.toFixed(2)}</RNText>
        <SwiftUIHost matchContents>
          {isIOS && SwiftUISlider && (
            <SwiftUISlider
              value={opacity}
              onValueChange={setOpacity}
              modifiers={convertToSwiftUIModifiers({ padding: 8 })}
            />
          )}
          {!isIOS && ComposeSlider && (
            <ComposeSlider
              value={opacity}
              onValueChange={setOpacity}
              modifiers={convertToJetpackComposeModifiers({ padding: 8 })}
            />
          )}
        </SwiftUIHost>

        <RNText style={styles.caption}>Scale: {scale.toFixed(2)}</RNText>
        <SwiftUIHost matchContents>
          {isIOS && SwiftUISlider && (
            <SwiftUISlider
              value={scale}
              onValueChange={setScale}
              modifiers={convertToSwiftUIModifiers({ padding: 8 })}
            />
          )}
          {!isIOS && ComposeSlider && (
            <ComposeSlider
              value={scale}
              onValueChange={setScale}
              modifiers={convertToJetpackComposeModifiers({ padding: 8 })}
            />
          )}
        </SwiftUIHost>

        <View style={styles.row}>
          <View style={[styles.column, styles.rnColumn]}>
            <RNText style={styles.columnLabel}>React Native</RNText>
            <TouchableOpacity
              style={dynamicStyle}
              onPress={() => alert("RN dynamic!")}
              activeOpacity={0.8}
            >
              <RNText style={styles.rnButtonText}>Dynamic</RNText>
            </TouchableOpacity>
          </View>
          <View style={[styles.column, styles.nativeColumn]}>
            {isIOS ? (
              <SwiftUIHost>
                <SwiftUIText
                  modifiers={convertToSwiftUIModifiers({
                    fontSize: 11,
                    color: "#888",
                    textAlign: "center",
                  })}
                >
                  SwiftUI
                </SwiftUIText>
              </SwiftUIHost>
            ) : (
              <RNText style={styles.columnLabel}>Jetpack Compose</RNText>
            )}
            <NativeButton
              label="Dynamic"
              modifiers={dynamicModifiers}
              onPress={() => alert("Native dynamic!")}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16, paddingBottom: 60, gap: 12 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  warning: { fontSize: 16, textAlign: "center", color: "#FF3B30" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 12,
  },
  compareSection: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  compareLabel: { fontSize: 15, fontWeight: "600", marginBottom: 4 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#BBB",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  row: { flexDirection: "row", gap: 12 },
  // NOTE: Do NOT use alignItems:'center' on the native column — it breaks matchContents sizing
  column: { flex: 1, gap: 8 },
  rnColumn: { alignItems: "center" },
  columnLabel: {
    fontSize: 11,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  caption: { fontSize: 12, color: "#888", marginTop: 4 },
  rnButtonText: { color: "#FFFFFF", fontWeight: "600", textAlign: "center" },
  rnCardText: { color: "#000000", fontWeight: "600", textAlign: "center" },
  rnBorderedText: { color: "#007AFF", fontWeight: "600", textAlign: "center" },
  nativeColumn: { paddingHorizontal: 16 },
});
