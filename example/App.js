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
let ComposeHost;

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
    ComposeHost = Compose.Host;
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
      nativeComponent: ComposeText,
      convertStyle: convertToJetpackComposeModifiers,
    });

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
    <ComposeHost matchContents>
      <ComposeButton label={label} modifiers={modifiers} onPress={onPress} />
    </ComposeHost>
  );
}

const nativeStyles = NativeStyleSheet.create({
  layoutBox: {
    width: 120,
    height: 60,
    padding: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    color: "#FFFFFF",
  },
  aspectBox: {
    width: 100,
    height: 100,
    padding: 10,
    backgroundColor: "#34C759",
    borderRadius: 8,
    color: "#FFFFFF",
  },
  paddedBox: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#5856D6",
    borderRadius: 8,
    color: "#FFFFFF",
  },
  typography: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "System",
    fontStyle: "italic",
    letterSpacing: 1,
    lineHeight: 26,
    textAlign: "center",
    textTransform: "uppercase",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#FF9500",
    color: "#000000",
  },
  colorBox: {
    padding: 16,
    backgroundColor: "#FF2D55",
    color: "#FFFFFF",
    borderRadius: 8,
  },
  tintBox: {
    padding: 16,
    backgroundColor: "#E5E5EA",
    tintColor: "#007AFF",
    borderRadius: 8,
    color: "#007AFF",
  },
  borderedBox: {
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#FF9500",
    borderRadius: 12,
    color: "#FF9500",
  },
  shadowBox: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    color: "#000000",
  },
  transformScale: {
    padding: 14,
    backgroundColor: "#AF52DE",
    borderRadius: 10,
    transform: [{ scale: 1.1 }],
    color: "#FFFFFF",
  },
  transformRotate: {
    padding: 14,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    transform: [{ rotate: "-5deg" }],
    color: "#FFFFFF",
  },
  transformTranslate: {
    padding: 14,
    backgroundColor: "#5AC8FA",
    borderRadius: 10,
    transform: [{ translateX: 8 }, { translateY: -4 }],
    color: "#FFFFFF",
  },
  opacityBox: {
    padding: 14,
    backgroundColor: "#34C759",
    borderRadius: 10,
    opacity: 0.6,
    color: "#FFFFFF",
  },
  clippedBox: {
    width: 80,
    height: 80,
    backgroundColor: "#FF9500",
    borderRadius: 40,
    overflow: "hidden",
    color: "#FFFFFF",
  },
  zIndexBox: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 6,
    zIndex: 10,
    color: "#FFFFFF",
  },
  hiddenBox: {
    padding: 10,
    backgroundColor: "#FF3B30",
    borderRadius: 6,
    display: "none",
    color: "#FFFFFF",
  },
});

function Section({ label, children }) {
  return (
    <View style={styles.section}>
      <RNText style={styles.sectionTitle}>{label}</RNText>
      {children}
    </View>
  );
}

function CompareRow({ rn, native }) {
  return (
    <View style={styles.compareRow}>
      <View style={styles.rnSide}>{rn}</View>
      <View style={styles.nativeSide}>{native}</View>
    </View>
  );
}

export default function App() {
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [padding, setPadding] = useState(12);
  const [showHidden, setShowHidden] = useState(false);

  const dynamicStyle = {
    padding,
    backgroundColor: "#5856D6",
    borderRadius: 12,
    opacity,
    transform: [{ scale }, { rotate: `${rotate}deg` }],
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
        Every modifier → RN Views vs Native Modifiers
      </RNText>

      <View style={styles.columnHeaders}>
        <RNText style={styles.columnLabel}>React Native</RNText>
        <RNText style={styles.columnLabel}>
          {isIOS ? "SwiftUI" : "Jetpack Compose"}
        </RNText>
      </View>

      {/* Layout */}
      <Section label="Layout">
        <CompareRow
          rn={
            <View style={nativeStyles.layoutBox.raw}>
              <RNText style={styles.btnText(nativeStyles.layoutBox.raw.color)}>
                120×60
              </RNText>
            </View>
          }
          native={
            <NativeButton
              label="120×60"
              modifiers={
                isIOS
                  ? nativeStyles.layoutBox.swiftUI
                  : nativeStyles.layoutBox.jetpack
              }
              onPress={() => alert("Layout!")}
            />
          }
        />
        <CompareRow
          rn={
            <View style={nativeStyles.aspectBox.raw}>
              <RNText style={styles.btnText(nativeStyles.aspectBox.raw.color)}>
                1:1
              </RNText>
            </View>
          }
          native={
            isIOS ? (
              <SwiftUIHost matchContents>
                <SwiftUIText
                  modifiers={convertToSwiftUIModifiers({
                    width: 100,
                    height: 100,
                    padding: 10,
                    backgroundColor: "#34C759",
                    borderRadius: 8,
                    color: "#FFFFFF",
                  })}
                >
                  1:1
                </SwiftUIText>
              </SwiftUIHost>
            ) : (
              <NativeButton
                label="1:1"
                modifiers={convertToJetpackComposeModifiers({
                  padding: 10,
                  backgroundColor: "#34C759",
                  borderRadius: 8,
                  color: "#FFFFFF",
                })}
                onPress={() => alert("Aspect!")}
              />
            )
          }
        />
        <CompareRow
          rn={
            <View style={nativeStyles.paddedBox.raw}>
              <RNText style={styles.btnText(nativeStyles.paddedBox.raw.color)}>
                Padded
              </RNText>
            </View>
          }
          native={
            <NativeButton
              label="Padded"
              modifiers={
                isIOS
                  ? nativeStyles.paddedBox.swiftUI
                  : nativeStyles.paddedBox.jetpack
              }
              onPress={() => alert("Padded!")}
            />
          }
        />
      </Section>

      {/* Typography */}
      <Section label="Typography">
        <CompareRow
          rn={<RNText style={nativeStyles.typography.raw}>Styled Text</RNText>}
          native={
            isIOS ? (
              <SwiftUIHost matchContents>
                <SwiftUIText
                  modifiers={convertToSwiftUIModifiers(
                    nativeStyles.typography.raw,
                  )}
                >
                  Styled Text
                </SwiftUIText>
              </SwiftUIHost>
            ) : (
              <ComposeHost matchContents>
                <ComposeText
                  modifiers={convertToJetpackComposeModifiers({
                    fontSize: 18,
                    color: "#000000",
                  })}
                  text="Styled Text"
                />
              </ComposeHost>
            )
          }
        />
      </Section>

      {/* Colors */}
      <Section label="Colors">
        <CompareRow
          rn={
            <TouchableOpacity
              style={nativeStyles.colorBox.raw}
              onPress={() => alert("RN Color!")}
              activeOpacity={0.8}
            >
              <RNText style={styles.btnText(nativeStyles.colorBox.raw.color)}>
                Background
              </RNText>
            </TouchableOpacity>
          }
          native={
            <NativeButton
              label="Background"
              modifiers={
                isIOS
                  ? nativeStyles.colorBox.swiftUI
                  : nativeStyles.colorBox.jetpack
              }
              onPress={() => alert("Native Color!")}
            />
          }
        />
        <CompareRow
          rn={
            <TouchableOpacity
              style={nativeStyles.tintBox.raw}
              onPress={() => alert("RN Tint!")}
              activeOpacity={0.8}
            >
              <RNText style={styles.btnText(nativeStyles.tintBox.raw.color)}>
                Tint
              </RNText>
            </TouchableOpacity>
          }
          native={
            isIOS ? (
              <NativeButton
                label="Tint"
                modifiers={nativeStyles.tintBox.swiftUI}
                onPress={() => alert("Native Tint!")}
              />
            ) : (
              <RNText style={styles.naText}>N/A on Compose</RNText>
            )
          }
        />
      </Section>

      {/* Borders & Radius */}
      <Section label="Borders & Radius">
        <CompareRow
          rn={
            <TouchableOpacity
              style={nativeStyles.borderedBox.raw}
              onPress={() => alert("RN Border!")}
              activeOpacity={0.8}
            >
              <RNText
                style={styles.btnText(nativeStyles.borderedBox.raw.color)}
              >
                Bordered
              </RNText>
            </TouchableOpacity>
          }
          native={
            <NativeButton
              label="Bordered"
              modifiers={
                isIOS
                  ? nativeStyles.borderedBox.swiftUI
                  : nativeStyles.borderedBox.jetpack
              }
              onPress={() => alert("Native Border!")}
            />
          }
        />
      </Section>

      {/* Shadows */}
      <Section label="Shadows">
        <CompareRow
          rn={
            <TouchableOpacity
              style={nativeStyles.shadowBox.raw}
              onPress={() => alert("RN Shadow!")}
              activeOpacity={0.8}
            >
              <RNText style={styles.btnText(nativeStyles.shadowBox.raw.color)}>
                Shadow
              </RNText>
            </TouchableOpacity>
          }
          native={
            <NativeButton
              label="Shadow"
              modifiers={
                isIOS
                  ? nativeStyles.shadowBox.swiftUI
                  : nativeStyles.shadowBox.jetpack
              }
              onPress={() => alert("Native Shadow!")}
            />
          }
        />
      </Section>

      {/* Transforms */}
      <Section label="Transforms">
        <CompareRow
          rn={
            <TouchableOpacity
              style={nativeStyles.transformScale.raw}
              onPress={() => alert("RN Scale!")}
              activeOpacity={0.8}
            >
              <RNText
                style={styles.btnText(nativeStyles.transformScale.raw.color)}
              >
                Scale
              </RNText>
            </TouchableOpacity>
          }
          native={
            <NativeButton
              label="Scale"
              modifiers={
                isIOS
                  ? nativeStyles.transformScale.swiftUI
                  : nativeStyles.transformScale.jetpack
              }
              onPress={() => alert("Native Scale!")}
            />
          }
        />
        <CompareRow
          rn={
            <TouchableOpacity
              style={nativeStyles.transformRotate.raw}
              onPress={() => alert("RN Rotate!")}
              activeOpacity={0.8}
            >
              <RNText
                style={styles.btnText(nativeStyles.transformRotate.raw.color)}
              >
                Rotate
              </RNText>
            </TouchableOpacity>
          }
          native={
            <NativeButton
              label="Rotate"
              modifiers={
                isIOS
                  ? nativeStyles.transformRotate.swiftUI
                  : nativeStyles.transformRotate.jetpack
              }
              onPress={() => alert("Native Rotate!")}
            />
          }
        />
        <CompareRow
          rn={
            <TouchableOpacity
              style={nativeStyles.transformTranslate.raw}
              onPress={() => alert("RN Translate!")}
              activeOpacity={0.8}
            >
              <RNText
                style={styles.btnText(
                  nativeStyles.transformTranslate.raw.color,
                )}
              >
                Translate
              </RNText>
            </TouchableOpacity>
          }
          native={
            isIOS ? (
              <NativeButton
                label="Translate"
                modifiers={nativeStyles.transformTranslate.swiftUI}
                onPress={() => alert("Native Translate!")}
              />
            ) : (
              <RNText style={styles.naText}>N/A on Compose</RNText>
            )
          }
        />
      </Section>

      {/* Effects */}
      <Section label="Effects">
        <CompareRow
          rn={
            <TouchableOpacity
              style={nativeStyles.opacityBox.raw}
              onPress={() => alert("RN Opacity!")}
              activeOpacity={0.8}
            >
              <RNText style={styles.btnText(nativeStyles.opacityBox.raw.color)}>
                Opacity
              </RNText>
            </TouchableOpacity>
          }
          native={
            <NativeButton
              label="Opacity"
              modifiers={
                isIOS
                  ? nativeStyles.opacityBox.swiftUI
                  : nativeStyles.opacityBox.jetpack
              }
              onPress={() => alert("Native Opacity!")}
            />
          }
        />
        <CompareRow
          rn={
            <View style={[nativeStyles.clippedBox.raw, styles.centered]}>
              <RNText style={styles.btnText(nativeStyles.clippedBox.raw.color)}>
                Clip
              </RNText>
            </View>
          }
          native={
            isIOS ? (
              <SwiftUIHost matchContents>
                <SwiftUIText
                  modifiers={convertToSwiftUIModifiers({
                    width: 80,
                    height: 80,
                    backgroundColor: "#FF9500",
                    borderRadius: 40,
                    overflow: "hidden",
                    color: "#FFFFFF",
                  })}
                >
                  Clip
                </SwiftUIText>
              </SwiftUIHost>
            ) : (
              <RNText style={styles.naText}>N/A on Compose</RNText>
            )
          }
        />
        <CompareRow
          rn={
            <View style={nativeStyles.zIndexBox.raw}>
              <RNText style={styles.btnText(nativeStyles.zIndexBox.raw.color)}>
                zIndex
              </RNText>
            </View>
          }
          native={
            isIOS ? (
              <SwiftUIHost matchContents>
                <SwiftUIText
                  modifiers={convertToSwiftUIModifiers({
                    padding: 10,
                    backgroundColor: "#007AFF",
                    borderRadius: 6,
                    zIndex: 10,
                    color: "#FFFFFF",
                  })}
                >
                  zIndex
                </SwiftUIText>
              </SwiftUIHost>
            ) : (
              <RNText style={styles.naText}>N/A on Compose</RNText>
            )
          }
        />
        <CompareRow
          rn={
            <View style={{ height: showHidden ? 40 : 0, overflow: "hidden" }}>
              <View style={nativeStyles.hiddenBox.raw}>
                <RNText
                  style={styles.btnText(nativeStyles.hiddenBox.raw.color)}
                >
                  Hidden
                </RNText>
              </View>
            </View>
          }
          native={
            showHidden ? (
              isIOS ? (
                <SwiftUIHost matchContents>
                  <SwiftUIText
                    modifiers={convertToSwiftUIModifiers({
                      padding: 10,
                      backgroundColor: "#FF3B30",
                      borderRadius: 6,
                      display: "none",
                      color: "#FFFFFF",
                    })}
                  >
                    Hidden
                  </SwiftUIText>
                </SwiftUIHost>
              ) : (
                <RNText style={styles.naText}>N/A on Compose</RNText>
              )
            ) : (
              <RNText style={styles.naText}>Tap "Show Hidden"</RNText>
            )
          }
        />
        <TouchableOpacity
          style={styles.toggleBtn}
          onPress={() => setShowHidden((s) => !s)}
        >
          <RNText style={styles.toggleBtnText}>
            {showHidden ? "Hide Element" : "Show Hidden"}
          </RNText>
        </TouchableOpacity>
      </Section>

      {/* Dynamic Playground */}
      <Section label="Dynamic Playground">
        <RNText style={styles.caption}>Opacity: {opacity.toFixed(2)}</RNText>
        {isIOS ? (
          <SwiftUIHost matchContents>
            {SwiftUISlider && (
              <SwiftUISlider
                value={opacity}
                onValueChange={setOpacity}
                modifiers={convertToSwiftUIModifiers({ padding: 8 })}
              />
            )}
          </SwiftUIHost>
        ) : (
          <ComposeHost matchContents>
            {ComposeSlider && (
              <ComposeSlider
                value={opacity}
                onValueChange={setOpacity}
                modifiers={convertToJetpackComposeModifiers({ padding: 8 })}
              />
            )}
          </ComposeHost>
        )}

        <RNText style={styles.caption}>Scale: {scale.toFixed(2)}</RNText>
        {isIOS ? (
          <SwiftUIHost matchContents>
            {SwiftUISlider && (
              <SwiftUISlider
                value={scale}
                onValueChange={setScale}
                modifiers={convertToSwiftUIModifiers({ padding: 8 })}
              />
            )}
          </SwiftUIHost>
        ) : (
          <ComposeHost matchContents>
            {ComposeSlider && (
              <ComposeSlider
                value={scale}
                onValueChange={setScale}
                modifiers={convertToJetpackComposeModifiers({ padding: 8 })}
              />
            )}
          </ComposeHost>
        )}

        <RNText style={styles.caption}>Rotate: {rotate.toFixed(0)}°</RNText>
        {isIOS ? (
          <SwiftUIHost matchContents>
            {SwiftUISlider && (
              <SwiftUISlider
                value={rotate}
                onValueChange={setRotate}
                modifiers={convertToSwiftUIModifiers({ padding: 8 })}
              />
            )}
          </SwiftUIHost>
        ) : (
          <ComposeHost matchContents>
            {ComposeSlider && (
              <ComposeSlider
                value={rotate}
                onValueChange={setRotate}
                modifiers={convertToJetpackComposeModifiers({ padding: 8 })}
              />
            )}
          </ComposeHost>
        )}

        <RNText style={styles.caption}>Padding: {padding.toFixed(0)}</RNText>
        {isIOS ? (
          <SwiftUIHost matchContents>
            {SwiftUISlider && (
              <SwiftUISlider
                value={padding}
                onValueChange={setPadding}
                modifiers={convertToSwiftUIModifiers({ padding: 8 })}
              />
            )}
          </SwiftUIHost>
        ) : (
          <ComposeHost matchContents>
            {ComposeSlider && (
              <ComposeSlider
                value={padding}
                onValueChange={setPadding}
                modifiers={convertToJetpackComposeModifiers({ padding: 8 })}
              />
            )}
          </ComposeHost>
        )}

        <CompareRow
          rn={
            <TouchableOpacity
              style={dynamicStyle}
              onPress={() => alert("RN Dynamic!")}
              activeOpacity={0.8}
            >
              <RNText style={styles.btnText(dynamicStyle.color)}>
                Dynamic
              </RNText>
            </TouchableOpacity>
          }
          native={
            <NativeButton
              label="Dynamic"
              modifiers={dynamicModifiers}
              onPress={() => alert("Native Dynamic!")}
            />
          }
        />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16, paddingBottom: 60, gap: 16 },
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
    marginBottom: 4,
  },
  columnHeaders: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 4,
  },
  columnLabel: {
    fontSize: 11,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
    flex: 1,
  },
  section: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  compareRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  rnSide: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  // CRITICAL: nativeSide must NOT use alignItems (breaks matchContents)
  nativeSide: {
    flex: 1,
    gap: 8,
    paddingHorizontal: 16,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  caption: { fontSize: 12, color: "#888", marginTop: 4 },
  btnText: (color) => ({
    color: color || "#FFFFFF",
    fontWeight: "600",
    textAlign: "center",
  }),
  naText: { fontSize: 12, color: "#BBB", fontStyle: "italic" },
  toggleBtn: {
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#E5E5EA",
    borderRadius: 8,
    marginTop: 4,
  },
  toggleBtnText: { fontSize: 13, color: "#007AFF", fontWeight: "600" },
});
