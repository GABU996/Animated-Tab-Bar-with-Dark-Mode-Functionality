import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");
const tabWidth = width / 3;

export default function AnimatedTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const translateX = useSharedValue(0);

  return (
    <View style={[styles.tabBar, { backgroundColor: colors.surface }]}>
      <Animated.View
        style={[
          styles.slidingTab,
          { backgroundColor: colors.primary },
          useAnimatedStyle(() => ({
            transform: [{ translateX: translateX.value }],
          })),
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
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
            navigation.navigate({ name: route.name, merge: true });
            translateX.value = withSpring(index * tabWidth);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabItem}
          >
            {options.tabBarIcon({
              color: isFocused ? colors.primary : colors.text,
            })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 64,
    position: "relative",
  },
  slidingTab: {
    width: tabWidth,
    height: 4,
    position: "absolute",
    top: 0,
    left: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
