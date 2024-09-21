import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { Title, Paragraph, Card, Button } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

export default function HomeScreen() {
  const { isDark, colors } = useTheme();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isDark ? colors.background : colors.surface),
    };
  });

  const cardAnimatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isDark ? colors.surface : colors.background),
      transform: [{ scale: withTiming(isDark ? 0.98 : 1) }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1557683316-973673baf926",
        }}
        style={styles.background}
      >
        <Animated.View
          style={[
            styles.overlay,
            {
              backgroundColor: withTiming(
                isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.4)"
              ),
            },
          ]}
        >
          <Animated.View style={[styles.card, cardAnimatedStyles]}>
            <Card.Content>
              <Title style={[styles.title, { color: colors.primary }]}>
                Welcome Home
              </Title>
              <Paragraph style={{ color: colors.text }}>
                Discover your digital oasis.
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => console.log("Explore")}
                color={colors.primary}
              >
                Explore
              </Button>
            </Card.Actions>
          </Animated.View>
        </Animated.View>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
  },
});
