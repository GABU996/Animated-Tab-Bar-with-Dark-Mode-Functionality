import React from "react";
import { View, StyleSheet } from "react-native";
import { List, Switch, Divider, Title } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(false);
  const { isDark, setIsDark, colors } = useTheme();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isDark ? colors.background : colors.surface),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <View style={styles.content}>
        <Title style={[styles.title, { color: colors.text }]}>Settings</Title>
        <List.Section>
          <List.Item
            title="Notifications"
            titleStyle={{ color: colors.text }}
            left={() => <List.Icon color={colors.text} icon="bell" />}
            right={() => (
              <Switch value={notifications} onValueChange={setNotifications} />
            )}
          />
          <Divider />
          <List.Item
            title="Dark Mode"
            titleStyle={{ color: colors.text }}
            left={() => (
              <List.Icon color={colors.text} icon="theme-light-dark" />
            )}
            right={() => <Switch value={isDark} onValueChange={setIsDark} />}
          />
          <Divider />
          <List.Item
            title="Privacy"
            titleStyle={{ color: colors.text }}
            left={() => <List.Icon color={colors.text} icon="shield-account" />}
            onPress={() => console.log("Privacy")}
          />
          <Divider />
          <List.Item
            title="Help & Support"
            titleStyle={{ color: colors.text }}
            left={() => <List.Icon color={colors.text} icon="help-circle" />}
            onPress={() => console.log("Help & Support")}
          />
        </List.Section>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 20,
  },
});
