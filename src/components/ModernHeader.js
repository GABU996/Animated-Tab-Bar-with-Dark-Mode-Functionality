import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function ModernHeader({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
}) {
  const { colors, isDark } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isDark ? colors.surface : colors.background),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <LinearGradient
        colors={
          isDark
            ? [colors.surface, colors.background]
            : [colors.background, colors.surface]
        }
        style={styles.gradient}
      >
        <View style={styles.content}>
          {leftIcon && (
            <TouchableOpacity
              onPress={onLeftPress}
              style={styles.iconContainer}
            >
              <Icon name={leftIcon} size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
          <Text style={[styles.title, { color: colors.primary }]}>{title}</Text>
          {rightIcon && (
            <TouchableOpacity
              onPress={onRightPress}
              style={styles.iconContainer}
            >
              <Icon name={rightIcon} size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: "flex-end",
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
