import React, { createContext, useState, useContext } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [isDark, setIsDark] = useState(deviceTheme === "dark");

  const theme = {
    isDark,
    colors: isDark
      ? {
          background: "#121212",
          surface: "#1E1E1E",
          primary: "#BB86FC",
          text: "#FFFFFF",
          textSecondary: "#B3B3B3",
        }
      : {
          background: "#FFFFFF",
          surface: "#F3F3F3",
          primary: "#6200EE",
          text: "#000000",
          textSecondary: "#666666",
        },
    setIsDark,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
