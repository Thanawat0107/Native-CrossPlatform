import { Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : typeof options.title === "string"
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            <Text style={[styles.tabText, isFocused && styles.tabTextFocused]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}

const isIOS = Platform.OS === "ios";

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: isIOS ? 25 : 15, // ระยะห่างที่แตกต่างระหว่าง iOS และ Android
    flexDirection: "row",
    justifyContent: "space-around", // ให้แต่ละ Tab กระจายตำแหน่ง
    alignContent: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 25,
    ...(isIOS
      ? {
          shadowColor: "black",
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 10,
          shadowOpacity: 0.1,
        }
      : {
          elevation: 5,
        }),
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  tabText: {
    textAlign: "center",
    color: "#222",
    fontSize: 18, // กำหนดขนาดฟอนต์ให้เหมาะสม
  },
  tabTextFocused: {
    color: "green", // เปลี่ยนสีเมื่อโฟกัส
  },
});
