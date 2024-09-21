import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Title, Paragraph, Button } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function ProfileScreen() {
  const { isDark, colors } = useTheme();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isDark ? colors.background : colors.surface),
    };
  });

  const profileContainerStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"
      ),
      transform: [{ scale: withTiming(isDark ? 0.98 : 1) }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <Animated.View style={[styles.profileContainer, profileContainerStyles]}>
        <Image
          source={require("../../assets/batman.png")}
          style={styles.avatar}
        />
        <Title style={[styles.name, { color: colors.text }]}>
          Nika Gabunia
        </Title>
        <Paragraph style={[styles.bio, { color: colors.textSecondary }]}>
          Project Manager | Team Lead
        </Paragraph>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => console.log("Edit Profile")}
          color={colors.primary}
        >
          Edit Profile
        </Button>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    width: "80%",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontFamily: "Poppins_600SemiBold",
    marginTop: 20,
  },
  bio: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});
